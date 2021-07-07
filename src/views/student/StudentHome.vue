<template>
<div class="flex flex-grow p-5 bg-blue-50">
    <StudentRateCourseModal v-if="unratedCourse && Object.keys(unratedCourse).length != 0 " />
    <div class="flex flex-col">
        <div class="mb-3">Vaši podaci</div>
        <div class="mb-3">Ime : {{loggedUser.name}}</div>
        <div class="mb-3">Prezime : {{loggedUser.surname}}</div>
        <div class="mb-3">E-mail : {{loggedUser.email}}</div>
    </div>
</div>
</template>

<script lang="ts">
import StudentRateCourseModal from "./components/StudentRateCourseModal";
import NotificationMessageMixin from '@/common/mixins/NotificationMessageMixin'
export default {
    data() {
        return {}
    },
    components: {
        StudentRateCourseModal
    },
    mixins: [NotificationMessageMixin],
    created() {
        this.$store.dispatch("studentStore/fetchUnratedCourse", {
            student_id: this.loggedUser.id
        }).then(() => {}).catch((err) => {
            this.notificationMessage(err, '')
        });
    },
    mounted() {},
    methods: {},
    computed: {
        unratedCourse() {
            return this.$store.getters["studentStore/getState"]("unratedCourse")
        },
        loggedUser() {
            return this.$store.getters["authStore/getState"]("loggedUser");
        },
    },
}
</script>

<style scoped>
</style>
