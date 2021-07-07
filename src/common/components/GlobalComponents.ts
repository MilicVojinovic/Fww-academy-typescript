import Button from './Button.vue'
import Input from './Input.vue'
import Table from './Table.vue'
import Scroll from './Scroll.vue'
import SideMenu from './SideMenu.vue'
import Layout from '../../layouts/Layout.vue'
import Loader from './Loader.vue'
import Messages from './Messages.vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'


library.add(fas);

class GlobalComponents {
	public Global_Components: any = {
		Button,
		FontAwesomeIcon,
		Input,
		Table,
		SideMenu,
		Scroll,
		Layout,
		Loader,
		Messages
	};
}

export const globalComponents = new GlobalComponents();