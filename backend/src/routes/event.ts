import { ServerRoute } from '@hapi/hapi'
import {
    fetchEventTypes,
    fetchEvents,
    create,
    update,
    assignEventPlayer,
    createEventLogItem,
    fetchEventLogByEvent
} from '../controllers/eventController'

const scheduleRoutes: ServerRoute[] = [
    {
        method: 'GET',
        path: '/event/types',
        options: {
            auth: 'token',
            handler: fetchEventTypes
        }
    },
    {
        method: 'GET',
        path: '/team/{teamId}/event',
        options: {
            auth: 'token',
            handler: fetchEvents
        }
    },
    {
        method: 'POST',
        path: '/team/{teamId}/event',
        options: {
            auth: 'token',
            handler: create
        }
    },
    {
        method: 'PUT',
        path: '/team/{teamId}/event/{id}',
        options: {
            auth: 'token',
            handler: update
        }
    },
    {
        method: 'POST',
        path: '/team/{teamId}/event/{eventId}/player',
        options: {
            auth: 'token',
            handler: assignEventPlayer
        }
    },
    {
        method: 'POST',
        path: '/team/{teamId}/event/{eventId}/log',
        options: {
            auth: 'token',
            handler: createEventLogItem
        }
    },
    {
        method: 'GET',
        path: '/team/{teamId}/event/{eventId}/log',
        options: {
            auth: 'token',
            handler: fetchEventLogByEvent
        }
    }
]

export default scheduleRoutes