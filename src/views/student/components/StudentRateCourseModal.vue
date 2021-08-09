<template>
<div class="student-rate-course-modal flex w-full h-full justify-center items-center absolute left-0 top-0 z-10">
    <div class="text-white student-rate rounded-xl flex flex-col items-center justify-around w-4/12">
        <div class="py-4 text-xl">Ocenite kurs : {{ unratedCourse.course.name }} </div>
        <div class="flex flex-col">
            <span class="mb-2">Komentar</span>
            <textarea class="text-black rounded-md p-3" v-model="form.comment" name="comment" id="" cols="35" rows="5"></textarea>
        </div>
        <div class="my-6 ">
            <div v-if="!form.mark" class="h-8 flex justify-center">
                <i v-for="index in 5" :key="index" class="far fa-star mr-3 text-2xl cursor-pointer" @click="form.mark=index"></i>
            </div>
            <div v-if="form.mark" class="h-8 flex justify-center">
                <i v-for="index in 5" :key="index" class="fas fa-star mr-3 text-2xl cursor-pointer" :class="form.mark+1 > index ? colorForStars[form.mark-1]   : ''" @click="form.mark=index"></i>
            </div>
        </div>
        <Button text="Sačuvaj" @click="sendCourseRate" :validate="!form.mark || !form.comment" class="bg-blue-800 w-6/12 text-lg h-8 p-4 mb-5" />
    </div>
</div>
</template>

<script lang="ts">
import Button from '../../../common/components/Button.vue';
import NotificationMessageMixin from '@/common/mixins/NotificationMessageMixin';
import { idObject } from '@/common/typeInterfaces/idObjects';

import { namespace } from "vuex-class";

const StudentStore = namespace("studentStore");
const AuthStore = namespace("authStore");

import {
    Component,
} from 'vue-property-decorator';

@Component({
	components: {
    Button
  }

})
export default class StudentRateCourseModal extends NotificationMessageMixin {

	public form : { comment : string , mark : number | null } = {
                comment: '',
                mark: null,
            }

	public colorForStars : string[] = ['text-red-500', 'text-yellow-500', 'text-yellow-200', 'text-green-500', 'text-green-600']

	@StudentStore.Action
	public sendCourseRate! : (payload : any) => Promise<any>  

	@StudentStore.Action
	public setUnratedCourse! : (payload : any) => void


    public sendCourseRateMethod() {
            this.sendCourseRate({
                student_id: this.getLoggedUser?.id,
                data: this.form,
            }).then((res) => {
                this.notificationMessage(res, 'COURSE_RATED');

				this.setUnratedCourse(null);
			});
		}

	@StudentStore.Getter
    public getUnratedCourse!: {} | null;
	
	@AuthStore.Getter
    public getLoggedUser!: idObject | null;



}
</script>

<style scoped>
.student-rate {
    background-color: rgb(97, 141, 223);
    /* box-shadow: 20px 20px rgb(222, 222, 228); */
}

.student-rate-course-modal {
    background-color: rgba(157, 158, 167, 0.705);
}
</style>
