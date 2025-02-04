<template>
	<component
		:is="to && !disabled ? 'NuxtLink' : 'button'"
		:class="`${classes} ${loading ? 'loading' : ''} ${customClasses} justify-${justify}`"
		:disabled="disabled || loading"
		v-bind="to ? to : {}"
		class="position-relative app-button"
	>
		<div class="loading-wrapper" v-if="loading">
			<Spinner size="25px" />
		</div>
		<slot name="start-icon">
<!--			<AppIcon-->
<!--				v-if="startIcon"-->
<!--				:name="startIcon"-->
<!--				:class="svgClasses"-->
<!--				class="max-h-[17px] max-w-[17px]"-->
<!--			/>-->
		</slot>
		<slot>
			<span class="pt-0.5 font-semibold leading-none">{{ label }}</span>
		</slot>
		<slot name="end-icon">
<!--			<AppIcon-->
<!--				v-if="endIcon"-->
<!--				:name="endIcon"-->
<!--				:class="svgClasses"-->
<!--				class="max-h-[17px] max-w-[17px]"-->
<!--			/>-->
		</slot>
	</component>
</template>

<script setup>
import { computed } from 'vue';

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
		default: 'md',
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
		default: 'brand',
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
		lightGray: {
			button:
				'text-gray-700 bg-gray-50 hover:bg-gray-300 active:bg-gray-300 active:ring ring-gray-400/[.14] shadow-[0_1px_1px_0px_rgba(0,0,0,0.06)]',
			svg: 'text-gray-700',
		},
		gray: {
			button:
				'border-1 text-gray-700 bg-gray-200 hover:bg-gray-300 active:bg-gray-300 active:ring ring-gray-400/[.14]',
			svg: 'text-gray-700',
		},
		brand: {
			button:
				'border-1 text-white bg-brand-400 hover:bg-brand-500 active:bg-brand-600 active:ring ring-gray-400/[.14]',
			svg: 'text-white',
		},
		brandGradient: {
			button:
				'border-1 text-white bg-gradient-to-tr from-brand-400 to-brand-600 hover:bg-brand-500 active:bg-brand-600 active:ring ring-gray-400/[.14]',
			svg: 'text-white',
		},
		error: {
			button:
				'border-1 text-white bg-error-600 hover:bg-error-700 active:bg-error-600 active:ring ring-gray-400/[.14]',
			svg: 'text-white',
		},
		warning: {
			button:
				'border-1 text-white bg-warning-600 hover:bg-warning-700 active:bg-warning-600 active:ring ring-gray-400/[.14]',
			svg: 'text-white',
		},
		success: {
			button:
				'border-1 text-white bg-success-600 hover:bg-success-700 active:bg-success-600 active:ring ring-gray-400/[.14]',
			svg: 'text-white',
		},
		secondary: {
			button:
				'border-1 text-white bg-secondary-500 hover:bg-secondary-600 active:bg-secondary-500 active:ring ring-gray-400/[.14]',
			svg: 'text-white',
		},
		disabled: {
			button: 'border-1 border-gray-200 text-gray-400 bg-gray-100',
			svg: 'text-gray-400',
		},
	},
	secondary: {
		gray: {
			button:
				'border-1 border-gray-300 text-gray-700 bg-white hover:bg-gray-50 shadow-[0_1px_2px_0px_rgba(16,24,40,0.05)] active:ring ring-gray-400/[.14]',
			svg: '',
		},
		brand: {
			button:
				'border-1 border-brand-300 text-brand-500 bg-brand-50 hover:bg-brand-100 hover:text-brand-600 active:tw-ring tw-ring-gray-400/[.14]',
			svg: 'tw-text-brand-500 hover:tw-text-brand-600',
		},
		error: {
			button:
				'border-1 tw-border-error-300 tw-text-error-700 tw-bg-white hover:tw-bg-error-50 active:tw-ring tw-ring-error-400/[.14]',
			svg: 'tw-text-error-700',
		},
		warning: {
			button:
				'border-1 tw-border-warning-300 tw-text-warning-700 tw-bg-white hover:tw-bg-warning-50 active:tw-ring tw-ring-warning-400/[.14]',
			svg: 'tw-text-warning-700',
		},
		success: {
			button:
				'border-1 tw-border-success-300 tw-text-success-700 tw-bg-white hover:tw-bg-success-50 active:tw-ring tw-ring-success-400/[.14]',
			svg: 'tw-text-success-700',
		},
		secondary: {
			button:
				'border-1 tw-border-secondary-300 tw-text-secondary-700 tw-bg-white hover:tw-bg-secondary-50 active:tw-ring tw-ring-secondary-400/[.14]',
			svg: 'tw-text-secondary-700',
		},
		disabled: {
			button:
				'border-1 tw-border-gray-200 tw-text-gray-400 tw-bg-transparent tw-shadow-[0_1px_2px_0px_rgba(16,24,40,0.05)]',
			svg: 'tw-text-gray-400',
		},
	},
	tertiary: {
		gray: {
			button: 'tw-text-gray-600 tw-bg-white hover:tw-text-gray-600 hover:tw-bg-gray-50',
			svg: 'tw-text-gray-600 hover:tw-text-gray-600',
		},
		brand: {
			button: 'tw-text-brand-500 tw-bg-white hover:tw-text-brand-600 hover:tw-bg-brand-50',
			svg: 'tw-text-brand-500 hover:tw-text-brand-600',
		},
		error: {
			button: 'tw-text-error-700 tw-bg-white hover:tw-text-error-800 hover:tw-bg-error-50',
			svg: 'tw-text-error-700 hover:tw-text-error-800',
		},
		warning: {
			button: 'tw-text-warning-700 tw-bg-white hover:tw-text-warning-800 hover:tw-bg-warning-50',
			svg: 'tw-text-warning-700 hover:tw-text-warning-800',
		},
		success: {
			button: 'tw-text-success-700 tw-bg-white hover:tw-text-success-800 hover:tw-bg-success-50',
			svg: 'tw-text-success-700 hover:tw-text-success-800',
		},
		secondary: {
			button:
				'tw-text-secondary-700 tw-bg-white hover:tw-text-secondary-800 hover:tw-bg-secondary-50',
			svg: 'tw-text-secondary-700 hover:tw-text-secondary-800',
		},
		disabled: {
			button: 'tw-text-gray-400',
			svg: 'tw-text-gray-400',
		},
	},
	link: {
		gray: {
			button: 'tw-text-gray-600 hover:tw-text-gray-700',
			svg: 'tw-text-gray-600 hover:tw-text-gray-700',
		},
		brand: {
			button: 'tw-text-brand-500 hover:tw-text-brand-600',
			svg: 'tw-text-brand-500 hover:tw-text-brand-600',
		},
		error: {
			button: 'tw-text-error-700 hover:tw-text-error-800',
			svg: 'tw-text-error-700 hover:tw-text-error-800',
		},
		warning: {
			button: 'tw-text-warning-700 hover:tw-text-warning-800',
			svg: 'tw-text-warning-700 hover:tw-text-warning-800',
		},
		success: {
			button: 'tw-text-success-700 hover:tw-text-success-800',
			svg: 'tw-text-success-700 hover:tw-text-success-800',
		},
		success: {
			button: 'tw-text-secondary-700 hover:tw-text-secondary-800',
			svg: 'tw-text-secondary-700 hover:tw-text-secondary-800',
		},
		disabled: {
			button: 'tw-text-gray-400',
			svg: 'tw-text-gray-400',
		},
	},
};

const Sizes = {
	sm: props.square ? 'tw-p-2' : 'tw-px-3 tw-py-2 tw-text-base tw-gap-1',
	md: props.square ? 'tw-p-2.5' : 'tw-px-3.5 tw-py-2.5 tw-text-base tw-gap-1',
	lg: props.square ? 'tw-p-3' : 'tw-px-4 tw-py-2.5 tw-text-lg tw-gap-1.5',
	xl: props.square ? 'tw-p-3.5' : 'tw-px-[18px] tw-py-3 tw-text-lg tw-gap-1.5',
};

const SizesLink = {
	sm: 'tw-text-base tw-gap-1.5',
	md: 'tw-text-base tw-gap-1.5',
	lg: 'tw-text-lg tw-gap-2',
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
	} ${props.link ? 'tw-cursor-pointer d-flex align-items-center' : ''}`;
});

const svgClasses = computed(() => {
	return `${Types[currentType.value]?.[props.disabled ? 'disabled' : props.variant]?.svg}`;
});
</script>

<style lang="scss" scoped>
button {
	border-radius: 28px;
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
		border-radius: 8px;
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
