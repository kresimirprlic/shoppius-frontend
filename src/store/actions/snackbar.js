export const showSnackbar = (message) => {
	return {
		type: "[SNACKBAR] SHOW",
		message,
	};
};
export const hideSnackbar = () => {
	return {
		type: "[SNACKBAR] HIDE",
	};
};
