<template>
<div @click="$emit('click')" class="flex button text-white rounded-xl cursor-pointer font-bold justify-center items-center" :class="{ 'opacity-25 pointer-events-none': validate  }" :disabled="validate">
    <span>{{ text }}</span>
</div>
</template>

<script lang="ts">
import {
    Component,
    Vue
} from 'vue-property-decorator'
@Component({
    props: {
        text: {
            required: true,
            type: String
        },
        validate: {
            required: false,
            type: Boolean,
            default: false
        }
    }
})
export default class Button extends Vue {

    mounted() {}
};
</script>
