import { apiClient } from './apiClient'

export const fetchEventTypes = () => apiClient('/api/event/types')
export const fetchEvents = (teamId: number) => apiClient(`/api/team/${teamId}/event`)

export const createEvent = (teamId: number, data: any) =>
    apiClient(`/api/team/${teamId}/event`, {
        method: 'POST',
        body: JSON.stringify(data)
})

export const updateEvent = (teamId: number, id: number, data: any) =>
    apiClient(`/api/team/${teamId}/event/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data)
})