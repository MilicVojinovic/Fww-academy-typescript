import Vue from 'vue'
import VueRouter , { RouteConfig } from 'vue-router'
import { ROLES } from "../constants/constants";
import Login from '../views/login/Login.vue'
import { routerService } from './router.service'


Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
	{
		path: '/',
		name: 'Login',
		meta: {
			allowedRoles: [ROLES.student, ROLES.teacher],
		},
		component: Login
	},
	{
		path: '/register',
		name: 'Register',
		meta: {
			allowedRoles: [ROLES.student, ROLES.teacher],
		},
		component: () => import('../views/register/Register.vue')
	},
	{
		path: '/student-home',
		name: 'StudentHome',
		beforeEnter: routerService.routerGuards,
		meta: {
			allowedRoles: [ROLES.student],
		},
		component: () => import('../views/student/StudentHome.vue')
	},
	{
		path: '/course/:id',
		name: 'StudentCourse',
		beforeEnter: routerService.routerGuards,
		meta: {
			allowedRoles: [ROLES.student],
		},
		component: () => import('../views/student/StudentCourse.vue')
	},
	{
		path: '/finished-courses',
		name: 'StudentFinishedCourses',
		beforeEnter: routerService.routerGuards,
		meta: {
			allowedRoles: [ROLES.student],
		},
		component: () => import('../views/student/StudentFinishedCourses.vue')
	},
	{
		path: '/current-courses',
		name: 'StudentCurrentCourses',
		beforeEnter: routerService.routerGuards,
		meta: {
			allowedRoles: [ROLES.student],
		},
		component: () => import('../views/student/StudentCurrentCourses.vue')
	},
	{
		path: '/all-courses',
		name: 'StudentAllCourses',
		beforeEnter: routerService.routerGuards,
		meta: {
			allowedRoles: [ROLES.student],
		},
		component: () => import('../views/student/StudentAllCourses.vue')
	},

	{
		path: '/teacher-home',
		name: 'TeacherHome',
		beforeEnter: routerService.routerGuards,
		meta: {
			allowedRoles: [ROLES.teacher],
		},
		component: () => import('../views/teacher/TeacherHome.vue')
	},
	{
		path: '/students',
		name: 'TeacherStudentList',
		beforeEnter: routerService.routerGuards,
		meta: {
			allowedRoles: [ROLES.teacher],
		},
		component: () => import('../views/teacher/TeacherStudentList.vue')
	},
	{
		path: '/courses',
		name: 'TeacherCoursesList',
		beforeEnter: routerService.routerGuards,
		meta: {
			allowedRoles: [ROLES.teacher],
		},
		component: () => import('../views/teacher/TeacherCoursesList.vue')
	},
	{
		path: '/request-course',
		name: 'TeacherRequestCoursesList',
		beforeEnter: routerService.routerGuards,
		meta: {
			allowedRoles: [ROLES.teacher],
		},
		component: () => import('../views/teacher/TeacherRequestCoursesList.vue')
	},
	{
		path: '*',
		name: '404',
		beforeEnter: routerService.routerGuards,
		meta: {
			allowedRoles: [],
		},
		component: Login
	},


]

const router = new VueRouter({
	mode: 'history',
	routes,

})

export default router
