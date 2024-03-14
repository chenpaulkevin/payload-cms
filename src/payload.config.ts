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
import { Footer } from './globals/Footer'

export default buildConfig({
  serverURL: 'http://localhost:4000',
  admin: {
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
  csrf: ['http://localhost:3000/', 'localhost:3000'],
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
