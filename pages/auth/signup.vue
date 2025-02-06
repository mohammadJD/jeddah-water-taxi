<template>
   <div class="bg-[url(@/assets/img/welcome/bg.webp)] bg-cover bg-no-repeat p-4
      flex flex-col justify-between">
      <div class="flex justify-between gap-2">
         <img src="@/assets/img/welcome/jaddeh.png" class="max-w-[200px] object-contain"/>
         <img src="@/assets/img/welcome/maritime.png" class="max-w-[45px] object-contain"/>
      </div>

      <div class="">
         <Form @submit="submit()" class="mt-8">
            <FormInput :placeholder="$t('First name')" v-model="form.first_name" :rules="fieldsValidations.first_name" />
            <FormInput :placeholder="$t('Last name')" v-model="form.last_name" :rules="fieldsValidations.last_name" />

            <FormInput :placeholder="$t('Email address')" v-model="form.email" :rules="fieldsValidations.email" />

            <FormInput type="password" :placeholder="$t('Password')" v-model="form.password"
                       :rules="fieldsValidations.password" />
            <FormInput type="password" :placeholder="$t('Password Confirmation')"
                       v-model="form.password_confirmation" :rules="fieldsValidations.password_confirmation" />

            <FormInput :placeholder="$t('Phone number')" v-model="form.phone_number"
                       :rules="fieldsValidations.phone_number" />

            <div>
<!--               <FormToggle v-model="form.agree" label="is validation on" />-->
               <p class="text-sm mb-4 text-white opacity-[54%] underline">
                  {{$t('Agree to Terms and Conditions')}}
               </p>
            </div>

            <FormButton
               :label="$t('Book Your Trip Now')"
               type="submit"
               :loading="loading"
               class="w-full"
               endIcon="arrow-narrow-right"
            />

         </Form>

         <p class="mt-6">
            <span class="text-white text-lg">{{$t('Already Have An Account?')}}</span>
            <NuxtLink to="/auth/login">
               <span class="text-green-500 text-[21px] font-bold ms-[4px] underline">{{$t('Log In')}}</span>
            </NuxtLink>
         </p>

         <p class="text-white text-[12px] mt-5 text-center">{{$t('copyright')}}</p>
      </div>
   </div>
</template>

<script setup>
   import { ref } from 'vue';
   import { translate } from '~/utils/translate';

   const form = ref({
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      password_confirmation: '',
      phone_number: '',
      agree: true
   });
   const passwordConfirmationRule = (val) => val === form.value.password || translate('Password must match');
   const agreeRule = (val) => val === val || translate('Password must match');

   const fieldsValidations = {
      first_name: ['required'],
      last_name: ['required'],
      email: ['required', 'isEmail'],
      password: ['required'],
      password_confirmation: ['required', passwordConfirmationRule],
      phone_number: ['required'],
      agree: ['required'],
   };

   const loading = ref(false);


   const submit = async () => {
      console.log("submitted",form.value);
      // const success = await templateStore.createTemplate(props.id, props.type);
      // if (success) redirectToList();
   };
</script>