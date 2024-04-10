import { Block } from "payload/types";

export type Type = {
    blockType: "content";
    blockName?: string;
    content: unknown;
  };

  
export const TwoColumnImageRight: Block = {
    slug: 'twoColumnImageRight',
    labels: {
        singular: 'Two Column Image Right Block',
        plural: 'Two Column Image Right Blocks',
    },
    fields: [
        {
            label: 'Title Text',
            name: 'header',
            required: true,
            type: 'text',
            minLength: 1,
            maxLength: 120,
            admin: {
                description: ({ path, value }) =>
                  `${typeof value === 'string' ? 120 - value.length : '120'} characters left.`,
              },
        },
        {
            label: 'Subtitle Text (Optional)',
            name: 'subheader',
            type: 'textarea',
            maxLength: 300,
            admin: {
                description: ({ path, value }) =>
                  `${typeof value === 'string' ? 300 - value.length : '300'} characters left.`,
              },

        },
        {
            label: 'Featured Image',
            name: 'featuredImage',
            type: 'upload',
            relationTo: 'media',
            admin:{
                position: 'sidebar',
            },
            required: true,
          },
    ]
}