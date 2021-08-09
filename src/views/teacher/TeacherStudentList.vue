<template>
<div class="teacher-student-list flex h-full w-full flex-col bg-blue-50 p-8">
    <!-- <div class="flex justify-end mr-5 mb-3 items-center">
        <div class="flex items-center bg-blue-300 rounded-md pl-4 border border-blue-800 cursor-pointer " @click="newCourseModal = true">Dodajte novi kurs <i class="fa fa-plus-square text-blue-600 text-3xl mx-4" aria-hidden="true"></i></div>
    </div> -->
	<div class="flex w-full px-8 mb-8 justify-between">
		<div class="flex flex-col">
			<span class="mb-2">Izaberite kurs</span>
			<v-select class="style-chooser bg-white w-48 v-select-custom" :autoscroll="true" :clearable="false"  v-model="selectedCourse" label="name" @input="filterList()"  :options="getTeacherCourses ? getTeacherCourses : []" />
		</div>
		<div class="flex flex-col">
			<span class="mb-2">Lista studenata koji  </span>
			<v-select class="style-chooser bg-white w-48 v-select-custom" :autoscroll="true" :clearable="false" v-model="completed" label="title" @input="filterList()"  :options="completedOptions" />
		</div>
		<div class="flex flex-col">
			<span class="mb-2">Izaberite datum upisa</span>
			<date-picker :confirm="true" value-type='YYYY-MM-DD' @confirm="filterList()" @clear="filterList()"  format="DD.MM.YYYY" type="date" v-model="startDate" />	
		</div>
		
	</div>
    <div v-if="getTeacherStudents && completed" class="flex flex-grow relative">
        <Scroll class="scroll">
            <Table :tableHead="['Ime i prezime studenta' , 'Datum upisa na kurs' , 'Označite da je student je prošao kurs' ]"   :tableData="getTeacherStudents" 
			:tableDataFields='[
			{
				value:"user",
				class: "",
			},
			{
				value:"course_start_date",
				parser: (data) => {
					return formatDate(data);
				},
				class: "",
			},
			{
				value:"",
				class: " w-8/12 flex justify-center",
				iconClass: "fas fa-check text-green-600 cursor-pointer transition duration-500 ease-in-out hover:text-green-800 transform hover:scale-125"
			},
			]' 
			:deleteItem = false
			:editItem = false
			@col-2="setCourseCompleted"
			/>
        </Scroll>
    </div>

	<div v-if="getTeacherStudents && !completed" class="flex flex-grow relative">
        <Scroll class="scroll">
            <Table :tableHead="['Ime i prezime studenta' , 'Datum upisa na kurs' ]"   :tableData="getTeacherStudents" 
			:tableDataFields='[
			{
				value:"user",
				class: "",
			},
			{
				value:"course_start_date",
				parser: (data) => {
					return formatDate(data);
				},
				class: "",
			},
			]' 
			:deleteItem = false
			:editItem = false
			/>
        </Scroll>
    </div>
</div>
</template>
<script lang="ts">
import moment from 'moment';
import NotificationMessageMixin from '@/common/mixins/NotificationMessageMixin';
import { namespace } from "vuex-class";
import { idObject } from '@/common/typeInterfaces/idObjects';
import Component from 'vue-class-component';

const TeacherStore = namespace("teacherStore");
const AuthStore = namespace("authStore");

@Component
export default class TeacherStudentList extends NotificationMessageMixin {
	
	public  completed : {
			title : string,
			value : boolean 
		} = {
			title : 'pohadjaju kurs.',
			value : false } ;
	public	selectedCourse : any = null ;
	public	startDate : string = '';
	public	completedOptions : { title : string , value : boolean }[] = [
			{
				title : 'pohadjaju kurs.',
				value : false 
			},
			{
				title : 'su položili kurs.',
				value : true 
			},
		]

	@TeacherStore.Action
	public fetchTeacherRequestCourses! : () => Promise<any> 

	@TeacherStore.Action
	public fetchTeacherCourses! : (payload : any) => Promise<any>

	@TeacherStore.Action
	public fetchTeacherStudents! : (payload : any) => Promise<any>

	@TeacherStore.Action
	public setCourseCompleted! : (payload : any) => Promise<any>

	
	

    created() {
		this.fetchTeacherCourses({
			id: this.getLoggedUser?.id
		})
		.then((res) => { 
			this.selectedCourse = res[0]

			this.fetchTeacherStudents({
				course_id : this.selectedCourse.id,
				start_date : null,
				complete : this.completedOptions[0].value,
			})
			.then(() => {})
			.catch((err) => {
				this.notificationMessage(err , '')
			});
		})
		.catch((err) => {
			console.log(err);
			
			this.notificationMessage(err , '')
		});
        
    }
	mounted() {
		this.completed = this.completedOptions[0]
	}


	public setCourseCompletedMethod(data : any) {
		let payload = {
			student_id : data.user_id,
			course_id : data.course_id,
			teacher_id : this.getLoggedUser?.id,
		}

		this.setCourseCompleted(payload)
		.then((res) => {
			this.notificationMessage(res , 'COURSE_FINISHED');
			this.filterList();
		})
		.catch((err) => {
			this.notificationMessage(err , '')
		});
	}

	public formatDate(data : string) {
		return moment(data).format('DD.MM.YYYY')
	}

	public filterList(){
		let payload = {
				course_id : this.selectedCourse.id,
				complete : this.completed.value,
				start_date : this.startDate ? this.startDate : null 
			}
		 
		this.fetchTeacherStudents(payload)
		.then(() => {})
		.catch((err) => {
			this.notificationMessage(err , '')
		});
	}

	@TeacherStore.Getter
		public getTeacherStudents!: [] | null ;

	@TeacherStore.Getter
    	public getTeacherCourses!: [] | null;

	@AuthStore.Getter
		public getLoggedUser!: idObject | null ;
}
</script>

