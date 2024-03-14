import { CollectionConfig } from 'payload/types'
import { isAdmin } from '../access/isAdmin'
import slug from '../fields/slug';
import { Hero } from '../blocks/Hero';
import { About } from '../blocks/About';
import createdBy from '../fields/createdBy';
import { BlogCollection } from '../blocks/BlogCollection';

const Pages: CollectionConfig = {
    slug: 'pages',
    labels:{
      singular: 'Page',
      plural: 'Pages',
    },
    admin:{
      useAsTitle: 'title'
    },
    access:{
        create: isAdmin,
        read: () => true,
        update: isAdmin,
        delete: isAdmin,
      },
      versions: {
        drafts: true,
      },    

      fields:[
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
          label:"Page Layout",
          name:"layout",
          type: 'blocks',
          blocks: [
            Hero,
            About,
            BlogCollection,
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