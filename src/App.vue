<template>
<div id="app" class="h-screen w-screen">
    <div class="h-full">
        <component v-if="getLoader" :is="'loader'"></component>
		<component v-if="getMessages && getMessages.response" :is="'messages'"></component>
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
