<template>
<div class="flex flex-grow justify-center relative">
    <div v-if="getStudentsFinishedCourses" class="flex flex-grow relative">
        <Scroll class="scroll">
            <Table :tableHead="['Naziv kursa' , 'Vaš komentar kursa' , 'Vaša ocena kursa' , 'Prosečna ocena kursa']"  :tableData="getStudentsFinishedCourses"
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

import NotificationMessageMixin from "@/common/mixins/NotificationMessageMixin";

import { namespace } from "vuex-class";
import { idObject } from "@/common/typeInterfaces/idObjects";
import { Component } from "vue-property-decorator";

const StudentStore = namespace("studentStore");
const AuthStore = namespace("authStore");

@Component
export default class studentsFinishedCourses extends NotificationMessageMixin {

	@StudentStore.Mutation
	public setApplyToCourse! : (payload : boolean) => void 

	@StudentStore.Action
	public fetchStudentsFinishedCourses! : (payload : any) => Promise<any> 



	created() {
        this.fetchStudentsFinishedCourses({
                student_id: this.getLoggedUser?.id
            })
            .then(() => {})
            .catch((err) => {
				this.notificationMessage(err , '')
            });
    }

	redirect(row : any) {
		this.setApplyToCourse(false);

		this.$router.push('course/' + row.course.id )
	}


	@AuthStore.Getter
    public getLoggedUser!: idObject | null;

	@StudentStore.Getter
    public getStudentsFinishedCourses!: [] | null;
}
</script>
