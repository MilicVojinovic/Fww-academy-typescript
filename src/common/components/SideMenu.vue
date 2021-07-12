<template>
<div class="flex flex-col h-full bg-blue-300">
    <div class="logout flex justify-center pt-6">
        <i @click="logout()" class="fa fa-power-off text-black w-6 h-6 
            text-2xl cursor-pointer
            hover:opacity-50 "></i>
    </div>
    <div class="menu  pt-6 flex-col flex-grow">
        <div v-for="menu in menuList" :key="menu.name" @click="$router.push(menu.link)" class="py-3 px-6 flex items-center rounded-xl hover:bg-blue-500 cursor-pointer border border-gray-500 m-2" :class="{'pointer-events-none bg-blue-500 text-white' : $route.path === menu.link}">
            <div class="mx-4 w-8 inline-block text-center">
                <i :class="menu.icon"></i>
            </div>
            <div :class="!menuClosed ? 'sideMenu-open' : 'sideMenu-close' " class="inline-block flex-shrink overflow-hidden whitespace-nowrap ">{{menu.title}}</div>
        </div>
    </div>
    <div class="arrow h-12 justify-center flex items-center cursor-pointer rounded-xl hover:bg-blue-500" @click="menuClosed=!menuClosed">
        <i v-if="!menuClosed" class="fas fa-angle-double-left text-2xl"></i>
        <i v-if="menuClosed" class="fas fa-angle-double-right text-2xl"></i>
    </div>
</div>
</template>

<script lang="ts">
import {
    Component,
    Vue
} from 'vue-property-decorator'
@Component({
    props: {
        menuList: {
            required: true,
            type: Array
        },
    },
})
export default class SideMenu extends Vue {
    public menuClosed: boolean = false;
    mounted() {};
    logout() {
        this.$store.dispatch("authStore/logout")
        this.$router.push('/')
    }
};
</script>

<style scoped>
.sideMenu-open {
    max-width: 1000px;
    transition: 0.8s ease-in-out;
}

.sideMenu-close {
    max-width: 0px;
    transition: 0.8s ease-in-out;
}
</style>
