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
    read: isAdminorAuthor ,
    update: isAdminorAuthor ,
    delete: isAdminorAuthor,
  },
  upload: {
    adminThumbnail: 'card',
    imageSizes: [
      {
        name: 'card',
        width: 640,
        height: 480,
      },
      {
        name: 'feature',
        width: 1024,
        height: 576,
      },
    ],
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