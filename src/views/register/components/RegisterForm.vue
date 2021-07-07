<template>
<div class="register-form text-white bg-blue-400 flex flex-col justify-center items-center rounded-xl">
    <Input placeholder="Ime" class="mt-8" @input="register.name = $event" :validate="!$v.register.name.minLength" />
    <Input placeholder="Prezime" class="mt-8" @input="register.surname = $event" :validate="!$v.register.surname.minLength" />
    <Input placeholder="E-mail" class="mt-8" @input="register.email = $event" :validate="!$v.register.email.email" />
    <Input placeholder="Password" type="password" class="mt-8 mb-6" @input="register.password = $event" :validate="!$v.register.password.minLength" />
    <div class="flex text-black mb-3">
        <input type="radio" id="one" value="teacher" class="mr-2 cursor-pointer" v-model="register.role">
        <label for="one" class="mr-8 cursor-pointer">Profesor</label>
        <br>
        <input type="radio" id="two" value="student" class="mr-2 cursor-pointer" v-model="register.role">
        <label for="two" class="cursor-pointer">Student</label>
    </div>
    <div class="w-full flex flex-col items-center">
        <Button text="Registruj se" :validate="$v.register.$invalid" @click="$emit('register', register)" class="bg-blue-800 w-6/12 text-lg h-8 p-4 mb-5" />
        <Button text="Prijavi se" @click="$router.push('/')" class="bg-indigo-900 w-4/12 text-sm  h-6 p-1 mb-3" />
    </div>
</div>
</template>

<script lang="ts">
import {
    required,
    minLength,
    email
} from "vuelidate/lib/validators";
export default {
    name: 'loginform',
    data() {
        return {
            register: {
                name: "",
                surname: "",
                email: "",
                password: "",
				role: "",
            },
        }
    },
    methods: {

    },
    validations: {
        register: {
            name: {
                required,
                minLength: minLength(4),
            },
            surname: {
                required,
                minLength: minLength(4),
            },
            email: {
                required,
                email
            },
            password: {
                required,
                minLength: minLength(4),
            },
			role: {
				required,
			}
        },
    },
}
</script>

<style scoped>
</style>
