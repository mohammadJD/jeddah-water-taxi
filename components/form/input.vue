<template>
	<div>
		<slot name="label">
			<div v-if="label" class="pb-1.5 font-medium text-gray-600">
				<span>{{ label }}</span>
				<span v-if="props.rules.includes('required')" class="text-error-400">*</span>
			</div>
		</slot>
		<div
			class="input-wrapper flex w-full items-stretch rounded-md border transition-all"
			:class="computedClasses"
		>
			<div
				class="flex max-w-full flex-1 items-center gap-2 rounded-md bg-white"
				:class="sizeClasses[props.size]"
			>
				<slot name="start-icon"></slot>
				<slot name="start-badge">
					<div
						v-if="startBadge"
						class="rounded-md bg-gray-100 p-1.5 text-sm font-medium text-gray-600"
					>
						{{ startBadge }}
					</div>
				</slot>
				<input
					class="w-full bg-white text-base !placeholder-gray-500 outline-none disabled:cursor-not-allowed"
					:class="dirClass"
					v-model="inputModel"
					:placeholder="placeholder"
					:type="type"
					:disabled="disabled"
					v-bind="$attrs"
					ref="inputElementRef"
					:style="size == 'xs' ? 'height: 26px' : 'height: 24px'"
				/>
				<Spinner v-if="loading" size="20px" class="spinner" />
				<slot name="end-badge">
					<div
						v-if="endBadge"
						class="rounded-md bg-gray-100 p-1.5 text-sm font-medium text-gray-600"
					>
						{{ endBadge }}
					</div>
				</slot>
				<AlertCircle
					v-if="hasErrorMessage"
					class="text-error-500"
				/>
				<slot v-else name="end-icon"></slot>
			</div>
			<div v-if="hasEndButtonSlot" class="w-px bg-gray-300"></div>
			<div v-if="hasEndButtonSlot">
				<div class="w-max">
					<slot name="end-btn"> </slot>
				</div>
			</div>
		</div>
		<div
			:class="rules.length || hint || allocateBottomSpace ? 'pt-1 text-sm' : ''"
			:style="rules.length || hint || allocateBottomSpace ? 'min-height: 20px' : ''"
		>
			<div v-if="!errorMessage" class="text-gray-600">
				<slot name="hint">
					{{ hint }}
				</slot>
			</div>
			<div v-if="errorMessage" class="text-error-500">
				{{ errorMessage }}
			</div>
		</div>
	</div>
</template>

<script setup>
import { computed, ref, useSlots } from 'vue';
import { debounce as debounceFunc } from 'lodash';
import { useFieldValidation } from '@/utils/forms';
// import { useLayoutStore } from '@/v2/store/shared/layout-store';
import AlertCircle from '~/assets/icons/alert-circle.svg';
// const layoutStore = useLayoutStore();

const props = defineProps({
	modelValue: {},
	label: {
		type: String,
		default: '',
	},
	placeholder: {
		type: String,
		default: '',
	},
	hint: {
		type: String,
		default: '',
	},
	size: {
		type: String,
		default: 'lg',
	},
	disabled: {
		type: Boolean,
		default: false,
	},
	loading: {
		type: Boolean,
		default: false,
	},
	rules: {
		type: Array,
		default: () => [],
	},
	debounce: {
		type: Number,
		default: 0,
	},
	type: {
		type: String,
		default: 'text',
	},
	allocateBottomSpace: {
		type: Boolean,
		default: false,
	},
	forceNumericDirection: {
		type: Boolean,
		default: true,
	},
	startBadge: {
		type: String,
		default: '',
	},
	endBadge: {
		type: String,
		default: '',
	},
});

const emit = defineEmits(['update:modelValue']);
const slots = useSlots();
const inputElementRef = ref(null);

const hasEndButtonSlot = computed(() => {
	return slots['end-btn'];
});

const emitModel = (val) => {
	if (props.type == 'number' && val !== '' && val !== null && val !== undefined)
		emit('update:modelValue', +val);
	else emit('update:modelValue', val);
};
const inputModel = computed({
	get() {
		return props.modelValue;
	},
	set: props.debounce ? debounceFunc(emitModel, props.debounce) : emitModel,
});

const dirClass = computed(() => {
	return '';
	// return props.forceNumericDirection
	// 	? layoutStore.isRTL && props.type === 'number'
	// 		? 'dir-rtl'
	// 		: ''
	// 	: '';
});

const { errorMessage, hasErrorMessage } = useFieldValidation(
	() => props.modelValue,
	() => props.rules,
);

const sizeClasses = {
	xs: 'px-2 py-0.5',
	sm: 'px-3 py-2',
	md: 'px-3.5 py-2.5',
	lg: 'px-4.5 py-3.5',
};
const computedClasses = computed(() => {
	const res = [];
	if (hasErrorMessage.value) {
		res.push(
			'border-error-300 focus-within:border-error-300 focus-within:ring focus-within:ring-error-500/[.24]',
		);
	} else {
		res.push('border-gray-300');
	}
	if (!hasErrorMessage.value && !props.disabled) {
		res.push('focus-within:border-brand-300');
	}
	if (props.disabled) {
		res.push('text-gray-500');
	}
	return res;
});

const focus = () => {
	inputElementRef.value?.focus?.();
};

defineExpose({
	focus,
});
</script>

<style lang="scss" scoped>
::v-deep(.lds-ring div) {
	margin: auto;
}
</style>

<style lang="scss" scoped>
/*@import 'tailwindcss/base';*/
/*@import 'tailwindcss/utilities';*/
/*.dir-rtl {*/
/*	direction: rtl !important;*/
/*}*/
/*.dir-ltr {*/
/*	direction: ltr !important;*/
/*}*/
</style>
