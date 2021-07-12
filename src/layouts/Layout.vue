<template>
<div class="student flex h-full">
    <side-menu v-if="$route.path != '/' && $route.path != '/register'" :menuList="menuList" />
    <slot />
</div>
</template>

<script lang="ts">
import {
    Component,
    Vue
} from 'vue-property-decorator'
import { namespace } from "vuex-class";
import { idObject } from '@/common/typeInterfaces/idObjects';

const AuthStore = namespace("authStore");
@Component
export default class Layout extends Vue {
    public menuListStudent: object[] = [{
            link: '/student-home',
            title: 'Početna',
            icon: 'fas fa-home'
        },
        {
            link: '/finished-courses',
            title: 'Završeni kursevi',
            icon: 'fas fa-check',
        },
        {
            link: '/current-courses',
            title: 'Kursevi koje trenutno pohadjate',
            icon: 'fas fa-question',
        },
        {
            link: '/all-courses',
            title: 'Spisak kurseva koje niste pohadjali',
            icon: 'fas fa-list',
        },
    ];
    public menuListTeacher: object[] = [{
            link: '/teacher-home',
            title: 'Početna',
            icon: 'fas fa-home'
        },
        {
            link: '/courses',
            title: 'Lista Vaših kurseva',
            icon: 'fas fa-list',
        },
        {
            link: '/students',
            title: 'Studenti',
            icon: 'fas fa-user-graduate',
        },
        {
            link: '/request-course',
            title: 'Zahtevi za pohadjanje kursa',
            icon: 'fa fa-reply-all',
        },
    ];

	@AuthStore.Getter
    public getLoggedUser!: idObject | null;

    get menuList() {
            if (this.getLoggedUser?.role === "teacher") {
                return this.menuListTeacher
            } else if (this.getLoggedUser?.role === "student") {
                return this.menuListStudent
            } else {
                return []
            }
        }
}
</script>
