<template>
   <component
      :is="to && !disabled ? 'NuxtLink' : 'button'"
      :class="`${classes} ${loading ? 'loading' : ''} ${customClasses} justify-${justify}`"
      :disabled="disabled || loading"
      v-bind="to ? to : {}"
      class="relative app-button"
   >
      <div class="loading-wrapper" v-if="loading">
         <Spinner size="25px"/>
      </div>
      <slot name="start-icon">
         <Icon v-if="startIcon"
               :name="startIcon"
               :class="svgClasses"
         />
      </slot>
      <slot>
         <span class="font-semibold leading-none">{{ label }}</span>
      </slot>
      <slot name="end-icon">
         <Icon v-if="endIcon"
               :name="endIcon"
               :class="svgClasses"
         />
      </slot>
   </component>
</template>

<script setup>
   import {computed} from 'vue';

   const props = defineProps({
      customClasses: {
         type: String,
         default: '',
      },
      loading: {
         type: Boolean,
         default: false,
      },
      size: {
         type: String,
         default: 'lg',
      },
      disabled: {
         type: Boolean,
         default: false,
      },
      label: {
         type: String,
         default: null,
      },
      primary: {
         type: Boolean,
         default: true,
      },
      secondary: {
         type: Boolean,
         default: false,
      },
      tertiary: {
         type: Boolean,
         default: false,
      },
      link: {
         type: Boolean,
         default: false,
      },
      to: {},
      variant: {
         type: String,
         default: 'blue',
      },
      startIcon: {
         type: String,
         default: null,
      },
      endIcon: {
         type: String,
         default: null,
      },
      square: {
         type: Boolean,
         default: false,
      },
      justify: {
         type: String,
         default: 'center',
      },
   });

   const Types = {
      primary: {
         blue: {
            button: 'text-white bg-blue-200',
            svg: 'text-white',
         },
         // lightGray: {
         // 	button:
         // 		'text-gray-700 bg-gray-50 hover:bg-gray-300 active:bg-gray-300 active:ring ring-gray-400/[.14] shadow-[0_1px_1px_0px_rgba(0,0,0,0.06)]',
         // 	svg: 'text-gray-700',
         // },
         // gray: {
         // 	button:
         // 		'border-1 text-gray-700 bg-gray-200 hover:bg-gray-300 active:bg-gray-300 active:ring ring-gray-400/[.14]',
         // 	svg: 'text-gray-700',
         // },
         // brand: {
         // 	button:
         // 		'border-1 text-white bg-brand-400 hover:bg-brand-500 active:bg-brand-600 active:ring ring-gray-400/[.14]',
         // 	svg: 'text-white',
         // },
         // brandGradient: {
         // 	button:
         // 		'border-1 text-white bg-gradient-to-tr from-brand-400 to-brand-600 hover:bg-brand-500 active:bg-brand-600 active:ring ring-gray-400/[.14]',
         // 	svg: 'text-white',
         // },
         // error: {
         // 	button:
         // 		'border-1 text-white bg-error-600 hover:bg-error-700 active:bg-error-600 active:ring ring-gray-400/[.14]',
         // 	svg: 'text-white',
         // },
         // warning: {
         // 	button:
         // 		'border-1 text-white bg-warning-600 hover:bg-warning-700 active:bg-warning-600 active:ring ring-gray-400/[.14]',
         // 	svg: 'text-white',
         // },
         // success: {
         // 	button:
         // 		'border-1 text-white bg-success-600 hover:bg-success-700 active:bg-success-600 active:ring ring-gray-400/[.14]',
         // 	svg: 'text-white',
         // },
         // secondary: {
         // 	button:
         // 		'border-1 text-white bg-secondary-500 hover:bg-secondary-600 active:bg-secondary-500 active:ring ring-gray-400/[.14]',
         // 	svg: 'text-white',
         // },
         disabled: {
            button: 'border-1 border-gray-200 text-gray-400 bg-gray-100',
            svg: 'text-gray-400',
         },
      },
      secondary: {
         // gray: {
         // 	button:
         // 		'border-1 border-gray-300 text-gray-700 bg-white hover:bg-gray-50 shadow-[0_1px_2px_0px_rgba(16,24,40,0.05)] active:ring ring-gray-400/[.14]',
         // 	svg: '',
         // },
         // brand: {
         // 	button:
         // 		'border-1 border-brand-300 text-brand-500 bg-brand-50 hover:bg-brand-100 hover:text-brand-600 active:ring ring-gray-400/[.14]',
         // 	svg: 'text-brand-500 hover:text-brand-600',
         // },
         // error: {
         // 	button:
         // 		'border-1 border-error-300 text-error-700 bg-white hover:bg-error-50 active:ring ring-error-400/[.14]',
         // 	svg: 'text-error-700',
         // },
         // warning: {
         // 	button:
         // 		'border-1 border-warning-300 text-warning-700 bg-white hover:bg-warning-50 active:ring ring-warning-400/[.14]',
         // 	svg: 'text-warning-700',
         // },
         // success: {
         // 	button:
         // 		'border-1 border-success-300 text-success-700 bg-white hover:bg-success-50 active:ring ring-success-400/[.14]',
         // 	svg: 'text-success-700',
         // },
         // secondary: {
         // 	button:
         // 		'border-1 border-secondary-300 text-secondary-700 bg-white hover:bg-secondary-50 active:ring ring-secondary-400/[.14]',
         // 	svg: 'text-secondary-700',
         // },
         disabled: {
            button:
               'border-1 border-gray-200 text-gray-400 bg-transparent shadow-[0_1px_2px_0px_rgba(16,24,40,0.05)]',
            svg: 'text-gray-400',
         },
      },
      tertiary: {
         // gray: {
         // 	button: 'text-gray-600 bg-white hover:text-gray-600 hover:bg-gray-50',
         // 	svg: 'text-gray-600 hover:text-gray-600',
         // },
         // brand: {
         // 	button: 'text-brand-500 bg-white hover:text-brand-600 hover:bg-brand-50',
         // 	svg: 'text-brand-500 hover:text-brand-600',
         // },
         // error: {
         // 	button: 'text-error-700 bg-white hover:text-error-800 hover:bg-error-50',
         // 	svg: 'text-error-700 hover:text-error-800',
         // },
         // warning: {
         // 	button: 'text-warning-700 bg-white hover:text-warning-800 hover:bg-warning-50',
         // 	svg: 'text-warning-700 hover:text-warning-800',
         // },
         // success: {
         // 	button: 'text-success-700 bg-white hover:text-success-800 hover:bg-success-50',
         // 	svg: 'text-success-700 hover:text-success-800',
         // },
         // secondary: {
         // 	button:
         // 		'text-secondary-700 bg-white hover:text-secondary-800 hover:bg-secondary-50',
         // 	svg: 'text-secondary-700 hover:text-secondary-800',
         // },
         disabled: {
            button: 'text-gray-400',
            svg: 'text-gray-400',
         },
      },
      link: {
         // gray: {
         // 	button: 'text-gray-600 hover:text-gray-700',
         // 	svg: 'text-gray-600 hover:text-gray-700',
         // },
         // brand: {
         // 	button: 'text-brand-500 hover:text-brand-600',
         // 	svg: 'text-brand-500 hover:text-brand-600',
         // },
         // error: {
         // 	button: 'text-error-700 hover:text-error-800',
         // 	svg: 'text-error-700 hover:text-error-800',
         // },
         // warning: {
         // 	button: 'text-warning-700 hover:text-warning-800',
         // 	svg: 'text-warning-700 hover:text-warning-800',
         // },
         // success: {
         // 	button: 'text-secondary-700 hover:text-secondary-800',
         // 	svg: 'text-secondary-700 hover:text-secondary-800',
         // },
         disabled: {
            button: 'text-gray-400',
            svg: 'text-gray-400',
         },
      },
   };

   const Sizes = {
      sm: props.square ? 'p-2' : 'px-3 py-2 text-base gap-1',
      md: props.square ? 'p-2.5' : 'px-3.5 py-2.5 text-base gap-1',
      lg: props.square ? 'p-3' : 'px-4.5 py-3.5 text-lg gap-2',
      xl: props.square ? 'p-3.5' : 'px-[18px] py-3 text-lg gap-1.5',
   };

   const SizesLink = {
      sm: 'text-base gap-1.5',
      md: 'text-base gap-1.5',
      lg: 'text-lg gap-2',
   };

   const currentType = computed(() => {
      if (props.secondary) return 'secondary';
      else if (props.tertiary) return 'tertiary';
      else if (props.link) return 'link';
      return 'primary';
   });

   const classes = computed(() => {
      return `${Types[currentType.value]?.[props.disabled ? 'disabled' : props.variant]?.button} ${
         currentType.value === 'link' ? SizesLink?.[props.size] : Sizes?.[props.size]
      } ${props.link ? 'cursor-pointer d-flex align-items-center' : ''}`;
   });

   const svgClasses = computed(() => {
      return `${Types[currentType.value]?.[props.disabled ? 'disabled' : props.variant]?.svg}`;
   });
</script>

<style lang="scss" scoped>
   button {
      border-radius: 25px;
      display: flex;
      align-items: center;
      height: max-content;

      &[disabled] {
         cursor: not-allowed;
      }
   }

   .app-button {
      .loading-wrapper {
         position: absolute;
         z-index: 1;
         border-radius: 25px;
         background-color: inherit !important;
         width: 100%;
         height: 100%;
         display: flex;
         justify-content: center;
         align-items: center;

         .lds-ring {
            width: 45px !important;
            height: 39px !important;
            display: flex;
            align-items: center;
            justify-content: center;
         }
      }

      &.loading {
         pointer-events: none;
      }
   }
</style>

<style lang="scss" scoped>
   /*@import 'tailwindcss/base';*/
   /*@import 'tailwindcss/utilities';*/
</style>
