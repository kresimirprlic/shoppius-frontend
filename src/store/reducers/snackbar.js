const initialState = {
	isVisible: false,
	snackbarMessage: "",
};
const reducer = (state = initialState, action) => {
	switch (action.type) {
		case "[SNACKBAR] SHOW":
			return {
				isVisible: true,
				snackbarMessage: action.message,
			};
		case "[SNACKBAR] HIDE":
			return {
				isVisible: false,
			};
		default:
			return state;
	}
};

export default reducer;
