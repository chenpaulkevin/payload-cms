import { Block } from "payload/types";
export type Type = {
    blockType: "content";
    blockName?: string;
    content: unknown;
  };
export const  BlogCollection:Block = {
    slug: 'blogCollection',
    labels: {
        singular: 'Blog Collection Block',
        plural: 'Blog Collection Blocks'
    },
    fields: [
        {
            label: 'Featured Blog Posts',
            name: 'featuredBlogPosts',
            interfaceName: 'Meta',
            type: "group",
            fields: [
                {
                    label: 'Main Featured Blog Posts',
                    name: 'mainFeature',
                    required: true,
                    type: 'relationship',
                    relationTo: 'blog'
                },
                {
                    label: 'Secondary Featured Blog Posts',
                    name: 'secondaryFeature',
                    required: true,
                    type: 'relationship',
                    relationTo: 'blog'
                },                {
                    label: 'Third Featured Blog Posts',
                    name: 'thirdFeature',
                    required: true,
                    type: 'relationship',
                    relationTo: 'blog'
                }
            ]
        }

    ]
}