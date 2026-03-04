import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

const api = axios.create({ baseURL: BASE_URL })

export const getStudents = () => api.get('/api/students').then(r => r.data)
export const getStudent = (id) => api.get(`/api/students/${id}`).then(r => r.data)
export const getClustering = () => api.get('/api/clustering').then(r => r.data)
export const getPredictions = () => api.get('/api/predictions').then(r => r.data)
export const predictStudent = (data) => api.post('/api/predict', data).then(r => r.data)
export const getCorrelation = () => api.get('/api/correlation').then(r => r.data)

export default api
