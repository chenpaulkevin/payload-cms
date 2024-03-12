import { isAdmin } from "../access/isAdmin";
import { GlobalConfig } from "payload/types";

export const Footer: GlobalConfig = {
    slug: 'footer',
    label: 'Footer Configurations',
    access:{
        read: isAdmin,
        update: isAdmin
    },
    admin:{
        description: 'Configure your global footer which includes the logo, quick links and location.',
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
            label: 'Call-To-Action Title',
            name: 'title',
            type: 'text',
            required: true,
            minLength: 1,
            maxLength: 80
        },
        {
            label: 'Call-To-Action Subheader',
            name: 'subheader',
            type: 'textarea',
            required: true,
            minLength: 1,
            maxLength: 200,
        },
        {
            type: 'row',
            fields: [
                {
                    label: 'Quick Links',
                    name: 'quickLinks',
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
                },
                {
                    label: 'Location',
                    name: 'location',
                    type: 'array',
                    required: true,
                    fields: [
                        {
                            label: 'City',
                            name: 'city',
                            type: 'text',
                            required: true,
                            minLength: 2,
                            maxLength: 50,
                        },
                        {
                            label: 'Street Address',
                            name: 'streetAddress',
                            type: 'textarea',
                            required: true,
                            minLength: 1,
                            maxLength: 200
                        }
                    ]
                }
            ]
        },
        {
            type: 'group',
            name: 'socialLinks',
            label:'Social Links',
            fields: [
                {
                    label: 'Facebook Link',
                    name: 'facebook',
                    type: 'text',
                    minLength: 1,
                },
                {
                    label: 'Instagram Link',
                    name: 'instagram',
                    type: 'text',
                    minLength: 1,
                },
                {
                    label: 'Twitter Link',
                    name: 'twitter',
                    type: 'text',
                    minLength: 1,
                },
                {
                    label: 'Youtube Link',
                    name: 'youtube',
                    type: 'text',
                    minLength: 1,
                }
                ,
                {
                    label: 'LinkedIn Link',
                    name: 'linkedIn',
                    type: 'text',
                    minLength: 1,
                }
            ]
        }

    ]

}