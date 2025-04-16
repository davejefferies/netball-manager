import { ServerRoute } from '@hapi/hapi'
import Joi from 'joi'
import {
    fetchEventTypes,
    fetchEvents,
    create,
    update
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
    }
]

export default scheduleRoutes