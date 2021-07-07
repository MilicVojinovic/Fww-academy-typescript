<template>
<input :type="type" class="w-9/12 h-8 pl-2 rounded-md text-black " :class="{ 'border border-red-500' : validate }" v-model="input" :placeholder="placeholder" :disabled="disabled" @input="$emit('input', input)" />
</template>

<script lang="ts">
import {
    Component,
    Vue
} from 'vue-property-decorator'
@Component({
    props: {
        placeholder: {
            required: false,
            type: String
        },
        type: {
            required: false,
            type: String
        },
        validate: {
            required: false,
            type: Boolean,
            default: false
        },
        disabled: {
            required: false,
            type: Boolean,
            default: false
        },
    }
})

export default class Input extends Vue {
    public input: any = '';

    mounted() {}
};
</script>

<style scoped>
input:disabled {
    background: #d8d4d4;
}
</style>
