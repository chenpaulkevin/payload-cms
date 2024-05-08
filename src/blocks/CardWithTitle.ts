import { Block } from "payload/types";

export type Type = {
    blockType: "content";
    blockName?: string;
    content: unknown;
  };

export const CardWithTitle: Block = {
    slug: 'cardWithTitle',
    imageAltText: 'Block Thumbnail',
    labels: {
        singular: 'Card with title Block',
        plural: 'Card with title Block'
    },
    fields: [
        {
            label: 'Cards',
            name: 'cards',
            type: 'array',
            required: true,
            minRows:3,
            fields: [
                {
                    type: 'row',
                    fields: [
                        {
                            label: 'Card Label',
                            name: 'label',
                            type: 'text',
                            required: true,
                            minLength: 2,
                            maxLength: 24,
                            admin: {
                                description: ({ path, value }) =>
                                  `${typeof value === 'string' ? 24 - value.length : '24'} characters left.`,
                              },
                        },
                        {
                            label: 'Card Description',
                            name: 'description',
                            type: 'text',
                            required: true,
                            minLength: 2,
                            maxLength: 80,
                            admin: {
                                description: ({ path, value }) =>
                                  `${typeof value === 'string' ? 80 - value.length : '80'} characters left.`,
                              },
                        },
                    ]
                },
                {
                    label: 'Card Image',
                    name: 'image',
                    type: 'upload',
                    required: true,
                    relationTo: 'media',
                }
            ]
        },
    ]
}