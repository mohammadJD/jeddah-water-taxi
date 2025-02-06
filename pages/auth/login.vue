<template>
   <div class="h-[100vh] bg-[url(@/assets/img/welcome/bg.webp)] bg-cover bg-no-repeat p-4
      flex flex-col justify-between">
      <div>
         <img src="@/assets/img/welcome/jaddeh.png" class="max-w-[200px] m-auto"/>
      </div>

      <div class="">
         <img src="@/assets/img/welcome/maritime.png" class="max-w-[45px] m-auto"/>
         <Form @submit="submit()" class="mt-8">
            <FormInput :placeholder="$t('email')" v-model="form.email" :rules="['required', 'isEmail']" />
            <FormInput type="password" :placeholder="$t('Password')" v-model="form.password" :rules="['required']" />

            <FormButton
               :label="$t('Book Your Trip Now')"
               type="submit"
               :loading="loading"
               class="w-full"
               endIcon="arrow-narrow-right"
            />

         </Form>

         <p class="mt-2 text-white opacity-[54%] underline">
            {{$t('Forgot your password?')}}
         </p>
         <p class="mt-6">
            <span class="text-white text-lg">{{$t('New User?')}}</span>
            <NuxtLink to="/auth/signup">
               <span class="text-green-500 text-[21px] font-bold ms-[4px] underline">{{$t('Sign Up')}}</span>
            </NuxtLink>
         </p>

         <p class="text-white text-[12px] mt-5 text-center">{{$t('copyright')}}</p>
      </div>
   </div>
</template>

<script setup>
   import { ref } from 'vue';

   const form = ref({
      email: '',
      password: ''
   });

   const loading = ref(false);

   const submit = async () => {
      console.log("submitted",form.value);
      // const success = await templateStore.createTemplate(props.id, props.type);
      // if (success) redirectToList();
   };
</script>