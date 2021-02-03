const initialState = {
	searchQuery: "",
	filterBy: "",
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case "[SEARCHBAR] SET_SEARCH_QUERY":
			return {
				...state,
				searchQuery: action.query,
			};
		
		case "[SEARCHBAR] SET_FILTER_BY":
			return {
				...state,
				filterBy: action.filterBy,
			};
		default:
			return state;
	}
};

export default reducer;
