<template>
<div class="teacher-courses-list flex h-full w-full flex-col bg-blue-50 p-8">
	<pre>{{tableData}}</pre>
    <div class="flex flex-grow relative">
        <Scroll class="scroll">
            <Table :tableHead="['Kurs' , 'Student' , 'Prihvatite studenta na kurs']" :tableData="teacherRequestCourses" :tableDataFields='[

{

value:"course_id",
class: "",

},

{
	value:"student_id",
	class: "", 
},


{

value:"",

class: " w-8/12 flex justify-center",

iconClass: "fas fa-check text-green-600 cursor-pointer transition duration-500 ease-in-out hover:text-green-800 transform hover:scale-125"

},

]' :deleteItem="false" :editItem="false" @col-3="setCourseAccepted">
            </Table>
        </Scroll>
    </div>

</div>
</template>

<script lang="ts">
import NotificationMessageMixin from '@/common/mixins/NotificationMessageMixin'
export default {
    data() {
        return {
        }
    },
    components: {},
    mixins: [NotificationMessageMixin],
    created() {
        this.$store.dispatch("teacherStore/fetchTeacherRequestCourses")
            .then(() => {})
            .catch((err) => {
                this.notificationMessage(err, '')
            });
    },
    methods: {
        setCourseAccepted(data) {
            let payload = {
                course_id: data.course.id,
                accepted: true,

            }
            this.$store.dispatch("teacherStore/setCourseAccepted", payload)
                .then((res) => {
                    this.notificationMessage(res, 'COURSE_STUDENT_ACCEPTED')
                })
                .catch((err) => {
                    this.notificationMessage(err, '')
                });
        }
    },
    computed: {
        teacherRequestCourses() {
            return this.$store.getters["teacherStore/getState"]("teacherRequestCourses")
        },
        loggedUser() {
            return this.$store.getters["authStore/getState"]("loggedUser");
        },
        teacherCourses() {
            return this.$store.getters["teacherStore/getState"]("teacherCourses")
        },
    },
    watch: {}
}
</script>

<style>
.style-chooser .vs__search::placeholder,
.style-chooser .vs__dropdown-toggle,
.style-chooser .vs__dropdown-menu {
    max-height: 240px;
}
</style>
