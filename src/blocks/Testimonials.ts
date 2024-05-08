import { Block } from "payload/types";
const thumbnail = require("./thumbnails/Testimonial.png");
export type Type = {
    blockType: "content";
    blockName?: string;
    content: unknown;
  };

export const Testimonials:Block={
    slug:"testimonialsBlock",
    imageURL: `${thumbnail}`,
    imageAltText: 'Block Thumbnail',
    labels: {
        singular: 'Featured Testimonial',
        plural: 'Featured Testimonials',
    },
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
            label: 'Block Description',
            name: 'blockDescription',
            type: 'textarea',
            required: true,
            maxLength: 300,
            admin: {
                description: ({ path, value }) =>
                  `${typeof value === 'string' ? 300 - value.length : '300'} characters left.`,
              },
        },
        {
            label: 'First Featured Testimonial',
            name: 'firstTestimonial',
            required: true,
            type: 'relationship',
            relationTo: 'testimonials'
        },
        {
            label: 'Second Featured Testimonial',
            name: 'secondTestimonial',
            required: true,
            type: 'relationship',
            relationTo: 'testimonials'
        },
        {
            label: 'Third Featured Testimonial',
            name: 'thirdTestimonial',
            required: true,
            type: 'relationship',
            relationTo: 'testimonials'
        }
    ]
}