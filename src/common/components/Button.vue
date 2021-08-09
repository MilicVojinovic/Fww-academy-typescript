<template>
  <div
    @click="$emit('click')"
    class="
      flex
      button
      text-white
      rounded-xl
      cursor-pointer
      font-bold
      justify-center
      items-center
    "
    :class="{ 'opacity-25 pointer-events-none': validate }"
    :disabled="validate"
  >
    <span>{{ text }}</span>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
@Component({})
export default class Button extends Vue {

  @Prop({ required: true }) readonly text!: string;
  @Prop({ required: false , default: false, }) readonly validate!: boolean;

  mounted() {}
}
</script>
