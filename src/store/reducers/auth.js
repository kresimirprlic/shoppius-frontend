const initialState = {
    userId: null,
    email: null,
    token: null,
    role: null,
    isLoggedIn: false,
    users: null,
    expirationDate: null,
}

export default (state = initialState, action) => {
    switch (action.type) {

        case "[AUTH] SET_IS_LOGGED_IN":
            return {
                ...state,
                userId: action.userId,
                email: action.email,
                token: action.token,
                role: action.role,
                isLoggedIn: action.isLoggedIn,
                expirationDate: action.expirationDate
            }
        case "[AUTH] SET_IS_LOGGED_OUT":
            return initialState;

        case "[AUTH] SET_ALL_USERS":
            return {
                ...state,
                users: action.users
            }
        default:
            return state
    }
}
