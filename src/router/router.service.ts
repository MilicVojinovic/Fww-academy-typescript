import { TOKEN_LS_NAME } from "../constants/constants";
import store from '../store'


class Router {
	routerGuards(to : any, from : any, next : any) {
		const token = localStorage.getItem(TOKEN_LS_NAME);

		store.dispatch('authStore/fetchActiveAccount').then((res) => {
			if ((!token && to.path !== '/' && to.path !== '/register') || (token && !to.meta.allowedRoles.includes(res.data.role))) {
				next('/')
			}	else {
				next()
			}
		}).catch(() => {
			if ((!token && to.path !== '/' && to.path !== '/register')) {
				next('/')
			} else {
				next()
			}
		})
	}
}
export const routerService = new Router();
