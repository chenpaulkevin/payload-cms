import { Block } from "payload/types";

export type Type = {
    blockType: "content";
    blockName?: string;
    content: unknown;
  };

export const FullWidthImage: Block = {
  slug: "fullWidthImage",
  labels: {
    singular: "Full Width Image",
    plural: "Full Width Images",
  },
  fields: [
    {
      name: "image",
      label: "Select Full Width Image",
      type: "upload",
      relationTo: "media",
    },
  ],
}
