import path from 'path'
import Logo from './components/Logo'
import Icon from './components/Icon'
import '../tailwind.css'

import { postgresAdapter } from '@payloadcms/db-postgres'
import { webpackBundler } from '@payloadcms/bundler-webpack'
import {lexicalEditor} from '@payloadcms/richtext-lexical'
import { buildConfig } from 'payload/config'

import Users from './collections/Users'
import Pages from './collections/Pages'
import DesignModels from './collections/DesignModels'
import Media from './collections/Media'
import { Categories } from './collections/Blog/Categories'
import { Blog } from './collections/Blog/Blog'
import Testimonials from './collections/Testimonials'
import { Header } from './globals/Header'
import { Footer } from './globals/Footer'

export default buildConfig({
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL,
  admin: {
    user: Users.slug,
    livePreview: {
      collections: ['pages'],
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
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
  globals: [Header, Footer],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
    declare: false,
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
  plugins: [],
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI,
    },
  }),
})
