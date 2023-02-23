import * as UserApi from '../api/UserRequest'

export const updateUser = (id, formData) => async (dispatch) => {
    dispatch({ type: "UPDATING_START" })
    try {
        const { data } = await UserApi.updateUser(id, formData);
        dispatch({ type: "UPDATING_SUCCESS", data: data })
    } catch (error) {
        if (error.response?.data?.isBlocked) {
            return dispatch({ type: 'LOG_OUT' })
        }
        dispatch({ type: "UPDATING_FAIL" })
    }
}

export const followUser = (id, data) => async (dispatch) => {
    dispatch({ type: "FOLLOW_USER", data: id })
    try {
        await UserApi.followUser(id, data)
    } catch (error) {
        if (error.response?.data?.isBlocked) {
            return dispatch({ type: 'LOG_OUT' })
        }
    }
}

export const unFollowUser = (id, data) => async (dispatch) => {
    dispatch({ type: "UNFOLLOW_USER", data: id })
    try {

        await UserApi.unFollowUser(id, data)
    } catch (error) {
        if (error.response?.data?.isBlocked) {
            return dispatch({ type: 'LOG_OUT' })
        }

    }
}


export const getUser = (id) => async (dispatch) => {
    dispatch({ type: "FETCH_USER_DETAILS" })

    try {
        const { data } = await UserApi.getUser(id)
        dispatch({ type: "USER_DETAILS_FETCHED", data: data })
    } catch (error) {
        if (error.response?.data?.isBlocked) {
            return dispatch({ type: 'LOG_OUT' })
        }
        dispatch({ type: "USER_DETAILS_FETCHING_FAIL" })
        if (error.response.data === "token expired") {
            dispatch({ type: "LOG_OUT" })
        }
    }
}



export const sendVerifiyRequest = (userId) => async (dispatch) => {
    try {
        const response = await UserApi.sendVerifiyRequest(userId)
        dispatch({ type: "SEND_ISFAMOUS_REQUEST" })
    } catch (error) {
        if (error.response.data.isBlocked) {
            return dispatch({ type: 'LOG_OUT' })
        }
        if (error.response.data === "token expired") {
            dispatch({ type: "LOG_OUT" })
        }
    }
}


export const blockUser = (id, active) => async (dispatch) => {
    try {
        return UserApi.blockUser(id, active)
    } catch (error) {
        if (error.response.data === "token expired") {

            dispatch({ type: "ADMIN_LOG_OUT" })
        }
    }
}

export const getVerifyNotifications = () => async (dispatch) => {
    try {
        return UserApi.getVerifyNotifications()
    } catch (error) {
        if (error.response.data === "token expired") {

            dispatch({ type: "ADMIN_LOG_OUT" })
        }
    }
}

export const getNotifications = (userId) => async (dispatch) => {
    try {
        return UserApi.getNotifications(userId)
    } catch (error) {
        if (error.response?.data?.isBlocked) {
            return dispatch({ type: 'LOG_OUT' })
        }
        if (error.response.data === 'token expired') {
            dispatch({ type: "LOG_OUT" })
        }
    }
}


export const makeIsFamous = (id) => async (dispatch) => {
    try {
        return await UserApi.makeIsFamous(id)
    } catch (error) {
        if (error.response.data === "token expired") {

            dispatch({ type: "ADMIN_LOG_OUT" })
        }
    }
}
export const getUserData = (query) => async (dispatch) => {
    try {
        return await UserApi.getUserData(query)
    } catch (error) {
        if (error.response.data === "token expired") {
            dispatch({ type: "ADMIN_LOG_OUT" })
        }
    }
}

export const getAllUser = () => async (dispatch) => {
    dispatch({ type: "FETCH_ALL_USERS" })
    try {
        const { data } = await UserApi.getAllUser();
        dispatch({ type: "ALL_USERS_FETCHED", data: data })
    } catch (error) {
        if (error.response?.data?.isBlocked) {
            return dispatch({ type: 'LOG_OUT' })
        }
        dispatch({ type: "ALL_USERS_FETCHING_FAIL" })
    }
}

