import { apiClient } from './apiClient'

export const fetchTrainingItems = (teamId: number, scheduleId: number) => apiClient(`/api/team/${teamId}/schedule/${scheduleId}/training`)

export const createTrainingItem = (teamId: number, scheduleId: number, data: any) =>
    apiClient(`/api/team/${teamId}/schedule/${scheduleId}/training`, {
        method: 'POST',
        body: JSON.stringify(data)
})

export const updateTrainingItem = (teamId: number, scheduleId: number, id: number, data: any) =>
    apiClient(`/api/team/${teamId}/schedule//${scheduleId}/training/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data)
})