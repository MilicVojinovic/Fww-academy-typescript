import { api } from '@/api/api';
const ROUTES = {
	LOGIN: "/login",
	REGISTER: "/register",
	ACTIVE_ACCOUNT: "/user/session"
};

class AuthRepo {
	login(data) {
		return api.post(ROUTES.LOGIN, data);
	}

	register(data) {
		return api.post(ROUTES.REGISTER, data);
	}

	fetchActiveAccount() {
		return api.get(ROUTES.ACTIVE_ACCOUNT);
	}
}

export const authRepo = new AuthRepo();
