<template>
    <div class="flex flex-grow p-5 bg-blue-50">
        <StudentRateCourseModal
            v-if="unratedCourse && Object.keys(unratedCourse).length != 0"
        />
        <div class="flex flex-col">
            <div class="mb-3">Vaši podaci</div>
            <div class="mb-3">Ime : {{ loggedUser.name }}</div>
            <div class="mb-3">Prezime : {{ loggedUser.surname }}</div>
            <div class="mb-3">E-mail : {{ loggedUser.email }}</div>
        </div>
    </div>
</template>

<script lang="ts">
import StudentRateCourseModal from "./components/StudentRateCourseModal.vue";
import NotificationMessageMixin from "@/common/mixins/NotificationMessageMixin";
import { idObject } from "@/common/typeInterfaces/idObjects";

import { namespace } from "vuex-class";

import { Component } from "vue-property-decorator";

const StudentStore = namespace("studentStore");
const AuthStore = namespace("authStore");

@Component({
    components: {
        StudentRateCourseModal,
    },
})
export default class StudentHome extends NotificationMessageMixin {

	@StudentStore.Action
	public fetchUnratedCourse!: (payload : any) => Promise<any>;  

    created() {
        this.fetchUnratedCourse({
                student_id: this.getLoggedUser?.id,
            })
            .then(() => {})
            .catch((err) => {
                this.notificationMessage(err, "");
            });
    }
	
    @StudentStore.Getter
    public getUnratedCourse!: {} | null;

    @AuthStore.Getter
    public getLoggedUser!: idObject | null;
}
</script>

<style scoped></style>
