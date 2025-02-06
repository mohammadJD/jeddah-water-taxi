<template>
	<div class="flex items-center gap-1">
		<div
			class="flex items-center rounded-xl p-0.5 ring-gray-400/[.20]"
			:class="computedClasses"
			:style="computedSizeStyles"
			@click="toggle"
		>
			<div :style="computedInnerSizeStyles" class="rounded-full bg-white shadow"></div>
		</div>
		<slot name="label">
			<div
				v-if="label"
				:class="{ 'cursor-pointer': !disabled, 'cursor-not-allowed': disabled }"
				@click="toggle"
			>
				{{ label }}
			</div>
		</slot>
	</div>
</template>

<script setup>
import { computed } from 'vue';
import { useConfirm } from '@/v2/plugins/alert';

const props = defineProps({
	modelValue: {},
	trueValue: {
		type: [String, Boolean, Number],
		default: true,
	},
	falseValue: {
		type: [String, Boolean, Number],
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
		default: '',
	},
    useConfirmOnCheck: {
        type: Boolean,
        default: false
    },
    useConfirmOnUnCheck: {
        type: Boolean,
        default: false
    },
    confirmMessages: {
        type: Object,
        default: {}
    }
});

const emit = defineEmits(['update:modelValue']);

const isChecked = computed(() => {
	if (Array.isArray(props.modelValue)) {
		return props.modelValue.some((val) => val === props.trueValue);
	} else {
		return props.modelValue === props.trueValue;
	}
});

const confirmToggle = useConfirm((value)=>{
    emit('update:modelValue', value);
}, props.confirmMessages);

const toggle = () => {
	if (props.disabled) return;
	if (Array.isArray(props.modelValue)) {
		if (isChecked.value) {
			const idx = props.modelValue.findIndex((el) => el === props.trueValue);
			const res = [...props.modelValue];
			res.splice(idx, 1);
			emit('update:modelValue', res);
		} else {
			emit('update:modelValue', [...props.modelValue, props.trueValue]);
		}
	} else {
		if (isChecked.value) {
            if(props.useConfirmOnCheck){
                confirmToggle(props.falseValue);
            }
			else emit('update:modelValue', props.falseValue);
		} else {
		    if(props.useConfirmOnUnCheck){
                confirmToggle(props.trueValue);
            }
			else emit('update:modelValue', props.trueValue);
		}
	}
};

const computedClasses = computed(() => {
	const res = [];
	if (!props.disabled && isChecked.value) {
		res.push('bg-brand');
	} else {
        if (isChecked.value) {
            res.push('bg-brand-200');
        }
		else res.push('bg-gray-100');
	}
	if (!props.disabled) {
		res.push('cursor-pointer active:ring');
	} else {
		res.push('cursor-not-allowed');
	}
	if (isChecked.value) {
		res.push('justify-end');
	} else {
		res.push('justify-start');
	}
	return res;
});

const computedSizeStyles = computed(() => {
	return sizeStyles[props.size];
});
const computedInnerSizeStyles = computed(() => {
	return innerSizeStyles[props.size];
});

const sizeStyles = {
	sm: { width: '36px', height: '20px' },
	md: { width: '44px', height: '24px' },
};

const innerSizeStyles = {
	sm: { width: '16px', height: '16px' },
	md: { width: '20px', height: '20px' },
};

defineExpose({
	toggle,
});
</script>

<style lang="scss" scoped></style>
