import { ServerRoute } from '@hapi/hapi'
import {
    fetchShootingStats,
    fetchScoringStats,
    fetchReboundStats
} from '../controllers/statController'

const statRoutes: ServerRoute[] = [
    {
        method: 'GET',
        path: '/team/{teamId}/event/{eventId}/stats/score',
        options: {
            auth: 'token',
            handler: fetchScoringStats
        }
    },
    {
        method: 'GET',
        path: '/team/{teamId}/event/{eventId}/stats/shooting',
        options: {
            auth: 'token',
            handler: fetchShootingStats
        }
    },
    {
        method: 'GET',
        path: '/team/{teamId}/event/{eventId}/stats/rebound',
        options: {
            auth: 'token',
            handler: fetchReboundStats
        }
    }
]


export default statRoutes