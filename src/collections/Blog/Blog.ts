import { CollectionConfig } from 'payload/types'
import { isAdmin } from '../../access/isAdmin'
import { isAdminorAuthor } from '../../access/isAdminOrAuthor';
import slug from '../../fields/slug'
import createdBy from '../../fields/createdBy'

export const Blog: CollectionConfig = {
    slug: "blog",
    labels: {
        singular: "Blog Post",
        plural: "Blog Posts"
    },
    
    admin:{
        useAsTitle: 'title',
        group: 'Blog',
        livePreview: {
          url: ({ data }) =>
            `${process.env.PAYLOAD_PUBLIC_SITE_URL}/blog${data.slug !== 'index' ? `/${data.slug}` : ''}`,
        },
      },
      access:{
        create: isAdminorAuthor,
        read: () => true,
        update: isAdminorAuthor,
        delete: isAdmin,
      },
      versions: {
        drafts: true,
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
            label: 'Blog Title',
            name: 'title',
            required: true,
            type: 'text',
            minLength: 5,
            maxLength: 60,
            admin: {
              description: ({ path, value }) =>
                `${typeof value === 'string' ? 60 - value.length : '60'} characters left.`,
            },
        },
        {
          label: 'Blog Description',
          name: 'description',
          required: true,
          type: 'textarea',
          minLength: 10,
          maxLength: 150,
          admin: {
            description: ({ path, value }) =>
              `${typeof value === 'string' ? 150 - value.length : '150'} characters left.`,
          },
      },
        {
            type: 'row',
            fields: [
                {
                    label: 'Blog Categories',
                    name: 'categories',
                    required: true,
                    type: 'relationship',
                    relationTo:'categories'
                },
                {
                    label: 'Estimated Read Time (Minutes)',
                    name: 'readTime',
                    required: true,
                    type: 'number',
                    min: 1,
                    max: 360 
                }
            ]
        },
        {
          label: 'Blog Cover Image',
          name: 'blogImage',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
            label: 'Blog Content',
            name: 'blogContent',
            required: true,
            type:'richText',

        },
        slug,
        createdBy,
    ]
}