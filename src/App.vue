<template>
<div id="app" class="h-screen w-screen">
    <div class="h-full">
        <loader v-if="getLoader"></loader>
		<messages v-if="getMessages && getMessages.response"></messages>
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
import {
    namespace
} from "vuex-class";

const AppStore = namespace("appStore");

@Component
export default class App extends Vue {
    mounted() {}
	
    @AppStore.Getter
    public getLoader: any;

    @AppStore.Getter
    public getMessages: any;

}
</script>

<style lang='scss'>
</style>
