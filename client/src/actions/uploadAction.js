import * as UploadApi from '../api/UploadRequest'

export const uploadImage = (data) => async (dispatch) => {
    try {
        await UploadApi.uploadImage(data)
    } catch (error) {
        if (error.response?.data?.isBlocked) {
            return dispatch({ type: 'LOG_OUT' })
        }
        if (error.response.data === "token expired") {

            dispatch({ type: "LOG_OUT" })
        }
    }
}

export const uploadVideo = (data) => async (dispatch) => {
    try {
        await UploadApi.uploadVideo(data)
    } catch (error) {
        if (error.response?.data?.isBlocked) {
            return dispatch({ type: 'LOG_OUT' })
        }
        if (error.response.data === "token expired") {

            dispatch({ type: "LOG_OUT" })
        }
    }
}

export const uploadPost = (data) => async (dispatch) => {
    dispatch({ type: "UPLOAD_START" })

    try {
        const newPost = await UploadApi.uploadPost(data)
        dispatch({ type: "UPLOAD_SUCCESS", data: newPost.data })
    } catch (error) {
        if (error.response?.data?.isBlocked) {
            return dispatch({ type: 'LOG_OUT' })
        }
        dispatch({ type: "UPLOAD_FAIL" })

    }
}