<template>
<div class="login bg-blue-200 w-full h-full flex items-center justify-center">
    <div class="w-5/12 md:w-3/12">
        <div class="flex items-center flex-col relative">
            <font-awesome-icon icon="user-graduate" class="text-5xl mb-2" />
            <font-awesome-icon icon="globe-africa" class="text-7xl text-blue-400 rotateIn" />
            <font-awesome-icon icon="industry" class="text-7xl text-blue-400 rotateOut" />
            <span class="text-xl mt-1 mb-8 tracking-wider font-bold border-b-4 border-black">fww academy</span>
        </div>
        <LoginForm @signIn="signIn" />
    </div>
</div>
</template>

<script lang="ts">
import LoginForm from './components/LoginForm.vue'
import NotificationMessageMixin from '@/common/mixins/NotificationMessageMixin'
import {
    Component
} from 'vue-property-decorator'

import { namespace } from "vuex-class";
const AuthStore = namespace("authStore");

@Component({
	components: {
    LoginForm
  }
})
export default class Login extends NotificationMessageMixin {
	
	@AuthStore.Action
	public login!: (payload: any) => Promise<any>


    signIn(loginData : object) {
		
        this.login(loginData).then((result: any) => {
            this.$router.push(result)
        })
		.catch((err) => {
			this.notificationMessage(err , '')
        });
    }
}
</script>

<style lang="scss" scoped>
// .rotateIn {
//     animation: rotateInFrames 6s infinite;
// 	animation-direction: alternate-reverse;}

// @keyframes rotateInFrames {
//     from {
//         transform: rotate(-50deg) scale(1, 1);
//     }
//     to {
//         transform: rotate(1440deg) scale(0, 0);
//     }
// }

// .rotateOut {
// 	color: blue;
//     position: absolute;
// 	top: 56px;
//     animation: rotateOutFrames 6s infinite;
// 	animation-direction: alternate-reverse;
// }

// @keyframes rotateOutFrames {
//     from {
//         transform: rotate(0deg) scale(0, 0);
//     }

//     to {
//         transform: rotate(1440deg) scale(1, 1);
//     }
// }
</style>
