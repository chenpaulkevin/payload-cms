import { CollectionConfig } from 'payload/types'
import { isAdmin } from '../access/isAdmin'
import { isAdminorAuthor } from '../access/isAdminOrAuthor'
import slug from '../fields/slug';
import createdBy from '../fields/createdBy';

const  Testimonials: CollectionConfig = {
    slug:'testimonials',
    admin:{
        useAsTitle: 'title',
      },
      access:{
        create: isAdminorAuthor,
        read: () => true,
        update: isAdminorAuthor,
        delete: isAdminorAuthor,
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
      fields:[
                {
                    type: 'row',
                    fields: [
                        {
                            label: 'First Name',
                            name:'firstName',
                            required: true,
                            type: "text",
                            minLength: 2,
                            maxLength: 50,
                          },
                          {
                            label: 'Last Name',
                            name:'lastName',
                            required: true,
                            type: "text",
                            minLength: 2,
                            maxLength: 50,
                          },
                    ]
                },
                {
                    label: 'Testimonial Title',
                    name:'title',
                    required: true,
                    type: "text",
                    minLength: 2,
                    maxLength: 100,
                  },
                {
                    label: 'Testimonial Description',
                    name: 'testimonialDescription',
                    required: true,
                    type: 'textarea',
                    minLength: 10,
                    maxLength: 300
                },
                {
                    label: 'Customer Image',
                    name: 'customerImage',
                    type: 'upload',
                    relationTo: 'media',
                  },
                slug,
                createdBy,
      ]
}

export default Testimonials