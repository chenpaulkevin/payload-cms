import path from 'path'
import Logo from './components/Logo'
import Icon from './components/Icon'
import '../tailwind.css'

import { payloadCloud } from '@payloadcms/plugin-cloud'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { webpackBundler } from '@payloadcms/bundler-webpack'
import { slateEditor } from '@payloadcms/richtext-slate'
import { buildConfig } from 'payload/config'

import Users from './collections/Users'
import Pages from './collections/Pages'
import DesignModels from './collections/DesignModels'
import Media from './collections/Media'
import { Categories } from './collections/Blog/Categories'
import { Blog } from './collections/Blog/Blog'
import Testimonials from './collections/Testimonials'
import { Header } from './globals/Header'

export default buildConfig({
  admin: {
    livePreview: {
      url: 'http://localhost:3001',
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
      ]
    },
    user: Users.slug,
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
  editor: slateEditor({}),
  collections: [Blog, Users, Pages, Media, DesignModels,  Categories, Testimonials],
  globals: [Header],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
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
