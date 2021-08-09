<template>
<div class="teacher-new-course-modal flex w-full h-full justify-center items-center absolute left-0 top-0 z-10">
    <div class="flex flex-col md:w-4/12 bg-gray-500 rounded-xl items-center p-8">
        <div class="flex w-full text-lg mb-2 text-white  justify-end">
            <i class="fa fa-times bg-blue-900 py-1 px-2 rounded-md cursor-pointer" @click="$emit('closeModal')" aria-hidden="true"></i>
        </div>
        <div class="text-center text-xl mb-3 text-white">{{!courseDataForEdit ? 'Kreirajte novi kurs' : (!!courseDataForEdit && !courseDataForEdit.see) ? 'Izmenite kurs' : 'Pregled kursa'}} </div>
        <Input placeholder="Ime kursa" :disabled="!!courseDataForEdit && courseDataForEdit.see" class="my-4" v-model="courseData.name" @input="courseData.name = $event" :validate="!$v.courseData.name.minLength" />
        <Input type="number" :disabled="!!courseDataForEdit && courseDataForEdit.see" placeholder="Cena (rsd)" v-model="courseData.price" class="my-4" @input="courseData.price = $event" :validate="!$v.courseData.price.minLength" />
        <textarea :disabled="!!courseDataForEdit && courseDataForEdit.see" class="text-black rounded-md p-2 w-9/12 mt-4" placeholder="Opis kursa" v-model="courseData.description" :class="{ 'border border-red-500' : !$v.courseData.description.minLength }" name="comment" id="" rows="5"></textarea>
        <Button v-if="(courseDataForEdit && !courseDataForEdit.see) || !courseDataForEdit "  class="bg-blue-900 text-lg px-5 py-3 mt-6" :validate="$v.courseData.$invalid" :text="!courseDataForEdit ? 'Sačuvaj' : 'Sačuvaj izmenu' " 
		@click="!!courseDataForEdit ? editCourseMethod() : createCourseMethod()" />
    </div>
</div>
</template>

<script lang="ts">
import NotificationMessageMixin from "@/common/mixins/NotificationMessageMixin";
import  { Prop , Component } from "vue-property-decorator";
import { idObject } from '@/common/typeInterfaces/idObjects';

import {
    required,
    minLength,
} from "vuelidate/lib/validators";

import { namespace } from "vuex-class";

const TeacherStore = namespace("teacherStore");
const AuthStore = namespace("authStore");

@Component({
	validations: {
        courseData: {
            name: {
                required,
                minLength: minLength(2),
            },
            price: {
                required,
                minLength: minLength(2),
            },
            description: {
                required,
                minLength: minLength(4),
            },
        },
    },
	})
export default class TeacherNewCourseModal extends NotificationMessageMixin  {
	@Prop({required: false}) readonly courseDataForEdit! : {}
	
	public courseData : any = {} ; 
	
    created() {
        // if (this.courseDataForEdit) {
        //     for (const key in this.courseData) {
		// 		this.courseData[key] = this.courseDataForEdit[key];
        //     }
        // }

		if (this.courseDataForEdit) {
			this.courseData = JSON.parse(JSON.stringify(this.courseDataForEdit)) ; 
		}

    }

	@TeacherStore.Action
	public createCourse! : (payload : any) => Promise<any>;

	@TeacherStore.Action
	public editCourse! : (payload : any) => Promise<any>;

	createCourseMethod() {
		this.createCourse({
				id: this.getLoggedUser?.id,
				data: this.courseData
			})
			.then((res) => {
				this.$emit('closeModal')
				this.notificationMessage(res , 'COURSE_CREATED')
			})
			.catch((err) => {
				this.$emit('closeModal')
                    this.notificationMessage(err , '')
			});
	}

	editCourseMethod() {
		let payload = {
			course_id : this.courseData.id,
			data : this.courseData
		}

		console.log('ffff'  , this.getLoggedUser?.id);
		

		this.editCourse({
				id: this.getLoggedUser?.id,
				data: payload
			})
			.then((res) => {
				this.$emit('closeModal')
				this.notificationMessage(res , 'COURSE_UPDATED')
			})
			.catch((err) => {
				this.$emit('closeModal')
				this.notificationMessage(err , '')
			});
	}
		
	@AuthStore.Getter
    	public getLoggedUser!: idObject | null;	
	
	@TeacherStore.Getter
    	public getTeacherCourses!: [] | null;


}
</script>

<style scoped>
.teacher-new-course-modal {
    background-color: rgba(157, 158, 167, 0.705);
    opacity: 0;
    animation: modal 1s linear;
    animation-fill-mode: forwards;
}

@keyframes modal {
    0% {
        opacity: 0;
    }

    50% {
        opacity: 0.5;
    }

    100% {
        opacity: 1;
    }
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

/* Firefox */
input[type=number] {
    -moz-appearance: textfield;
}

textarea:disabled {
  background: #d8d4d4;
}
</style>
