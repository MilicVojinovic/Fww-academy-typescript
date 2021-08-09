
import { VuexModule, Module, Mutation } from 'vuex-module-decorators';
@Module({ namespaced: true })
class AppStore extends VuexModule {
	public name: string = '';
	public loader: boolean = false;
	public messages: {
		response: any,
		successMessage: any
	} = {
			response: null,
			successMessage: ''
		};

	get getName(): string {
		return this.name;
	}
	get getLoader(): boolean {
		return this.loader;
	}
	get getMessages(): any {
		return this.messages;
	}
	@Mutation
	public setState(obj: any) {
		for (const key in this) {
			if (key === obj.prop) {
				this[key] = obj.value;
			}
		}
	}
}
export default AppStore
