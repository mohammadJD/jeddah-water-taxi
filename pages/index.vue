<template>
   <div>
      <div>
         hi
         <button @click="switchLanguage('ar')">Arabic</button>
         <button @click="switchLanguage('en')">English</button>
      </div>
   </div>
</template>

<script setup>
   import { useRouter, useRoute } from 'vue-router';
   import { useI18n } from 'vue-i18n';

   const router = useRouter();
   const route = useRoute();
   const { locale } = useI18n();

   // function switchLanguage(lang) {
   //    locale.value = lang
   // }

   function switchLanguage(lang) {
      if (locale.value !== lang) {
         locale.value = lang;
         router.push({ path: route.fullPath, query: { ...route.query }, params: {} })
      }
   }
</script>