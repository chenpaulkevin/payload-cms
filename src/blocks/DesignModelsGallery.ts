import { Block } from "payload/types";
export type Type = {
    blockType: "content";
    blockName?: string;
    content: unknown;
  };

  export const DesignModelsGallery: Block = {
      slug: "designModelsGallery",
      labels: {
        singular: "Design Model Gallery Component",
        plural: "Design Model Gallery Components",
      },
      fields: [
        {
            label: "Block Header",
            name: "blockHeader",
            type: "text",
            required: true,
            minLength: 2,
            maxLength: 60,
            admin: {
                description: ({ path, value }) =>
                `${typeof value === 'string' ? 60 - value.length : '60'} characters left.`,
            },
        },
        {
            label: "Block Description",
            name: "blockDescription",
            required: true,
            type: "textarea",
            minLength: 10,
            maxLength: 100,
            admin: {
                description: ({ path, value }) =>
                `${typeof value === 'string' ? 100 - value.length : '100'} characters left.`,
            },
        }
      ]
  }