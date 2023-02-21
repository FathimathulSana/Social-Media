import axios from 'axios'


const API = axios.create({ baseURL: 'http://localhost:5050' });
API.interceptors.request.use((req) => {

    if (localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    } else {
        localStorage.clear();
    }
    return req
})

export const uploadImage = (data) => API.post("/upload/", data)

export const uploadVideo = (data) => API.post("/upload/video", data)

export const uploadPost = (data) => API.post('/post', data)