export const showErrorModal = (message) => ({
    type: "[ERROR_MODAL] SHOW",
    message,
});

export const hideErrorModal = () => ({
    type: "[ERROR_MODAL] HIDE",
})

