<template>
  <div class="teacher-courses-list flex h-full w-full flex-col bg-blue-50 p-8">
    <div class="flex flex-grow relative">
      <Scroll class="scroll">
        <Table
          :tableHead="['Kurs', 'Student', 'Prihvatite studenta na kurs']"
          :tableData="getTeacherRequestCourses ? getTeacherRequestCourses : []"
          :tableDataFields="[
            {
              value: 'course_id',
              class: '',
            },
            {
              value: 'student_id',
              class: '',
            },
            {
              value: '',
              class: ' w-8/12 flex justify-center',
              iconClass:
                'fas fa-check text-green-600 cursor-pointer transition duration-500 ease-in-out hover:text-green-800 transform hover:scale-125',
            },
          ]"
          :deleteItem="false"
          :editItem="false"
          @col-2="setCourseAcceptedMethod"
        >
        </Table>
      </Scroll>
    </div>
  </div>
</template>

<script lang="ts">
import NotificationMessageMixin from '@/common/mixins/NotificationMessageMixin';
import { idObject } from '@/common/typeInterfaces/idObjects';

import { namespace } from "vuex-class";

import {
    Component,
} from 'vue-property-decorator';

const TeacherStore = namespace("teacherStore");
const AuthStore = namespace("authStore");

@Component
export default class teacherRequestCoursesList extends NotificationMessageMixin {

	@TeacherStore.Action
	public fetchTeacherRequestCourses! : () => Promise<any> 

	@TeacherStore.Action
	public setCourseAccepted! : (payload : any) => Promise<any> 

	created() {
		this.fetchTeacherRequestCourses()
			.then(() => {})
			.catch((err) => {
				this.notificationMessage(err, '')
		});
	}
	
	setCourseAcceptedMethod(data: any) {
		let payload = {
			course_id: data.course_id,
			accepted: true,
		}
		this.setCourseAccepted(payload)
			.then((res) => {
				this.notificationMessage(res, 'COURSE_STUDENT_ACCEPTED')
			})
			.catch((err) => {
				this.notificationMessage(err, '')
			});
	}

	@TeacherStore.Getter
	public getTeacherRequestCourses!: [] | null ;

	@TeacherStore.Getter
	public getTeacherCourses!: [] | null ;

	@AuthStore.Getter
	public getLoggedUser!: idObject | null ;

}
</script>

<style>
.style-chooser .vs__search::placeholder,
.style-chooser .vs__dropdown-toggle,
.style-chooser .vs__dropdown-menu {
  max-height: 240px;
}
</style>
