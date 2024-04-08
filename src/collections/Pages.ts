import { CollectionConfig } from 'payload/types'
import { isAdmin } from '../access/isAdmin'
import slug from '../fields/slug';
import { Hero } from '../blocks/Hero';
import { About } from '../blocks/About';
import createdBy from '../fields/createdBy';
import { BlogCollection } from '../blocks/BlogCollection';
import {Testimonials} from '../blocks/Testimonials';
import {SimpleRichText} from '../blocks/SimpleRichText';
import {InfiniteBlogScroll} from '../blocks/InfiniteBlogScroll';
import {DesignModelsGallery} from '../blocks/DesignModelsGallery';

const Pages: CollectionConfig = {
  slug: 'pages',
  labels: {
    singular: 'Page',
    plural: 'Pages',
  },
  admin: {
    useAsTitle: 'title',
    description: 'Create and manage individual pages for your website. (If you intend to make a page your homepage, set the slug as "index".',
  },
  access: {
    create: isAdmin,
    read: () => true,
    update: isAdmin,
    delete: isAdmin,
  },
  versions: {
    drafts: true,
  },

  fields: [
    {
      label: 'Page Title',
      name: 'title',
      required: true,
      type: 'text',
      unique: true,
      minLength: 2,
      maxLength: 20
    },
    slug,
    createdBy,
    {
      label: "Page Layout",
      name: "layout",
      type: 'blocks',
      blocks: [
        Hero,
        About,
        BlogCollection,
        Testimonials,
        SimpleRichText,
        InfiniteBlogScroll,
        DesignModelsGallery,
      ]
    }
  ],
  hooks: {
    beforeChange: [
      ({ req, operation, data }) => {
        if (operation === 'create') {
          if (req.user) {
            data.createdBy = req.user.id;
            return data;
          }
        }
      },
    ],
  },
}

export default Pages;