import * as actionCreators from "./index";

export const showAlertModal = (title, message, modalProps) => ({
	type: "[ALERTMODAL] SHOW",
	title,
	message,
	modalProps,
});
export const hideAlertModal = () => ({
	type: "[ALERTMODAL] HIDE",
});
export const setAlertModalIsLoading = (isLoading) => ({
	type: "[ALERTMODAL] IS_LOADING",
	isLoading,
});
export const resetAlertModal = () => ({
	type: "[ALERTMODAL] RESET",
});
export const setActionInMotion = () => {
	return async (dispatch, getState) => {
		try {
			dispatch(setAlertModalIsLoading(true));
			
		} catch (error) {
		} finally {
			dispatch(setAlertModalIsLoading(false));
		}
	};
};
