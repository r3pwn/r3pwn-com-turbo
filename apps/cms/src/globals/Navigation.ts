import { revalidateTags } from '@/utils/revalidate-helper'
import { getSupportedIcons } from '@repo/payload-common/icons'
import type { GlobalConfig } from 'payload'

export const Navigation: GlobalConfig = {
  slug: 'navigation',
  typescript: {
    interface: 'NavigationData',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          name: 'header',
          interfaceName: 'Header',
          fields: [
            {
              name: 'navigationLinks',
              type: 'array',
              label: 'Navigation Links',
              labels: {
                singular: 'Link',
                plural: 'Links',
              },
              fields: [
                {
                  name: 'label',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'target',
                  type: 'relationship',
                  relationTo: 'pages',
                  required: true,
                },
              ],
            },
          ],
        },
        {
          name: 'footer',
          interfaceName: 'Footer',
          fields: [
            {
              name: 'socialLinks',
              type: 'array',
              label: 'Social Links',
              labels: {
                singular: 'Link',
                plural: 'Links',
              },
              fields: [
                {
                  name: 'ariaLabel',
                  type: 'text',
                },
                {
                  name: 'url',
                  type: 'text',
                },
                {
                  name: 'icon',
                  type: 'select',
                  options: getSupportedIcons().map((iconName) => ({
                    label: `${iconName.charAt(0).toUpperCase()}${iconName.slice(1)}`,
                    value: iconName,
                  })),
                },
                {
                  name: 'openInNewTab',
                  type: 'checkbox',
                  label: 'Open link in new tab',
                  defaultValue: false,
                },
              ],
            },
            {
              name: 'copyrightText',
              type: 'text',
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [
      async () => {
        await revalidateTags(['navigation'])
      },
    ],
  },
}
