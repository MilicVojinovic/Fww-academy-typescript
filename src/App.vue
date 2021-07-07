<template>
<div id="app" class="h-screen w-screen">
    <div class="h-full">
        <!-- <component :is="dynamicComponent"></component> -->
        <layout>
            <router-view />
        </layout>
    </div>
</div>
</template>

<script lang="ts">
import {
    Component,
    Vue
} from 'vue-property-decorator'
@Component
export default class App extends Vue {
    public components: string[] = ['loader', 'messages'];
	mounted() {
	}
    // get loader() {
    //         return this.$store.getters["appStore/getState"]("loader");
    //     };
    // get messages() {
    //         return this.$store.getters["appStore/getState"]("messages").response;
    //     };
    // get dynamicComponent() {
    //         let activeComponent;
    //         this.components.forEach(element => {
    //             if (this[element]) {
    //                 activeComponent = element
    //             }
    //         });
	// 		return activeComponent;
    // }
}
</script>

<style lang='scss'>
</style>
