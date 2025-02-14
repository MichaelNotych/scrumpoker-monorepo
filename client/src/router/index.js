import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RoomView from '../views/RoomView.vue'
import NotFoundView from '@/views/NotFoundView.vue'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'home',
			component: HomeView,
		},
		{
			path: '/room/:id',
			name: 'room',
			component: RoomView,
		},
		{
			path: '/:catchAll(.*)',
			name: 'not-found',
			component: NotFoundView,
		},
	],
})

export default router
