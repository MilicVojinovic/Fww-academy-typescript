<template>
  <input
    :type="type"
    class="w-9/12 h-8 pl-2 rounded-md text-black"
    :class="{ 'border border-red-500': validate }"
    v-model="input"
    :placeholder="placeholder"
    :disabled="disabled"
    @input="$emit('input', input)"
  />
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({})
export default class Input extends Vue {
  @Prop({ required: false }) readonly placeholder!: string;
  @Prop({ required: false }) readonly type!: string;
  @Prop({ required: false }) readonly validate!: boolean;
  @Prop({ required: false }) readonly disabled!: boolean;

  public input: any = "";

  mounted() {}
}
</script>

<style scoped>
input:disabled {
  background: #d8d4d4;
}
</style>
