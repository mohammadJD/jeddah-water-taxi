<template>
   <div v-if="visible" class="splash-screen">
      <template v-if="!secScreenVisible">
         <div class="mt-[10vh]">
            <Spinner size="80px" class=" m-auto">
               <img src="@/assets/img/splash-loader.webp" class="absolute top-[0] left-[50%] w-[60px]"
                    style="transform: translate(-39%, 17px)"/>
            </Spinner>
         </div>
         <img src="@/assets/img/splash-bg.webp"/>
      </template>

      <template v-else>
         <div class="flex flex-col items-center justify-between w-full h-full pt-5 px-4">
            <img src="@/assets/img/jeddah-transport.webp"/>
            <img src="@/assets/img/mari-time.webp"/>
            <div class="bg-gray-500 w-full h-[1px]"/>
            <div>
               <p class="text-black text-xs mb-1">{{$t('Jeddah Transport is a trademark of')}}</p>
               <img src="@/assets/img/metro-jeddah-company.webp"/>
            </div>

            <div class="flex flex-col items-center">
               <p class="text-black text-xs mb-1">{{$t('Operated by')}}:</p>
               <img src="@/assets/img/macna.webp"/>
            </div>

            <!---For space-->
         </div>
      </template>
   </div>
</template>

<script setup>
   import {ref, onMounted, nextTick} from 'vue'

   const visible = ref(true);
   const secScreenVisible = ref(false);

   onMounted(async () => {
      await nextTick();
      setTimeout(() => {
         secScreenVisible.value = true;
         setTimeout(() => {
            // secScreenVisible.value = false;
            // visible.value = false;
         }, 1000000);
      }, 1000); // Splash screen duration (2 seconds)
   })
</script>

<style scoped>
   .splash-screen {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100vh;
      color: white;
      /*display: flex;*/
      /*align-items: center;*/
      /*justify-content: center;*/
      z-index: 9999;
      background-color: #fafafa;
   }

   .content {
      text-align: center;
   }
</style>
