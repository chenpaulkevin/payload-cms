import { Block } from "payload/types";
import thumbnail from "./thumbnails/BlogCollection.png";
export type Type = {
    blockType: "content";
    blockName?: string;
    content: unknown;
  };
export const  BlogCollection:Block = {
    slug: 'blogCollection',
    imageURL: `${thumbnail}`,
    imageAltText: 'Block Thumbnail',
    labels: {
        singular: 'Blog Collection Block',
        plural: 'Blog Collection Blocks'
    },
    fields: [
                {
                    type: 'row',
                    fields: [
                        {
                            label: 'Block Header',
                            name: 'blockHeader',
                            type: 'text',
                            required: true,
                            minLength: 2,
                            maxLength: 50
                        },
                        {
                            label: 'Call To Action Button',
                            name: 'cta',
                            type: 'array',
                            required: true,
                            maxRows: 1,
                            fields: [
                                {
                                    label: 'Label',
                                    name: 'ctaLabel',
                                    type: 'text',
                                    required: true,
                                    minLength: 2,
                                    maxLength: 20,
                                },
                                {
                                    label: 'Slug / Link',
                                    name: 'ctaLink',
                                    type: 'relationship',
                                    required: true,
                                    relationTo: 'pages',
                                }
                            ]
                        },
                    ]
                },
                {
                    label: 'Main Featured Blog Posts',
                    name: 'mainFeature',
                    unique: true,
                    required: true,
                    type: 'relationship',
                    relationTo: 'blog',
                    admin: {
                        sortOptions: 'updatedAt',
                    }
                },
                {
                    label: 'Secondary Featured Blog Posts',
                    name: 'secondaryFeature',
                    unique: true,
                    required: true,
                    type: 'relationship',
                    relationTo: 'blog',
                    admin: {
                        sortOptions: 'updatedAt',
                    }
                },                
                {
                    label: 'Third Featured Blog Posts',
                    name: 'thirdFeature',
                    unique: true,
                    required: true,
                    type: 'relationship',
                    relationTo: 'blog',
                    admin: {
                        sortOptions: 'updatedAt',
                    }
                }
    ]
}