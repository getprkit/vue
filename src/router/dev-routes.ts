// These routes are defined only in development mode
// TODO: This file will move to another library in future. (document library)
import type { RouteRecordRaw } from 'vue-router'
import { docLinks } from '@vd/doc-configs.ts'

export default function devRoutes(): RouteRecordRaw[] {
  return [
    {
      name: 'Docs',
      path: '/docs',
      component: () => import('@vd/doc-index.vue'),
      children: Object.values(docLinks)
        .flat()
        .map(([name, type]) => {
          return {
            name: name,
            path: `/docs/${name.replace(/\s+/g, '-').toLowerCase()}`,
            component: () => import(`../views/docs/components/${name}.${type}`),
          }
        }),
    },
  ]
}
