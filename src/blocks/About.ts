import { Block } from "payload/types";
const thumbnail = require("./thumbnails/About.png");
export type Type = {
    blockType: "content";
    blockName?: string;
    content: unknown;
  };

export const About:Block ={
    slug: 'about',
    imageURL: `${thumbnail}`,
    imageAltText: 'Block Thumbnail',
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
            maxLength: 150,
            admin: {
              description: ({ path, value }) =>
                `${typeof value === 'string' ? 150 - value.length : '150'} characters left.`,
            },
        },
        {
            label: 'Company Milestones',
            name: 'milestones',
            type: 'array',
            required: true,
            maxRows: 4, 
            minRows:4,
            fields: [
                {
                    label: 'Milestone Label',
                    name: 'label',
                    type: 'text',
                    required: true,
                    minLength: 2,
                    maxLength: 20,
                },
                {
                    label: 'Milestone Value',
                    name: 'value',
                    type: 'number',
                    min: 1,
                    max: 50000,
                    required: true,
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