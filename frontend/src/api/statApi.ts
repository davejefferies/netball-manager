import { apiClient } from './apiClient'

export const fetchStatTypes = () => apiClient('/api/stat/type')