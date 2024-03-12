import { Field } from "payload/types";
import formatSlug from "../utilities/formatSlug";

const slug: Field = {
    name: 'slug',
    label: 'Page Slug (URL Identifier)',
    type: 'text',
    unique:true,
    admin: {
        position: 'sidebar',
        readOnly:true,
    },
    hooks: {
        beforeValidate: [
            formatSlug('title'),
        ]
    }
};

export default slug;