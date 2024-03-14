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
        group: 'Blog'
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
            maxLength: 80
        },
        {
            type: 'row',
            fields: [
                {
                    label: 'Blog Categories',
                    name: 'categories',
                    required: true,
                    type: 'relationship',
                    relationTo:'blog'
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
            label: 'Blog Content',
            name: 'blogContent',
            required: true,
            type:'richText',

        },
        {
            label: 'Blog Cover Image',
            name: 'blogImage',
            type: 'upload',
            relationTo: 'media',
            required: true,
          },
        slug,
        createdBy,
    ]
}