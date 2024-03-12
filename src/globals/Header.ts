import { isAdmin } from "../access/isAdmin";
import { GlobalConfig } from "payload/types";

export const Header:GlobalConfig = {
    slug: 'header',
    label: 'Header Configurations',
    access: {
        read: isAdmin,
        update: isAdmin
    },
    admin:{
        description: 'Configure your global navigation bar which includes the logo, site title and links to other pages.',
    },
    fields: [
        {
            label: 'Logo',
            name: 'logo',
            type: 'upload',
            required: true,
            relationTo: 'media'
        },
        {
            label: 'Navigation Links',
            name: 'navLinks',
            type: 'array',
            required: true,
            fields: [
                {
                    label: 'Label',
                    name: 'label',
                    type: 'text',
                    required: true,
                    minLength: 2,
                    maxLength: 20,
                },
                {
                    label: 'Link',
                    name: 'link',
                    type: 'text',
                    required: true,
                    minLength: 1,
                    maxLength: 100
                }
            ]
        }
    ]
}