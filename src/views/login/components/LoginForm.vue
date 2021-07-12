<template>
<div class="login-form text-white bg-blue-400 flex flex-col justify-center items-center rounded-xl">
    <Input placeholder="E-mail" class="mt-8" @input="login.email = $event" :validate="!$v.login.email.email" />
    <Input type="password" placeholder="Password" class="mt-8 mb-6" @input="login.password = $event" :validate="!$v.login.password.minLength" />
    <div class="w-full flex flex-col items-center">
        <Button text="Prijavi se" @click="$emit('signIn', login)" :validate="$v.login.$invalid" class="bg-blue-800 w-6/12 text-lg h-8 p-4 mb-5" />
        <Button text="Registruj se" @click="$router.push('/register')" class="bg-indigo-900 w-4/12 text-sm  h-6 py-1 px-2 mb-3" />
    </div>
</div>
</template>

<script lang="ts">
import {
    required,
    minLength,
    email
} from "vuelidate/lib/validators";
import {
    Component,
    Vue
} from 'vue-property-decorator'
@Component({
    validations: {
        login: {
            email: {
                required,
                email
            },
            password: {
                required,
                minLength: minLength(4),
            },
        },
    },
})
export default class LoginForm extends Vue {
    public login: {	email : string,	password : string } = { email: "", password: "" };
}
</script>

<style scoped>
</style>
