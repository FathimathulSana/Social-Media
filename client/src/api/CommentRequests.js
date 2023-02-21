import axios from 'axios'


const API = axios.create({ baseURL: 'http://localhost:5050' });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("profile")).token
      }`;
  } else {
    localStorage.clear();
  }
  return req;
});

export const createComment = (postId, comment, userId) => {

  return API.post(`/comment/${postId}`, { comment, userId });
}
export const getComments = (postId) => API.get(`/comment/${postId}`);

export const deleteComment = (commentId) => {
  return API.delete(`/comment/${commentId}`);
}

export const editComment = (commentId, data) => API.post(`/comment/edit/comment`, data)