import axios from "axios"
import * as actionCreators from "./index"

export const setIsLoggedIn = (userId, email, token, role, expirationDate) => ({
	type: "[AUTH] SET_IS_LOGGED_IN",
	userId,
	email,
	token,
	role,
	isLoggedIn: true,
	expirationDate
});

export const setIsLoggedOut = () => ({
	type: "[AUTH] SET_IS_LOGGED_OUT",
});

export const setAllUsers = (users) => ({
	type: "[AUTH] SET_ALL_USERS",
	users,
});

export const getAllUsers = () => {
	return async dispatch => {
		try {
			const response = await axios.get(process.env.REACT_APP_NODE_URL + "/api/auth");
			// console.log("user controller [getAllUsers] response: ", response)
			dispatch(await setAllUsers(response.data.users));

		} catch (error) {
			dispatch(actionCreators.showErrorModal(error.response.data.message || "Something went wrong"))
		}
	}
}

export const signup = (values) => {
	return async dispatch => {
		const data = {
			firstName: values.firstName,
			lastName: values.lastName,
			email: values.email,
			password: values.password
		}
		let response = "fail";
		try {
			response = await axios.post(process.env.REACT_APP_NODE_URL + "/api/auth/signup",
				data)
			//set auth state locally (redux-persists sets storage automatically)
			// console.log("response http [signup]", response)
			dispatch(actionCreators.showSnackbar("Signup successful, please login."))

		} catch (error) {
			dispatch(actionCreators.showErrorModal(error.response.data.message || "Something went wrong"))
		}
		return response;
	}
}

export const login = (values) => {
	return async dispatch => {
		const data = {
			email: values.email,
			password: values.password
		}
		let response = "fail";
		try {
			response = await axios.post(process.env.REACT_APP_NODE_URL + "/api/auth/login",
				data);
			//set auth state locally (redux-persists sets storage automatically)
			dispatch(setIsLoggedIn(response.data.userId, response.data.email, response.data.token, response.data.role, response.data.expiryDate));
			// console.log("response http [login]", response);
			if (response.status === 200) {
				dispatch(actionCreators.showSnackbar("Welcome to Hippo"));
			}else{
				dispatch(actionCreators.showSnackbar("Login unathorized"));
			}
		} catch (error) {
			dispatch(actionCreators.showErrorModal(error.response.data.message || "Something went wrong"))
		}
		return response;
	}
}

export const logout = (params) => {
	return async dispatch => {
		//do we need this? - NO SINCE WE UPDATE REDUX AUTH FIELDS TO NULL with reducer
		// localStorage.removeItem("userData");
		dispatch(setIsLoggedOut());
	}
}