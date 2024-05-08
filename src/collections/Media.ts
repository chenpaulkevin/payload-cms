import { CollectionConfig } from 'payload/types';
import { isAdminorAuthor } from '../access/isAdminOrAuthor';
import createdBy from '../fields/createdBy';

export type Type = {
  filename: string
  alt: string
  sizes: {
    card?: {
      filename: string
      width: number
      height: number
    }
    feature?: {
      filename: string
      width: number
      height: number
    }
  }
}

const Media: CollectionConfig = {
  slug: 'media',
  access:{
    create: isAdminorAuthor,
    read: () => true,
    update: isAdminorAuthor ,
    delete: isAdminorAuthor,
  },
  upload: {
    adminThumbnail: 'card',
    crop: false,
    mimeTypes: ['image/*', 'image/png'],
    focalPoint: false,
    formatOptions: {
      format: 'webp',
      options: {
        quality: 70
      }
    },
  },
  fields: [
    {
      name: 'alt',
      label: 'Alt Text',
      type: 'text',
      required: true,
    },
    createdBy
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
};

export default Media;