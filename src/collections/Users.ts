import { text } from 'express'
import { CollectionConfig } from 'payload/types'
import { isAdmin } from '../access/isAdmin'
import { isAdminOrSelf } from '../access/isAdminOrSelf'

const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'email',
  },
  access:{
    create: isAdmin,
    read: () => true,
    update: isAdminOrSelf,
    delete: isAdmin,
  },
  fields: [
    // Email added by default
    // Add more fields as needed
    {
      type: 'row',
      fields: [
        {
          label: 'First Name',
          name:'firstName',
          required: true,
          type: "text",
          minLength: 2,
          maxLength: 50,
        },
        {
          label: 'Last Name',
          name:'lastName',
          required: true,
          type: "text",
          minLength: 2,
          maxLength: 50,
        },
      ]
    },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue:'author',
      options: [
        {
          label: 'Admin',
          value: 'admin'
        },
        {
          label: 'Developer',
          value: 'developer'
        },
        {
          label: 'Author',
          value: 'author'
        },
      ]
    },
  ],
}

export default Users
