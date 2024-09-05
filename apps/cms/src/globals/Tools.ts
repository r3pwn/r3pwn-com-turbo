import { GlobalConfig } from 'payload/types'
import CacheBuster from '@/components/CacheBuster'

export const Tools: GlobalConfig = {
  slug: 'tools',
  fields: [
    {
      name: 'cache-buster',
      type: 'ui',
      admin: {
        components: {
          Field: CacheBuster,
        },
      },
    },
  ],
}
