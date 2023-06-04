export default [
  { path: '/', name: 'grid', component: () => import('@/views/Grid.vue') },
  {
    path: '/:id',
    name: 'detail',
    component: () => import('@/views/Detail.vue'),
  },
]
