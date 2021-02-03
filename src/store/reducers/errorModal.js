const initialState = {
    isVisible: false,
    message: "",
}

const reducer = (state = initialState, action) => {
    switch (action.type) {

        case "[ERROR_MODAL] SHOW":
            return {
                isVisible: true,
                message:action.message,
            }
        case "[ERROR_MODAL] HIDE":
            return {
                isVisible: false,
            }
        default:
            return state
    }
}

export default reducer;
