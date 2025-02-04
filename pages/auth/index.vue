<template>
   <div>
      <div class="h-[60vh] bg-[url(@/assets/img/welcome/bg.webp)]
      bg-cover bg-no-repeat p-4 flex items-center justify-between flex-col">
         <img src="@/assets/img/welcome/jaddeh.png" class="max-w-[200px] mt-8"/>

         <img src="@/assets/img/welcome/maritime.png" class="max-w-[45px]"/>
      </div>

      <div class="border-[2px] border-gray-200 border-t-0 p-4">
         <p class="text-blue-500 text-[28px] font-bold text-center">{{$t('Your Specialist Maritime Transportation Company')}}</p>
         <p class="mt-6 text-center">
            <span class="black">{{$t('New User?')}}</span>
            <NuxtLink to="/auth/signup">
               <span class="text-blue-400 text-[21px] font-bold ms-[4px] underline">{{$t('Sign Up')}}</span>
            </NuxtLink>
         </p>

         <p class="mt-4 text-center">
            <span class="black">{{$t('Already Have An Account?')}}</span>
            <NuxtLink to="/auth/login">
               <span class="text-blue-400 text-[21px] font-bold ms-[4px] underline">{{$t('Log In')}}</span>
            </NuxtLink>
         </p>

         <p class="text-blue-400 text-[12px] mt-5 text-center">{{$t('copyright')}}</p>
      </div>
   </div>
</template>

<script setup></script>