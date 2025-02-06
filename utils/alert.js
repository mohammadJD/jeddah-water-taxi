import { useLayoutStore } from '@/v2/store/shared/layout-store';
import { t } from '../../locales/index';

const timer = 3000;

export const success = (message)=> {
	Swal.fire({
		toast: true,
		text: message,
		position: useLayoutStore().isRTL ? 'top-start' : 'top-end',
		showConfirmButton: false,
		timer: timer,
		timerProgressBar: true,
		iconColor: 'transparent',
		iconHtml: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g id="check-circle" clip-path="url(#clip0_913_485)">
                        <path id="Icon" d="M6.24984 9.99984L8.74984 12.4998L13.7498 7.49984M18.3332 9.99984C18.3332 14.6022 14.6022 18.3332 9.99984 18.3332C5.39746 18.3332 1.6665 14.6022 1.6665 9.99984C1.6665 5.39746 5.39746 1.6665 9.99984 1.6665C14.6022 1.6665 18.3332 5.39746 18.3332 9.99984Z" stroke="#079455" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                    </g>
                    <defs>
                    <clipPath id="clip0_913_485">
                        <rect width="20" height="20" fill="white"/>
                    </clipPath>
                    </defs>
                </svg>`,
	});
}

function errorAlert(message) {
	Swal.fire({
		toast: true,
		text: message,
		position: useLayoutStore().isRTL ? 'top-start' : 'top-end',
		showConfirmButton: false,
		timer: timer,
		timerProgressBar: true,
		iconColor: 'transparent',
		iconHtml: `<svg height="32" style="overflow:visible;enable-background:new 0 0 32 32" viewBox="0 0 32 32" width="32" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g><g id="Error_1_"><g id="Error"><circle cx="16" cy="16" id="BG" r="16" style="fill:#D72828;"/><path d="M14.5,25h3v-3h-3V25z M14.5,6v13h3V6H14.5z" id="Exclamatory_x5F_Sign" style="fill:#E6E6E6;"/></g></g></g></svg>`,
	});
}

function confirmationDialog(cb, { text = t('you-wont-be-able-to-revert')} = {}) {
	const title = t('are-you-sure');
	const confirm = t('confirm');
	const cancel = t('cancel');

	Swal.fire({
		title,
		text,
		icon: 'warning',
		showCancelButton: true,
		confirmButtonColor: '#B72517',
		cancelButtonColor: '#98A2B3',
		confirmButtonText: confirm,
		cancelButtonText: cancel,
	}).then((result) => {
		if (result.isConfirmed) {
			cb();
		}
	});
}

export const useConfirm = (cb, confirmMessages = {}) => {
	return (...attrs) => {
		confirmationDialog(() => cb(...attrs), confirmMessages);
	};
};

export const Alert = {
	success: successAlert,
	error: errorAlert,
	confirmationDialog,
};
