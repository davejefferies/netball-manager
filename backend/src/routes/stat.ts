import { ServerRoute } from '@hapi/hapi'
import Joi from 'joi'
import {
    fetchStatType
} from '../controllers/statController'

const statRoutes: ServerRoute[] = [
    {
        method: 'GET',
        path: '/stat/type',
        options: {
            auth: 'token',
            handler: fetchStatType
        }
    }
]


export default statRoutes