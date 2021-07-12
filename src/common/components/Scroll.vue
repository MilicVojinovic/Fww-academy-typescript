<template>
<div class="scroll position-relative overflow-hidden">
    <div class="w-full h-full flex flex-col absolute top-0 left-0 scroll-y">
        <slot />
    </div>
</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component
export default class Scroll extends Vue {
}
</script>

<style scoped>
.scroll-y {
    overflow: scroll !important;
    overflow-x: hidden;
}

.overflow-hidden {
    overflow: hidden !important;
}

div::-webkit-scrollbar {
    display: none;
}

</style>
