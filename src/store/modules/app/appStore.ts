
const appStore = {
	namespaced: true,
	state: {
		loader: false,
		messages: {
			response : null,
			successMessage : ''
		},
	},
	getters: {
		getState: (state) => (prop) => {
			return state[prop];
		},
	},

	mutations: {
		setState: (state, { prop, value }) => {
			state[prop] = value;
		}
	},

	actions: {
	},
};

export default appStore;
