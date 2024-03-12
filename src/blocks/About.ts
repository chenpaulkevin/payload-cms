import { Block } from "payload/types";
export type Type = {
    blockType: "content";
    blockName?: string;
    content: unknown;
  };

export const About:Block ={
    slug: 'about',
    labels: {
        singular: 'About Block',
        plural: 'About Blocks'
    },
    fields: [
        {
            label: 'About Header',
            name: 'header',
            required: true,
            type: 'text',
            minLength: 5,
            maxLength: 80
        },
        {
            label: 'About Description',
            name: 'description',
            required: true,
            type: 'textarea',
            minLength: 10,
            maxLength: 250,
        },
        {
            type: 'row',
            fields: [
                {
                    label: 'Projects Completed',
                    name: 'projectsCompleted',
                    type: 'number',
                    required: true,
                    min: 1,
                    max: 50000
                },
                {
                    label: 'Years of Experience',
                    name: 'experience',
                    type: 'number',
                    required: true,
                    min: 1,
                    max: 2000
                },
            ]
        },
        {
            type: 'row',
            fields: [
                {
                    label: 'Employees',
                    name: 'employees',
                    type: 'number',
                    required: true,
                    min: 1,
                    max: 2000,
                },
                {
                    label: 'Satisfied Customers',
                    name: 'satisfiedCustomers',
                    type: 'number',
                    required: true,
                    min: 1,
                    max: 50000
                }
            ]
        },
        {
            label: 'Featured Image',
            name: 'featuredImage',
            type: 'upload',
            relationTo: 'media',
            required: true,
          },
    ]
}