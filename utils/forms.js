import { computed, getCurrentInstance, inject, onMounted, onUnmounted, ref, watch } from 'vue';
import { globalValidators } from './validation';

export const useFieldValidation = (modelValueFunc, rulesFunc) => {
	const errorMessage = ref('');

	const formApi = inject('form-component', null);

	const validate = async ({ setErrorMessage }) => {
		let msg = '';
		const modelValue = modelValueFunc();
		const rules = rulesFunc();
		await Promise.all(
			rules.map(async (rule) => {
				if (msg !== '') return;
				if (typeof rule === 'string' && !globalValidators[rule]) {
					console.error('[Validation] Unsupported global validator', rule);
					return;
				}
				const ruleFunction = typeof rule === 'string' ? globalValidators[rule] : rule;
				const ruleRes = await ruleFunction(modelValue);
				if (typeof ruleRes === 'string') {
					msg = ruleRes;
					return;
				}
			}),
		);

		if (setErrorMessage) {
			errorMessage.value = msg;
		}
		return !msg;
	};

	const hasErrorMessage = computed(() => {
		return errorMessage.value !== '';
	});

	watch(modelValueFunc, () => {
		validate({ setErrorMessage: true });
	});

	watch(
		rulesFunc,
		() => {
			validate({ setErrorMessage: true });
		},
		{ deep: true },
	);

	const vm = getCurrentInstance();
	onMounted(() => {
		if (!formApi) return;

		const uid = vm.uid;
		formApi.registerField({
			uid,
			validateFunction: validate,
			vm,
		});
	});

	onUnmounted(() => {
		if (!formApi) return;

		formApi.unregisterField({ uid: vm.uid });
	});

	return {
		errorMessage,
		validate,
		hasErrorMessage,
	};
};
