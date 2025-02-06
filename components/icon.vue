<template>
   <MyComponent />
</template>

<script setup>
   import {defineAsyncComponent} from 'vue';

   const props = defineProps({
      name: {
         type: String,
         default: '',
      },
   });

   const MyComponent = defineAsyncComponent(() =>
      import(`@/assets/icons/${props.name}.svg`)
   );
</script>

<style lang="scss" scoped></style>
