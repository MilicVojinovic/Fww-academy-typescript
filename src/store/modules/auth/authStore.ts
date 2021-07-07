import SHA512 from "crypto-js/sha512";
import { ROLES, TOKEN_LS_NAME } from "../../../constants/constants";
import { authService } from '../../../modules/auth/auth.service'

const authStore = {
	namespaced: true,
	state: {
		loggedUser: null,
	},

	getters: {
		getState: (state) => (prop) => {
			return state[prop];
		},
	},

	mutations: {
		setState: (state, { prop, value }) => {
			state[prop] = value;
		},
	},

	actions: {
		async login({commit}, payload) {
			try {
				let formData = { ...payload };
				formData.password = SHA512(formData.password).toString()

				const account = await authService.login(formData);

				commit('setState', {
					prop: 'loggedUser',
					value: account.data
				});

				let redirectTo = '/';
				if (account.data.role === ROLES.student) {
					redirectTo = '/student-home';
				} else if (account.data.role === ROLES.teacher) {
					redirectTo = '/teacher-home';
				}

				localStorage.setItem(TOKEN_LS_NAME, account.data['session-id']);
				return Promise.resolve(redirectTo);

			} catch (error) {
				return Promise.reject(error);
			}
		},

		async fetchActiveAccount({ commit }) {
			try {
				const account = await authService.fetchActiveAccount();

				commit('setState', {
					prop: 'loggedUser',
					value: account.data
				});

				return Promise.resolve(account);
			} catch (error) {
				return Promise.reject(error);
			}
		},

		logout({ commit }) {
			authService.removeToken();
			commit('setState', {
				prop: 'loggedUser',
				value: null
			});
		},

		async register({commit}, payload) {
			try {
				let formData = { ...payload };
				formData.password = SHA512(formData.password).toString()

				await authService.register(formData);

				const account = await authService.login({
					email : formData.email,
					password : formData.password
				});

				commit('setState', {
					prop: 'loggedUser',
					value: account.data
				});

				let redirectTo = '/';
				if (account.data.role === ROLES.student) {
					redirectTo = '/student-home';
				} else if (account.data.role === ROLES.teacher) {
					redirectTo = '/teacher-home';
				}

				localStorage.setItem(TOKEN_LS_NAME, account.data['session-id']);
				return Promise.resolve(redirectTo);

			} catch (error) {
				return Promise.reject(error);
			}
		},
	},
};

export default authStore;
