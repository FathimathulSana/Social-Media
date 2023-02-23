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

export const getUser = (userId) => API.get(`/user/${userId}`)

export const updateUser = (id, formData) => API.put(`/user/${id}`, formData)

export const getAllUser = () => API.get('/user')

export const followUser = (id, data) => API.put(`/user/${id}/follow`, data)

export const unFollowUser = (id, data) => API.put(`/user/${id}/unfollow`, data)

export const createChat = ((data) => API.post('/chat/', data));

export const editPost = (postId, data) => API.post(`/post/edit/post`, data)

export const sendVerifiyRequest = (userId) => API.post(`/user/isfamousrequest/${userId}`)

export const getNotifications = (userId) => API.get(`/user/getnotifications/${userId}`)

export const removeNotification = (id) => API.delete(`/user/removenotification/${id}`)

//request by admin
export const getUserData = (query) => API.post(`/user/getdata`, { data: query })

export const blockUser = (id, active) => API.post(`/user/blockuser/${id}`, { data: active })

export const getVerifyNotifications = () => API.post(`user/getverifynotifications`)

export const makeIsFamous = (id) => API.post(`/user/makeisfamous/${id}`)