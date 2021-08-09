<template>
<div class="teacher-courses-list flex h-full w-full flex-col bg-blue-50 p-8">
    <teacher-new-course-modal v-if="newCourseModal" @closeModal="newCourseModal = false" :courseDataForEdit="courseDataForEdit"/>
    <div class="flex flex-col mr-5 mb-3">
		<div class="flex flex-col">
			<span class="text-left w-full pl-8 mb-4">Dodelite kurs ostalim profesorima</span>
			<div class="flex ml-8 items-center">
				<span class="">Izaberite kurs</span>
				<v-select class="style-chooser bg-white w-48 ml-4 v-select-custom" :autoscroll="true" v-model="courseForTeacher" label="name" :clearable="true" @input="courseForTeacher = $event"  :options="getTeacherCourses ? getTeacherCourses : []" />
				<span class="ml-8">Izaberite profesora</span>
				<v-select class="style-chooser bg-white w-48 ml-4 v-select-custom" :autoscroll="true" label="label" v-model="teacher"  :clearable="true" @input="teacher = $event"  :options="allTeachers ? allTeachers : []" />
				<i class="fa fa-share-square text-2xl text-blue-500 ml-1 cursor-pointer" aria-hidden="true" @click="assignCourseMethod()" :class="{ 'opacity-25 pointer-events-none': !courseForTeacher || !teacher  }"></i>
			</div>
		</div>
    <div class="flex w-64 mt-12 ml-8 items-center bg-blue-300 rounded-md pl-4 border border-blue-800 cursor-pointer " @click="newCourseModal = true">Dodajte Vaš novi kurs<i class="fa fa-plus-square text-blue-600 text-3xl mx-4" aria-hidden="true"></i></div>
    </div>
    <div v-if="getTeacherCourses" class="flex flex-grow relative">
        <Scroll class="scroll">
            <Table :tableHead="['Naziv kursa' , 'Opis' , 'Cena (rsd)' ,'Prosečna ocena']"  :tableData="getTeacherCourses ? getTeacherCourses : []"
			:tableDataFields='[
			{
				value:"name",
				class: "cursor-pointer",
			},
			{
				value:"description",
				class: "w-48 overflow-ellipsis overflow-hidden cursor-pointer",
			},
			{
				value:"price",
				class: "cursor-pointer",
			},
			{
				value:"average_mark",
				class: "cursor-pointer",
			},
			]' 
			
			@delete="deleteCourseMethod"
			@edit="editCourse"
			@clickNative="seeCourse"
			>
			</Table>
        </Scroll>
    </div>

</div>
</template>

<script lang="ts">
import TeacherNewCourseModal from "./components/TeacherNewCourseModal.vue";
import NotificationMessageMixin from '@/common/mixins/NotificationMessageMixin';
import {
    Component,
	Watch
} from 'vue-property-decorator';

import { idObject } from '@/common/typeInterfaces/idObjects';

import { namespace } from "vuex-class";

const TeacherStore = namespace("teacherStore");
const AuthStore = namespace("authStore");


@Component({
	components: {
    TeacherNewCourseModal
  }
})
export default class TeacherCourseList extends NotificationMessageMixin {
    public newCourseModal: boolean = false;
	public courseDataForEdit: any = null;
	public teacher: any =  null;
	public courseForTeacher: any =  null;

	@TeacherStore.Action
	public fetchTeacherCourses! : (payload : any) => Promise<any> 

	@TeacherStore.Action
	public fetchAllTeachers! : () => Promise<any> 

	@TeacherStore.Action
	public assignCourse!: (payload : any) => Promise<any>

	@TeacherStore.Action
	public deleteCourse! : (payload : any) => Promise<any>


    created() {
		this.fetchTeacherCourses({
                id: this.getLoggedUser?.id
            })
            .then(() => {})
            .catch((err) => {
				this.notificationMessage(err , '')
            });

		this.fetchAllTeachers()
            .then(() => {})
            .catch((err) => {
				this.notificationMessage(err , '')
            });	
    }


	assignCourseMethod() {
		let payload = {
			teacher_id: this.teacher.id,
			course_id : this.courseForTeacher.id,
		}
        this.assignCourse(payload)
        .then((res) => {
			this.notificationMessage(res , 'COURSE_ASSIGNED')
        })
        .catch((err) => {
            this.notificationMessage(err , '')
        });
		this.teacher = null;
		this.courseForTeacher = null;
	}

	deleteCourseMethod(item :any) {
		let payload = {
			course_id : item.id,
		}
        this.deleteCourse({
                id: this.getLoggedUser?.id,
                data : payload,
        })
        .then((res) => {
			this.notificationMessage(res , 'COURSE_DELETED')
        })
        .catch((err) => {
            this.notificationMessage(err , '')
        });
	}

	editCourse(item : any ) {
		item.see = false
		this.courseDataForEdit = item;
		this.newCourseModal = true;
	}

	seeCourse(item :any) {
		item.see = true;
		this.courseDataForEdit = item;
		this.newCourseModal = true;
	}

	//computed

	get allTeachers(): any {
		let teachers : {}[] | null = this.getAllTeachers;

		if (teachers && teachers.length > 0) {

				teachers.forEach( (element : any) => element.label = element.name + ' ' + element.surname  )

				teachers = teachers.filter((element : any) => element.id !== this.getLoggedUser?.id)

				return teachers;

		}

		return teachers;
		
    };

	@TeacherStore.Getter
    	public getTeacherCourses!: [] | null;

	@TeacherStore.Getter
		public getAllTeachers!: [] | null;

    @AuthStore.Getter
    	public getLoggedUser!: idObject | null;


	@Watch('newCourseModal')
  	onPropertyChanged(value: any) {
    	if (!value) {
				this.courseDataForEdit = null;
		}
  	}
}
</script>

<style >
.style-chooser .vs__search::placeholder,
.style-chooser .vs__dropdown-toggle,
.style-chooser .vs__dropdown-menu {
    max-height: 240px;
  }
</style>
