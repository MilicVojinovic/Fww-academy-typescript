<template>
<div class="teacher-courses-list flex h-full w-full flex-col bg-blue-50 p-8">
    <teacher-new-course-modal v-if="newCourseModal" @closeModal="newCourseModal = false" :courseDataForEdit="courseDataForEdit"/>
    <div class="flex flex-col mr-5 mb-3">
		<div class="flex flex-col">
			<span class="text-left w-full pl-8 mb-4">Dodelite kurs ostalim profesorima</span>
			<div class="flex ml-8 items-center">
				<span class="">Izaberite kurs</span>
				<v-select class="style-chooser bg-white w-48 ml-4 v-select-custom" :autoscroll="true" v-model="courseForTeacher" label="name" :clearable="true" @input="courseForTeacher = $event"  :options="teacherCourses ? teacherCourses : []" />
				<span class="ml-8">Izaberite profesora</span>
				<v-select class="style-chooser bg-white w-48 ml-4 v-select-custom" :autoscroll="true" label="label" v-model="teacher"  :clearable="true" @input="teacher = $event"  :options="allTeachers ? allTeachers : []" />
				<i class="fa fa-share-square text-2xl text-blue-500 ml-1 cursor-pointer" aria-hidden="true" @click="assignCourse()" :class="{ 'opacity-25 pointer-events-none': !courseForTeacher || !teacher  }"></i>
			</div>
		</div>
    <div class="flex w-64 mt-12 ml-8 items-center bg-blue-300 rounded-md pl-4 border border-blue-800 cursor-pointer " @click="newCourseModal = true">Dodajte Vaš novi kurs<i class="fa fa-plus-square text-blue-600 text-3xl mx-4" aria-hidden="true"></i></div>
    </div>
    <div v-if="teacherCourses" class="flex flex-grow relative">
        <Scroll class="scroll">
            <Table :tableHead="['Naziv kursa' , 'Opis' , 'Cena (rsd)' ,'Prosečna ocena']"  :tableData="teacherCourses"
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
			
			@delete="deleteCourse"
			@edit="editCourse"
			@clickNative="seeCourse"
			>
			</Table>
        </Scroll>
    </div>

</div>
</template>

<script lang="ts">
import TeacherNewCourseModal from "./components/TeacherNewCourseModal";
import NotificationMessageMixin from '@/common/mixins/NotificationMessageMixin'
export default {
    data() {
        return {
            newCourseModal: false,
			courseDataForEdit: null,
			teacher: null,
			courseForTeacher: null,
        }
    },
	mixins: [NotificationMessageMixin],
    components: {
        TeacherNewCourseModal
    },
    created() {
        this.$store.dispatch("teacherStore/fetchTeacherCourses", {
                id: this.loggedUser.id
            })
            .then(() => {})
            .catch((err) => {
				this.notificationMessage(err , '')
            });
		this.$store.dispatch("teacherStore/fetchAllTeachers")
            .then(() => {})
            .catch((err) => {
				this.notificationMessage(err , '')
            });	
    },
    methods: {
		assignCourse() {
			let payload = {
				teacher_id: this.teacher.id,
				course_id : this.courseForTeacher.id,
			}
            this.$store.dispatch("teacherStore/assignCourse", payload)
            .then((res) => {
				this.notificationMessage(res , 'COURSE_ASSIGNED')
            })
            .catch((err) => {
                this.notificationMessage(err , '')
            });
			this.teacher = null;
			this.courseForTeacher = null;
		},
		deleteCourse(item) {
			let payload = {
				course_id : item.id,
			}
            this.$store.dispatch("teacherStore/deleteCourse", {
                    id: this.loggedUser.id,
                    data : payload,
            })
            .then((res) => {
				this.notificationMessage(res , 'COURSE_DELETED')
            })
            .catch((err) => {
                this.notificationMessage(err , '')
            });
		},
		editCourse(item) {
			item.see = false
			this.courseDataForEdit = item;
			this.newCourseModal = true;
		},
		seeCourse(item) {
			item.see = true;
			this.courseDataForEdit = item;
			this.newCourseModal = true;
		}
	},
    computed: {
		allTeachers() {
			let teachers = this.$store.getters["teacherStore/getState"]("allTeachers");
			if (teachers && teachers.length > 0) {
				teachers.forEach( element => element.label = element.name + ' ' + element.surname  )
				teachers = teachers.filter(element => element.id !== this.loggedUser.id)
			}
			return teachers;
        },
        teacherCourses() {
            return this.$store.getters["teacherStore/getState"]("teacherCourses")
        },
        loggedUser() {
            return this.$store.getters["authStore/getState"]("loggedUser");
        },
    },
	watch: {
        newCourseModal(val) {
			if (!val) {
				this.courseDataForEdit = null;
			}
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
