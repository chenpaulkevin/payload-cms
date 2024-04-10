import { Block } from "payload/types";

export type Type = {
    blockType: "content";
    blockName?: string;
    content: unknown;
  };

  
export const CenteredText: Block = {
    slug: 'centeredText',
    labels: {
        singular: 'Centered Text Block',
        plural: 'Centered Text Blocks',
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
                  `${typeof value === 'string' ? 200 - value.length : '200'} characters left.`,
              },

        }
    ]
}