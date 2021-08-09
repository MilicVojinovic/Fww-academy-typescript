<template>
<div class="messages w-full h-full absolute left-0 top-0 z-10 bg-opacity-75 overflow-hidden">
    <div class="relative h-full w-full">
        <div ref="messageBox" class="rounded-md message relative flex items-center justify-center" :class="getMessages.successMessages ? messageColorGreen : messageColorRed">
            <span class="text-white">{{messageText}}</span>
        </div>
    </div>
</div>
</template>

<script lang="ts">
import NotificationMessageMixin from '@/common/mixins/NotificationMessageMixin'
import {
    errorCodes, 
	succesCodes
} from '@/constants/messages';
import {
    Component,
    Mixins
} from 'vue-property-decorator'
import {
    namespace
} from "vuex-class";
const AppStore = namespace("appStore");

@Component
export default class Messages extends Mixins(NotificationMessageMixin) {
    public messageColorRed: string = 'bg-red-400';
    public messageColorGreen: string = 'bg-green-400';

    mounted() {
        const messageBox: any = this.$refs.messageBox;
        let count = 0;
		if (messageBox) {
			messageBox.addEventListener("animationend", () => {
            count++;
            if (count === 3) {
                this.notificationMessage(null, '')
            }
        })
		}
    };

	@AppStore.Getter
    public getMessages: any;

    get messageText() {
        if (this.getMessages.response && this.getMessages.response.status === 200) {
            if (!this.getMessages.successMessages) {
                return 'Uspešno!'
            }
			let succesCodesVar: any = succesCodes.SUCCESS_CODES;
            return succesCodesVar[this.getMessages.successMessages];
        }

        if (this.getMessages.response && this.getMessages.response.response && this.getMessages.response.response.data) {
			let errorCodesVar: any = errorCodes.ERROR_CODES;
            return errorCodesVar[this.getMessages.response.response.data.errors]
        } else {
            return 'Nešto nije u redu!'
        }
    };
};
</script>

<style lang="scss" scoped>
.message {
    position: absolute;
    bottom: 20px;
    right: -320px;
    width: 320px;
    height: 128px;

    animation: animation 4s linear;

    &::before,
    &::after {
        background-color: rgb(92, 92, 221);
        width: 0px;
        height: 6px;
        position: absolute;
        content: '';
        animation: pseudo-elem-animation 4s linear;

    }

    &::before {
        bottom: 2px;
        left: 10px;
    }

    &::after {
        bottom: 2px;
        right: 10px;
    }

}

@keyframes animation {
    0% {
        transform: translateX(0px) scale(1, 1);
    }

    20% {
        transform: translateX(-200px) scale(1, 1);
    }

    40% {
        transform: translateX(-400px) scale(1, 1);
    }

    70% {
        transform: translateX(-400px) scale(1, 1);
    }

    85% {
        transform: translateX(-400px) scale(0.5, 0.5);
    }

    100% {
        transform: translateX(-400px) scale(0, 0);
    }
}

@keyframes pseudo-elem-animation {
    0% {
        width: 0px;
    }

    40% {
        width: 0px;
    }

    70% {
        width: 150px;
    }

    100% {
        width: 150px;
    }
}

.message:hover,
.message:hover::before,
.message:hover::after {
    -webkit-animation-play-state: paused;
}
</style>
