<template>
<div class="teacher flex w-full h-full p-5 bg-blue-50">
    <div class="flex flex-col">
        <div class="mb-3">Vaši podaci</div>
        <div class="mb-3">Ime : {{loggedUser.name}}</div>
        <div class="mb-3">Prezime : {{loggedUser.surname}}</div>
        <div class="mb-3">E-mail : {{loggedUser.email}}</div>
    </div>
</div>
</template>

<script lang="ts">
import NotificationMessageMixin from '@/common/mixins/NotificationMessageMixin'

export default {
    data() {
        return {};
    },
	mixins: [NotificationMessageMixin],
    created() {
            this.$store.dispatch("teacherStore/fetchTeacherData",{ id : this.loggedUser.id} )
			.then(() => {})
			.catch((err) => {
                this.notificationMessage(err , '')
            });
    },
    methods: {},
    computed: {
        teacherData() {
            return this.$store.getters["teacherStore/getState"]("teacher")
        },
		loggedUser() {
            return this.$store.getters["authStore/getState"]("loggedUser");
        },
    }
};
</script>
