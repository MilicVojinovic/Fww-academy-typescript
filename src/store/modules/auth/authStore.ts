import SHA512 from "crypto-js/sha512";
import { ROLES, TOKEN_LS_NAME } from "../../../constants/constants";
import { authService } from './auth.service';

import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators'
@Module({ namespaced: true})
class AuthStore extends VuexModule {
	public loggedUser: object = {};

	get getLoggedUser(): object {
		return this.loggedUser;
	}

	@Mutation
	public setState(obj: any) {
		for (const key in this) {
			if (key === obj.prop) {
				this[key] = obj.value;
			}
		}
	}

	@Action({ rawError: true })
	async login(payload: any): Promise<any> {
		try {
			
			let formData = { ...payload };

			formData.password = SHA512(formData.password).toString()

			const account = await authService.login(formData);

			this.context.commit('setState', {
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
	};
	@Action({ rawError: true })
	async fetchActiveAccount() {
		try {
			const account = await authService.fetchActiveAccount();

			this.context.commit('setState', {
				prop: 'loggedUser',
				value: account.data
			});

			return Promise.resolve(account);
		} catch (error) {
			return Promise.reject(error);
		}
	};
	@Action({ rawError: true })
	logout() {
		authService.removeToken();
		this.context.commit('setState', {
			prop: 'loggedUser',
			value: null
		});
	};
	@Action({ rawError: true })
	async register(payload: any) {
		try {
			let formData = { ...payload };
			formData.password = SHA512(formData.password).toString()

			await authService.register(formData);

			const account = await authService.login({
				email: formData.email,
				password: formData.password
			});

			this.context.commit('setState', {
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
	};

}
export default AuthStore;
