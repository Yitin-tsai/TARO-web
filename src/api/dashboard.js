import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '',
  timeout: 15000,
})

export function fetchDashboard(lat, lng) {
  return api.get('/api/dashboard', { params: { lat, lng } }).then(res => res.data)
}
