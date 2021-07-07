<template>
<div class="student flex h-full">
    <side-menu v-if="$route.path != '/' && $route.path != '/register'" :menuList="menuList" />
    <slot />
</div>
</template>

<script lang="ts">
export default {
    data() {
        return {
            menuListStudent: [{
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
            ],
            menuListTeacher: [{
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
            ],
        }
    },
    methods: {},
    computed: {
        loggedUserRole() {
            return this.$store.getters["authStore/getState"]("loggedUser") ? this.$store.getters["authStore/getState"]("loggedUser").role : ''
        },
        menuList() {
            if (this.loggedUserRole === "teacher") {
                return this.menuListTeacher
            } else if (this.loggedUserRole === "student") {
                return this.menuListStudent
            } else {
                return []

            }
        }
    },
}
</script>
