import axios from 'axios'


const API = axios.create({ baseURL: 'http://localhost:5050' });

export const logIn = (formData) => API.post('/auth/login', formData);

export const signUp = (formData) => API.post('/auth/register', formData);

export const verifyOtp = (userId, otp) => API.post('/auth/verifyotp', { userId: userId, otp: otp })

export const resendotp = (email, userId) => API.post('/auth/resendotp', { email: email, userId: userId })

export const adminLogin = (formData) => API.post('/auth/adminLogin', formData);

export const resetPass = (email) => API.post('/auth/forgotpassword', { email: email })

export const resetPassword = (token, password) => API.put('/auth/resetPasswordForm', { token: token, password: password })

export const updatePassword = (id, formData) => API.post(`/auth/updatepass/${id}`, formData)