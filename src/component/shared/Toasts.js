import { toast } from "react-toastify";

export const toastError = (errorMessage) => {
	return toast.error(errorMessage, {
		position: toast.POSITION.TOP_RIGHT,
	});
};

export const toastSuccess = (message) => {
	return toast.success(message, {
		position: toast.POSITION.TOP_RIGHT,
	});
};

export const toastWarning = (message) => {
	return toast.warning(message, {
		position: toast.POSITION.TOP_RIGHT,
	});
};
