import { ServerRoute } from '@hapi/hapi'
import Joi from 'joi'
import {
    fetchTeamsList,
    create,
    update
} from '../controllers/teamController'

const teamRoutes: ServerRoute[] = [
    {
        method: 'GET',
        path: '/team',
        options: {
            auth: 'token',
            handler: fetchTeamsList
        }
    },
    {
        method: 'POST',
        path: '/team',
        options: {
            auth: 'token',
            handler: create,
            validate: {
                payload: Joi.object({
                    name: Joi.string().required()
                })
            }
        }
    },
    {
        method: 'PUT',
        path: '/team/{teamId}',
        options: {
            auth: 'token',
            handler: update
        }
    }
]

export default teamRoutes