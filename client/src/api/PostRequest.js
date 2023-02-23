import axios from 'axios'


const API = axios.create({ baseURL: 'http://localhost:5050' });
API.interceptors.request.use((req) => {

    if (localStorage.getItem('adminProfile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('adminProfile')).token}`
    } else if (localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    } else {
        localStorage.clear();
    }
    return req
})

export const getTimelinePosts = (id) => API.get(`/post/${id}/timeline`)

export const likePost = (id, userId) => API.put(`post/${id}/like`, { userId: userId })

export const deletePost = (id, currentUser) => API.post(`/post/${id}/delete`, { currentUser: currentUser })

export const reportPost = (postId, reportData) => API.post(`/post/report/${postId}`, reportData);


//request by admin

export const getReportedPosts = () => API.post(`/post/getreportedposts`)

export const reportedPostRemove = (postId) => API.post(`/post/reportedpostremove/${postId}`)