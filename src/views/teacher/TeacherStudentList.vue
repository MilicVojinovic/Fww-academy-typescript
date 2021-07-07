<template>
<div class="teacher-student-list flex h-full w-full flex-col bg-blue-50 p-8">
    <!-- <div class="flex justify-end mr-5 mb-3 items-center">
        <div class="flex items-center bg-blue-300 rounded-md pl-4 border border-blue-800 cursor-pointer " @click="newCourseModal = true">Dodajte novi kurs <i class="fa fa-plus-square text-blue-600 text-3xl mx-4" aria-hidden="true"></i></div>
    </div> -->
	<div class="flex w-full px-8 mb-8 justify-between">
		<div class="flex flex-col">
			<span class="mb-2">Izaberite kurs</span>
			<v-select class="style-chooser bg-white w-48 v-select-custom" :autoscroll="true" :clearable="false"  v-model="selectedCourse" label="name" @input="filterList()"  :options="teacherCourses ? teacherCourses : []" />
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
    <div v-if="teacherStudents && completed" class="flex flex-grow relative">
        <Scroll class="scroll">
            <Table :tableHead="['Ime i prezime studenta' , 'Datum upisa na kurs' , 'Označite da je student je prošao kurs' ]"   :tableData="teacherStudents" 
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

	<div v-if="teacherStudents && !completed" class="flex flex-grow relative">
        <Scroll class="scroll">
            <Table :tableHead="['Ime i prezime studenta' , 'Datum upisa na kurs' ]"   :tableData="teacherStudents" 
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
import NotificationMessageMixin from '@/common/mixins/NotificationMessageMixin'
export default {
    data() {
        return {
			completed : false,
			selectedCourse : null,
			startDate : null,
			completedOptions : [
				{
					title : 'pohadjaju kurs.',
					value : false 
				},
				{
					title : 'su položili kurs.',
					value : true 
				},
			]
        }
    },
    components: {
    },
	mixins: [NotificationMessageMixin],
    created() {
		this.$store.dispatch("teacherStore/fetchTeacherCourses", {
			id: this.loggedUser.id
		})
		.then((res) => { 
			this.selectedCourse = res.data[0]

			this.$store.dispatch("teacherStore/fetchTeacherStudents", {
				course_id : res.data[0].id,
				// start_date : '',
				complete : this.completedOptions[0].value,
			})
			.then(() => {})
			.catch((err) => {
				this.notificationMessage(err , '')
			});
		})
		.catch((err) => {
			this.notificationMessage(err , '')
		});
        
    },
	mounted() {
		this.completed = this.completedOptions[0]
	},
    methods: {
		setCourseCompleted(data) {
			let payload = {
				student_id : data.user_id,
				course_id : data.course_id,
				teacher_id : this.loggedUser.id,
			}

			this.$store.dispatch("teacherStore/setCourseCompleted", payload)
			.then((res) => {
				console.log(res);
				this.notificationMessage(res , 'COURSE_FINISHED');
				this.filterList();
			})
			.catch((err) => {
				this.notificationMessage(err , '')
			});
		},
		formatDate(data) {
			return moment(data).format('DD.MM.YYYY')
		},
		filterList(){
			let payload = {
				course_id : this.selectedCourse.id,
				complete : this.completed.value,
			}
			this.startDate ? payload.start_date = this.startDate : '';

			this.$store.dispatch("teacherStore/fetchTeacherStudents", payload)
			.then(() => {})
			.catch((err) => {
				this.notificationMessage(err , '')
			});
		}
	},
    computed: {
		teacherCourses() {
            return this.$store.getters["teacherStore/getState"]("teacherCourses")
        },
        teacherStudents() {
            return this.$store.getters["teacherStore/getState"]("teacherStudents")
        },
        loggedUser() {
            return this.$store.getters["authStore/getState"]("loggedUser");
        },
    },
	watch: {
    }
}
</script>

