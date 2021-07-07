import { Component, Vue } from 'vue-property-decorator'
@Component
class NotificationMessageMixin extends Vue {
	public notificationMessage(data: any, message: String): void {
		this.$store.commit('appStore/setState', {
			prop: 'messages',
			value: {
				response: data,
				successMessages: message,
			}
		});
	}
}
export default NotificationMessageMixin;
