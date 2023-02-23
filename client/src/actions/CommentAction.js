import * as CommentApi from '../api/CommentRequests'

export const createComment = (postId, comment, userId) => async (dispatch) => {
    try {
        return await CommentApi.createComment(postId, comment, userId)
    } catch (error) {
        if (error.response?.data?.isBlocked) {
            return dispatch({ type: 'LOG_OUT' })
        }
        if (error.response.data === "token expired") {

            dispatch({ type: "LOG_OUT" })
        }
    }
}

export const getComments = (postId) => async (dispatch) => {
    try {
        return await CommentApi.getComments(postId)
    } catch (error) {
        if (error.response?.data?.isBlocked) {
            return dispatch({ type: 'LOG_OUT' })
        }
        if (error.response.data === "token expired") {

            dispatch({ type: "LOG_OUT" })
        }
    }
}

export const deleteComment = (commentId) => async (dispatch) => {
    try {
        return await CommentApi.deleteComment(commentId)
    } catch (error) {
        if (error.response?.data?.isBlocked) {
            return dispatch({ type: 'LOG_OUT' })
        }
        if (error.response.data === "token expired") {

            dispatch({ type: "LOG_OUT" })
        }
    }
}

export const editComment = (commentId, editData) => async (dispatch) => {
    try {
        return await CommentApi.editComment(commentId, editData)
    } catch (error) {
        if (error.response?.data?.isBlocked) {
            return dispatch({ type: 'LOG_OUT' })
        }
        if (error.response.data === "token expired") {

            dispatch({ type: "LOG_OUT" })
        }
    }
}