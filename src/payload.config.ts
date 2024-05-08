import path from 'path'
import Logo from './components/Logo'
import Icon from './components/Icon'
import '../tailwind.css'

import { postgresAdapter } from '@payloadcms/db-postgres'
import { webpackBundler } from '@payloadcms/bundler-webpack'
import {lexicalEditor} from '@payloadcms/richtext-lexical'
import { buildConfig } from 'payload/config'
import formBuilder from '@payloadcms/plugin-form-builder'
import seoPlugin from '@payloadcms/plugin-seo';



import Users from './collections/Users'
import Pages from './collections/Pages'
import DesignModels from './collections/DesignModels'
import Media from './collections/Media'
import { Categories } from './collections/Blog/Categories'
import { Blog } from './collections/Blog/Blog'
import Testimonials from './collections/Testimonials'
import { Header } from './globals/Header'
import { Footer } from './globals/Footer'
import { Metadata } from './globals/Metadata'





export default buildConfig({
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL,
  admin: {
    user: Users.slug,
    livePreview: {
      url: ({ documentInfo } : {documentInfo: any}) => `${process.env.PAYLOAD_PUBLIC_SITE_URL}/${documentInfo.slug !== 'index' ? documentInfo.slug : ''}`,
    },
    webpack: (config) => {
      return {
        ...config,
        module: {
          ...config.module,
          rules: [
            ...config.module.rules,
            {
              test: /\tailwind.css$/i,
              use: ['css-loader', 'postcss-loader'],
            },
          ],
        },
      }
    },
    bundler: webpackBundler(),
    //css: path.resolve(__dirname, './css/compiledTailwind.css'),
    meta: {
      titleSuffix: '- Apexcode CMS',
      favicon: '/assets/iconPrimary.svg',
      ogImage: '/assets/logoWhite.svg'
    },
    components:{
      graphics: {
        Logo,
        Icon
      }
    }
  },
  editor: lexicalEditor({}),
  collections: [Blog, Users, Pages, Media, DesignModels,  Categories, Testimonials],
  cors: [
    process.env.PAYLOAD_PUBLIC_SERVER_URL || '',
    process.env.PAYLOAD_PUBLIC_SITE_URL || '',
  ].filter(Boolean),
  csrf: [
    process.env.PAYLOAD_PUBLIC_SERVER_URL || '',
    process.env.PAYLOAD_PUBLIC_SITE_URL || '',
  ].filter(Boolean),
  globals: [Header, Footer, Metadata],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
    declare: false,
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
  rateLimit: {
    max: 500, // limit each IP per windowMs
    trustProxy: true,
    window: 2 * 60 * 1000, // 2 minutes
  },
  plugins: [
    formBuilder({
      formOverrides: {
        admin: {
          group: "Forms"
        }
      },
      formSubmissionOverrides: {
        admin: {
          group: "Forms"
        }
      },
      fields: {
        state: false,
        country: false,
        message: true,
        payment: false,
      },
    }),
    seoPlugin({
      collections: [
        'blog',
        'designModels',
      ],
      uploadsCollection: 'media',
      generateTitle: ({ doc } : {doc: any}) => `${doc?.title?.value}`,
      generateDescription: ({ doc } : {doc: any}) => doc?.description?.value,
      generateImage: ({ doc } : {doc: any}) => doc?.blogImage?.value,
      generateURL: ({ doc } : {doc: any}) => `${process.env.PAYLOAD_PUBLIC_SITE_URL}/blog/${doc?.slug?.value}`
    })

  ],
  upload: {
    limits: {
      fileSize: 3000000, // 5MB, written in bytes
    },
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI,
    },
  }),
})
