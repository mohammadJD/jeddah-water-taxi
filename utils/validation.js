// import { useI18n } from '@nuxtjs/i18n';

export const required = (val) => {
	const nuxtApp = useNuxtApp();
	return (val !== undefined && val !== null && val !== '') || nuxtApp.$i18n.t('validators.required');
};

export const isEmail = (val) => {
	const { t } = useI18n();
	return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(val) || t('validators.is-email');
};

export const minLength = (minLength) => (val) => {
	const { t } = useI18n();
	if (typeof val !== 'string') return true;
	return val.length >= minLength || t('validators.min-length', [minLength]);
};

export const maxLength = (maxLength) => (val) => {
	const { t } = useI18n();
	if (typeof val !== 'string') return true;
	return val.length <= maxLength || t('validators.max-length', [maxLength]);
};

export const minValue = (minValue) => (val) => {
	const { t } = useI18n();
	if (typeof val !== 'number') return true;
	return val >= minValue || t('validators.min-value', [minValue]);
};

export const maxValue = (maxValue) => (val) => {
	const { t } = useI18n();
	if (typeof val !== 'number') return true;
	return val <= maxValue || t('validators.max-value', [maxValue]);
};

export const minArrayLength = (minLength) => (val) => {
	const { t } = useI18n();
	if (typeof minLength !== 'number') return true;
	if (!Array.isArray(val)) return true;
	return val.length >= minLength || t('validators.min-number-of-items', [minLength]);
};

export const maxArrayLength = (maxLength) => (val) => {
	const { t } = useI18n();
	if (typeof maxLength !== 'number') return true;
	if (!Array.isArray(val)) return true;
	return val.length <= maxLength || t('validators.max-number-of-items', [maxLength]);
};

export const isPhoneNumber = (val) => {
	const { t } = useI18n();
	if (typeof val !== 'string') return true;
	return /^(5)(5|0|3|6|4|9|1|8|7)([0-9]{7})$/u.test(val) || t('validators.is-phone-number');
};

export const isPhoneNumberWithCountryCode = (val) => {
	const { t } = useI18n();
	if (typeof val !== 'string') return true;
	return (
		/^(9665)(5|0|3|6|4|9|1|8|7)([0-9]{7})$/u.test(val) ||
		t('validators.is-phone-number-with-country')
	);
};

export const alphabetAndArabicAndSpacesRegexp = (val) => {
	const { t } = useI18n();
    return /^([a-zA-Z\u0621-\u064A\s]+|)$/.test(val) || t('templates.createEdit.alphabetAndArabicAndSpacesValidation');
};

export const isUrl = (val) => {
	const { t } = useI18n();
    const regexpUrl = /^(https?:\/\/[^\s/$.?#].[^\s]*|)$/; // fragment locator;
    return regexpUrl.test(val) || t('templates.createEdit.urlValidation');
};

export const globalValidators = {
	required,
	isEmail,
};
