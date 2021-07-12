<template>
<div class="teacher flex w-full h-full p-5 bg-blue-50">
    <div class="flex flex-col">
		 <i class="fas-fa-check"></i>
        <div class="mb-3">Vaši podaci</div>
        <div class="mb-3">Ime : {{getLoggedUser.name}}</div>
        <div class="mb-3">Prezime : {{getLoggedUser.surname}}</div>
        <div class="mb-3">E-mail : {{getLoggedUser.email}}</div>
    </div>
</div>
</template>

<script lang="ts">
import NotificationMessageMixin from '@/common/mixins/NotificationMessageMixin';
import { idObject } from '@/common/typeInterfaces/idObjects';
import {
    Component,
    Mixins
} from 'vue-property-decorator';

import { namespace } from "vuex-class";

const AuthStore = namespace("authStore");
const TeacherStore = namespace("teacherStore");

@Component
export default class TeacherHome extends Mixins(NotificationMessageMixin) {

	@AuthStore.Getter
    public getLoggedUser!: idObject | null ;

};
</script>
AuthStore