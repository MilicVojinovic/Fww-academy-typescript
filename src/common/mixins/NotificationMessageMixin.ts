import { Component, Vue } from 'vue-property-decorator'

import { namespace } from "vuex-class";

const AppStore = namespace("appStore");
@Component
class NotificationMessageMixin extends Vue {

	@AppStore.Mutation
	setState!: (obj: any) => void;


	public notificationMessage(data: any, message: String): void {
		this.setState({
			prop: 'messages',
			value: {
				response: data,
				successMessages: message,
			}
		});
	}
}
export default NotificationMessageMixin;
