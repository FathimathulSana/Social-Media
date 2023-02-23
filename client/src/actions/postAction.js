import * as PostApi from "../api/PostRequest";

export const getTimelinePosts = (id) => async (dispatch) => {
    dispatch({ type: "RETREIVING_START" });
    try {
        const { data } = await PostApi.getTimelinePosts(id);
        dispatch({ type: "RETREIVING_SUCCESS", data: data });
    } catch (error) {
        if (error.response?.data?.isBlocked) {
            return dispatch({ type: 'LOG_OUT' })
        }
        dispatch({ type: "RETREIVING_FAIL" });
    }
};

export const deletePosts = (id, currentUser) => async (dispatch) => {
    dispatch({ type: "DELETE_STARTED" });
    try {
        await PostApi.deletePost(id, currentUser);
        dispatch({ type: "DELETE_SUCCESS", id: id });
    } catch (error) {
        if (error.response?.data?.isBlocked) {
            return dispatch({ type: 'LOG_OUT' })
        }
        dispatch({ type: "DELETE_FAIL" });
        if (error.response.data === "token expired") {
            dispatch({ type: "LOG_OUT" });
        }
    }
};

export const reportPost = (postId, reportData) => async (dispatch) => {
    try {
        return await PostApi.reportPost(postId, reportData);
    } catch (error) {
        if (error.response?.data?.isBlocked) {
            return dispatch({ type: 'LOG_OUT' })
        }
        if (error.response.data === "token expired") {
            dispatch({ type: "LOG_OUT" });
        }
    }
};

export const getReportedPosts = () => async (dispatch) => {
    try {
        return await PostApi.getReportedPosts();
    } catch (error) {
        if (error.response.data === "token expired") {
            dispatch({ type: "ADMIN_LOG_OUT" });
        }
    }
};

export const reportedPostRemove = (postId) => async (dispatch) => {
    try {
        return await PostApi.reportedPostRemove(postId);
    } catch (error) {
        if (error.response.data === "token expired") {
            dispatch({ type: "ADMIN_LOG_OUT" });
        }
    }
};
