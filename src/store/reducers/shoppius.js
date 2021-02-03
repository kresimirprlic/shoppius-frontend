
const initialState = {
   isLoading: false,
	inventory:[],
	cart:[],
	customer:{
		email:"",
		address:"",
		creditCard:""
	}
	
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case "[SHOPPIUS] IS_LOADING":
			return {
				...state,
				isLoading: action.isLoading,
         };
         
      case "[SHOPPIUS] SET_INVENTORY":
         return {
				...state,
				inventory: action.inventory,
         };
      case "[SHOPPIUS] SET_CART":
         return {
				...state,
				cart: action.cart,
         };
      case "[SHOPPIUS] SET_CUSTOMER_FIELDS":
			const newCustomerValues = {...state.customer};
			newCustomerValues[action.field] = action.value
         return {
				...state,
				customer: newCustomerValues
         };
		

		default:
			return state;
	}
};

export default reducer;
