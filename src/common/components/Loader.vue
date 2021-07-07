<template>
<div class="loader w-full h-full flex items-center justify-center absolute left-0 top-0 z-10 bg-gray-500 bg-opacity-75 ">
    <div class="flex items-center flex-col relative animation">
        <font-awesome-icon icon="user-graduate" class="text-5xl -mb-2" />
        <font-awesome-icon icon="globe-africa" class="text-7xl text-blue-400 rotateIn" />
        <span class="text-xl mt-1 mb-8 tracking-wider font-bold border-b-4 border-black">fww academy</span>
    </div>
</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component
export default class Loader extends Vue {
}
</script>

<style lang="scss" scoped>
.loader {
	animation: opacity 0.2s linear;
} 

@keyframes opacity {
    0% {
        opacity: 0;
    }

    50% {
        opacity: 0.5;
	}
    100% {
       opacity: 1;
    }
}

.animation {
    animation: pulse 2s linear infinite;
}

@keyframes pulse {
    0% {
        transform: scale(1, 1);
    }

    50% {
        transform: scale(1.1, 1.1);
    }

    100% {
        transform: scale(1, 1);
    }
}
</style>
