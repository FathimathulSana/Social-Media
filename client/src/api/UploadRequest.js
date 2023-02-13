import axios from 'axios'


const API = axios.create({ baseURL: 'http://localhost:5050' });

export const uploadImage = (data) => API.post("/upload/",data)

export const uploadVideo = (data) => API.post("/upload/video",data)

export const uploadPost = (data) => API.post('/post',data)