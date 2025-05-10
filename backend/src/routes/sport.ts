import { ServerRoute } from '@hapi/hapi'
import {
    fetchSportList,
    fetchSportPositionList,
    fetchSportPositionListBySportEvent,
    fetchSportStatItems
} from '../controllers/sportController'

const sportRoutes: ServerRoute[] = [
    {
        method: 'GET',
        path: '/sport',
        options: {
            auth: 'token',
            handler: fetchSportList
        }
    }, 
    {
        method: 'GET',
        path: '/sport/{sportId}/position',
        options: {
            auth: 'token',
            handler: fetchSportPositionList
        }
    }, 
    {
        method: 'GET',
        path: '/sport/{sportId}/event/{eventId}/position',
        options: {
            auth: 'token',
            handler: fetchSportPositionListBySportEvent
        }
    },
    {
        method: 'GET',
        path: '/sport/{sportId}/stat',
        options: {
            auth: 'token',
            handler: fetchSportStatItems
        }
    }
]


export default sportRoutes