import GridVue from './views/Grid.vue'
import DetailVue from './views/Detail.vue'

export default [
  { path: '/', name: 'grid', component: GridVue },
  { path: '/:id', name: 'detail', component: DetailVue },
]
