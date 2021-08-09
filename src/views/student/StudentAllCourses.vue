<template>
<div class="flex flex-col flex-grow justify-center">
	<div class="search-row flex justify-around mx-8 mt-12 mb-10" >
		<div class="relative search-wrapper">
			<input type="text" class="search-input border border-gray-300"
				placeholder="Naziv kursa"
				v-model="form.course_name"
				v-on:keyup.enter="search()" />
			<i class="absolute mr-6 mb-1 text-xl search-icon fa fa-times text-theme-grayLight cursor-pointer" 
				@click="form.course_name = null, search()" />
			<i class="absolute search-icon fa fa-search text-theme-grayLight cursor-pointer"
				@click="search()" />
		</div>
		<div class="relative search-wrapper">
			<input type="text" class="search-input border border-gray-300"
				placeholder="Profesor"
				v-model="form.teacher_name"
				v-on:keyup.enter="search()" />
			<i class="absolute mr-6 mb-1 text-xl search-icon fa fa-times text-theme-grayLight cursor-pointer" 
				@click="form.teacher_name = null, search()" />
			<i class="absolute search-icon fa fa-search text-theme-grayLight cursor-pointer"
				@click="search()" />
		</div>
	</div>
	
	<div v-if="studentsUnattendedCourses" class="flex flex-grow relative">
		<Scroll class="scroll">
			<Table :tableHead="['Naziv kursa' , 'Cena (.rsd)' , 'Kurs kreirao profesor' ]"  :tableData="studentsUnattendedCourses"
			:tableDataFields='[
			{
				value:"course_name",
				class: "",
			},
			{
				value:"price",
				class: "",
			},
			{
				value:"teacher_name",
				class: "",
			},
			]' 

			:deleteItem="false"
			:editItem="false"
			rowClass="cursor-pointer hover:bg-blue-100"
			@row="redirect"
			>
			</Table>
		</Scroll>
	</div>
</div>
</template>

<script lang="ts">
import { namespace } from "vuex-class";


const StudentStore = namespace("studentStore");
import NotificationMessageMixin from '@/common/mixins/NotificationMessageMixin';

export default class StudentAllCourses extends NotificationMessageMixin {
	public form : {
				course_name: string | null,
				teacher_name: string | null,
			} = {
				course_name: null,
				teacher_name: null,
			}

	@StudentStore.Action
	public fetchStudentsUnattendedCourses! : (payload : any) => Promise<any>  

	@StudentStore.Mutation
	public setApplyToCourse! : (payload : boolean) => void

	created() {
        this.fetchStudentsUnattendedCourses({}).then(() => {})
            .catch((err) => {
				this.notificationMessage(err , '')
            });
    }

	public redirect(row : any) {
		this.setApplyToCourse(true);

		this.$router.push('course/' + row.course_id )
	}

	public search() {
		this.fetchStudentsUnattendedCourses({})
		.then(() => {})
		.catch((err) => {
			this.notificationMessage(err , '')
		});
	}

	@StudentStore.Getter
	public getUnattendedCourses!: [] | null;

}
</script>
<style lang="scss" scoped>
.search-wrapper {
    width: 35%;

    .search-input {
        height: 2rem;
        padding-left: 5px;
        border-radius: 5px;
        width: 100%;
    }

    .search-icon {
        top: 50%;
        right: 5%;
        transform: translateY(-50%);
    }
}
</style>
