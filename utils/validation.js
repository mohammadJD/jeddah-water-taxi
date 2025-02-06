import { translate } from './translate';

export const required = (val) => {
	return (val !== undefined && val !== null && val !== '') || translate('validators.required');
};

export const isEmail = (val) => {
	return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(val) || translate('validators.is-email');
};

export const minLength = (minLength) => (val) => {
	if (typeof val !== 'string') return true;
	return val.length >= minLength || translate('validators.min-length', [minLength]);
};

export const maxLength = (maxLength) => (val) => {
	if (typeof val !== 'string') return true;
	return val.length <= maxLength || translate('validators.max-length', [maxLength]);
};

export const minValue = (minValue) => (val) => {
	if (typeof val !== 'number') return true;
	return val >= minValue || translate('validators.min-value', [minValue]);
};

export const maxValue = (maxValue) => (val) => {
	if (typeof val !== 'number') return true;
	return val <= maxValue || translate('validators.max-value', [maxValue]);
};

export const minArrayLength = (minLength) => (val) => {
	if (typeof minLength !== 'number') return true;
	if (!Array.isArray(val)) return true;
	return val.length >= minLength || translate('validators.min-number-of-items', [minLength]);
};

export const maxArrayLength = (maxLength) => (val) => {
	if (typeof maxLength !== 'number') return true;
	if (!Array.isArray(val)) return true;
	return val.length <= maxLength || translate('validators.max-number-of-items', [maxLength]);
};

export const isPhoneNumber = (val) => {
	if (typeof val !== 'string') return true;
	return /^(5)(5|0|3|6|4|9|1|8|7)([0-9]{7})$/u.test(val) || translate('validators.is-phone-number');
};

export const isPhoneNumberWithCountryCode = (val) => {
	if (typeof val !== 'string') return true;
	return (
		/^(9665)(5|0|3|6|4|9|1|8|7)([0-9]{7})$/u.test(val) ||
		translate('validators.is-phone-number-with-country')
	);
};

export const alphabetAndArabicAndSpacesRegexp = (val) => {
    return /^([a-zA-Z\u0621-\u064A\s]+|)$/.test(val) || translate('templates.createEdit.alphabetAndArabicAndSpacesValidation');
};

export const isUrl = (val) => {
    const regexpUrl = /^(https?:\/\/[^\s/$.?#].[^\s]*|)$/; // fragment locator;
    return regexpUrl.test(val) || translate('templates.createEdit.urlValidation');
};

export const globalValidators = {
	required,
	isEmail,
};
