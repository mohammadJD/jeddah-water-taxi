<template>
	<form @submit.prevent="onSubmit">
		<slot></slot>
	</form>
</template>

<script setup>
import { ref } from 'vue';
import { provide } from 'vue';

const fields = ref({});
const emit = defineEmits(['submit']);

const validate = async () => {
	let isValid = true;
	let firstInvalidFocused = false;
	for (let i = 0; i < Object.keys(fields.value).length; i++) {
		const uid = Object.keys(fields.value)[i];
		const field = fields.value[uid];
		isValid &= await field.validateFunction({ setErrorMessage: true });
		if (!isValid && !firstInvalidFocused) {
			field.vm?.exposed?.focus?.();
			firstInvalidFocused = true;
		}
	}

	return isValid;
};

const onSubmit = async () => {
	const isValid = await validate();
	if (!isValid) {
		return;
	}
	emit('submit');
};

const submit = () => {
	onSubmit();
};

provide('form-component', {
	registerField: ({ uid, validateFunction, vm }) => {
		fields.value[uid] = {
			validateFunction,
			vm,
			uid,
		};
	},
	unregisterField: ({ uid }) => {
		delete fields.value[uid];
	},
});

defineExpose({
	submit,
	validate,
});
</script>

<style lang="scss" scoped></style>
