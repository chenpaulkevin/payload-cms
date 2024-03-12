import { CollectionConfig } from 'payload/types'
import slug from '../../fields/slug';
import createdBy from '../../fields/createdBy';

  export const Categories: CollectionConfig = {
    slug: 'categories',
    labels: {
        singular: 'Blog Category',
        plural: 'Blog Categories',
    },
    admin:{
        useAsTitle: 'category',
        group: 'Blog'
      },
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
    fields: [
        {
            label: 'New Blog Category',
            name: 'category',
            required: true,
            type: 'text',
            minLength: 4,
            maxLength: 100
        },
        slug,
        createdBy
    ]
  }