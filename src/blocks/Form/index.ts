import { Block } from "payload/types";

export type Type = {
    blockType: "content";
    blockName?: string;
    content: unknown;
  };

export const FormBlock: Block = {
    slug: 'formBlock',
    labels: {
        singular: 'Form Block',
        plural: 'Form Block',
    },
    fields: [
        {
            name: 'form',
            type: 'relationship',
            relationTo: 'forms',
            required: true,
        },
        {
            label: "Enable 2 Column Layout",
            name: "enable2ColumnLayout",
            type: "checkbox",
        },
        {
            label: "Form Header Text",
            name: "header",
            type: "text",
            required: true,
            minLength: 10,
            maxLength: 100,
 
            admin: {
                condition: (_, { enable2ColumnLayout }) => Boolean(enable2ColumnLayout),
                description: ({ path, value }) =>
                    `${typeof value === 'string' ? 100 - value.length : '100'} characters left.`,
              },
        },
        {
            label: "Form Header Text",
            name: "content",
            type: "richText",
            required: true,
            admin: {
                condition: (_, { enable2ColumnLayout }) => Boolean(enable2ColumnLayout),
              },
        }
    ]

}