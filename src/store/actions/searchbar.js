export const setSearchQuery = (query) => {
	return {
		type: "[SEARCHBAR] SET_SEARCH_QUERY",
		query,
	};
};

export const setFilterBy = (filterBy) => {
	return {
		type: "[SEARCHBAR] SET_FILTER_BY",
		filterBy,
	};
};
