import { Block } from "payload/types";
export type Type = {
  blockType: "content";
  blockName?: string;
  content: unknown;
};
export const Hero: Block = {
  slug: "hero",
  labels: {
    singular: "Hero Block",
    plural: "Hero Blocks",
  },
  fields: [
    {
      label: "Hero Headline",
      name: "headline",
      required: true,
      type: "text",
      minLength: 4,
      maxLength: 40,
    },
    {
      label: "Hero Subheadline",
      name: "subHeadline",
      required: true,
      type: "textarea",
      minLength: 10,
      maxLength: 300,
      admin: {
        description: ({ path, value }) =>
          `${typeof value === 'string' ? 300 - value.length : '300'} characters left.`,
      },
    },
    {
      label: "Call to Action Headline",
      name: "ctaHeadline",
      required:true,
      type: 'text',
      minLength: 10,
      maxLength: 80,
      admin: {
        description: ({ path, value }) =>
          `${typeof value === 'string' ? 80 - value.length : '80'} characters left.`,
      },
    },
    {
      type: 'row',
      fields: [
        {
          label: "Main Featured Model",
          name: "mainFeature",
          type: "relationship",
          relationTo: "designModels",
          required:true,
          admin: {
            position: "sidebar",
          },
        },
        {
          label: "Second Featured Model",
          name: "secondFeature",
          type: "relationship",
          relationTo: "designModels",
          required:true,
          admin: {
            position: "sidebar",
          },
        },
        {
          label: "Third Featured Model",
          name: "thirdFeature",
          type: "relationship",
          relationTo: "designModels",
          required:true,
          admin: {
            position: "sidebar",
          },
        },
      ]
    },

  ],
};
