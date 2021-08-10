<template>
<div class="flex flex-grow justify-center relative">
	<div v-if="getStudentsCurrentCourses" class="flex flex-grow relative">
        <Scroll class="scroll">
            <Table :tableHead="['Naziv kursa' , 'Prosečna ocena kursa']"  :tableData="getStudentsCurrentCourses"
			:tableDataFields='[
			{
				value:"course",
				parser: (data) => {
					return data.name;
				},
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

import { idObject } from '@/common/typeInterfaces/idObjects';

import { namespace } from "vuex-class";

import { Component } from 'vue-property-decorator';

const StudentStore = namespace("studentStore");
const AuthStore = namespace("authStore");

@Component
export default class StudentCurrentCourses extends NotificationMessageMixin {

	@StudentStore.Action
	public fetchStudentsCurrentCourses!: (payload : any) => Promise<any>;

	@StudentStore.Mutation
	public setApplyToCourse! : (payload : boolean) => void


	created() {
        this.fetchStudentsCurrentCourses({
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
	public getStudentsCurrentCourses! : [] | null;

}
</script>
