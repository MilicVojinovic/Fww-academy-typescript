<template>
<div v-if="courseInfo" class="flex flex-grow flex-col p-8 relative">
    <div class=" flex w-full justify-center text-2xl">
        <div>Opis kursa</div>
    </div>
    <div class="mt-4"> <span class="underline"> Naziv kursa :</span> <span class="text-xl">{{courseInfo.name}}</span> </div>
    <div class="mt-4"> <span class="underline"> Cena kursa :</span> {{courseInfo.price}} din. </div>
    <div class="mt-4 leading-6"><span class="underline"> Opis kursa :</span> {{courseInfo.description}} </div>
    <div v-if="courseInfo.average_mark != 0" class="flex items-center mt-2">
        <div class="mr-8">Prosečna ocena kursa : {{markIncrement.toFixed(2)}} </div>
        <div class="bg-gray-300 outer h-8 relative rounded-xl p-1">
            <div class="gradient h-6 rounded-xl absolute top-1 left-1" :style="styleRate"></div>
        </div>
    </div>
    <div v-else class="mt-16"> <span class="underline">Ovaj kurs još nije ocenjen.</span></div>
    <div v-if="apllyToCourse" class="flex shadow-2xl items-center flex-col mx-auto w-96 mt-24 border p-4 bg-blue-100 rounded-md">
        <span class="mr-6">Prijavite se na ovaj kurs</span>
        <textarea class="text-black rounded-md p-2 w-9/12 mt-4" placeholder="Komentar" v-model="comment" name="comment" id="" rows="5"></textarea>
        <Button text="Prijavi se" @click="requestCourse()" class="bg-indigo-900 w-24 text-sm  h-8 p-1 mt-8" />
    </div>
</div>
</template>

<script lang="ts">
import NotificationMessageMixin from '@/common/mixins/NotificationMessageMixin'
import { namespace } from "vuex-class";

import { idObject } from '@/common/typeInterfaces/idObjects';

const StudentStore = namespace("studentStore");
const AuthStore = namespace("authStore");


export default class StudentCourse extends NotificationMessageMixin {

	public colorForStars: string[] =  ['text-red-500', 'text-yellow-500', 'text-yellow-200', 'text-green-500', 'text-green-600']
	public styleRate: string | null = null; 
	public comment: string = '';
	public markIncrement: number = 0;

	@StudentStore.Action
	public fetchCourseInfo!: (payload: any ) => Promise<any>

	@StudentStore.Action
	public fetchStudentsCourseInfo!: (payload: any ) => Promise<any>

	@StudentStore.Action
	public requestCourse!: (payload: any ) => Promise<any>

	




    created() {
        this.fetchCourseInfo({
                course_id: this.$route.params.id
		})
            .then(() => {
                let width = Math.floor(this.getCourseInfo ? this.getCourseInfo.average_mark : 0 / 5 * 230);
				setTimeout(() => {
					this.styleRate = `width:${width}px`;
				}, 10);
				this.animateMarkIncrement(this.getCourseInfo ? this.getCourseInfo.average_mark : 0);
            })
            .catch((err) => {
                this.notificationMessage(err, '')
            });
		this.fetchCourseInfo({
                course_id: this.$route.params.id
            })
            .then(() => {
            })
            .catch((err) => {
                this.notificationMessage(err, '')
        });
    }

	public requestCourseMethod() {
            this.requestCourse({
                    course_id: this.$route.params.id,
					comment: this.comment
                })
                .then((res) => {
					this.notificationMessage(res, 'THANKS_FOR_APPLICATION')
                })
                .catch((err) => {
                    this.notificationMessage(err, '')
                });
        }

	public animateMarkIncrement(averageMark : number) {
			let interval = setInterval(() => {
				this.markIncrement += 0.01;
				if (this.markIncrement >= averageMark) {
					this.markIncrement = averageMark;
					clearInterval(interval);
				}
			}, 1);
		}

	@StudentStore.Getter
	public getCourseInfo!: { average_mark : number } | null;

	@StudentStore.Getter
	public getUnattendedCourseInfo!: {} | null;

}
</script>

<style lang="scss" scoped>
.outer {
    width: 240px;
}

.gradient {
    background-image: linear-gradient(to right, red, yellow, green);
    width: 0px;
    transition: width 2s;
}
</style>
