<template>
<div class="flex flex-grow justify-center relative">
    <div v-if="studentsFinishedCourses" class="flex flex-grow relative">
        <Scroll class="scroll">
            <Table :tableHead="['Naziv kursa' , 'Vaš komentar kursa' , 'Vaša ocena kursa' , 'Prosečna ocena kursa']"  :tableData="studentsFinishedCourses"
			:tableDataFields='[
			{
				value:"course",
				parser: (data) => {
					return data.name;
				},
			},
			{
				value:"comment",
				class: "w-48 overflow-ellipsis overflow-hidden cursor-pointer"
			},
			{
				value:"mark",
			},
			{
				value:"course",
				parser: (data) => {
					return data.average_mark;
				},
			},
			]' 
			:deleteItem ="false"
			:editItem ="false"
			rowClass="cursor-pointer hover:bg-blue-100"
			@row="redirect"
			>
			</Table>
        </Scroll>
    </div>
</div>
</template>

<script lang="ts">
export default {
    data() {
        return {}
    },
	created() {
        this.$store.dispatch("studentStore/fetchStudentsFinishedCourses", {
                student_id: this.loggedUser.id
            })
            .then(() => {})
            .catch((err) => {
				this.notificationMessage(err , '')
            });
    },
	mounted() {},
    methods: {
		redirect(row) {
			this.$store.commit('studentStore/setState', {
					prop: 'apllyToCourse',
					value: false
			});
			this.$router.push('course/' + row.course.id )
		}
	},
    computed: {
        loggedUser() {
            return this.$store.getters["authStore/getState"]("loggedUser");
        },
		studentsFinishedCourses() {
			return this.$store.getters["studentStore/getState"]("studentsFinishedCourses");
		}
    },
}
</script>
