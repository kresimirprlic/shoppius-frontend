const initialState = {
	isVisible: false,
	isLoading: false,
	title: "",
	message: "",
	modalProps: {}, //here we can set whatever we need
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case "[ALERTMODAL] SHOW":
			return {
				...state,
				isVisible: true,
				title: action.title,
				message: action.message,
				modalProps: action.modalProps,
			};
		case "[ALERTMODAL] HIDE":
			return {
				isVisible: false,
			};
		case "[ALERTMODAL] ISLOADING":
			return {
				...state,
				isLoading: action.isLoading,
			};
		case "[ALERTMODAL] RESET":
			return initialState;

		default:
			return state;
	}
};

export default reducer;
