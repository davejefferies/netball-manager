import SportRepository from '../repository/sportRepository'
import SportPositionRepository from '../repository/sportPositionRepository'
import { controllerWrapper } from '../utils/controllerWrapper'

const sportRepository = new SportRepository()
const sportPositionRepository = new SportPositionRepository()

export const fetchSportList = controllerWrapper(async () => {
    return await sportRepository.fetchAll()
})

export const fetchSportPositionList = controllerWrapper(async (request) => {
    let sportId: number = Number(request.params.sportId | 0)
    return await sportPositionRepository.fetchBySportId(sportId)
})

export const fetchSportPositionListBySportEvent = controllerWrapper(async (request) => {
    let sportId: number = Number(request.params.sportId | 0)
    let eventId: number = Number(request.params.eventId | 0)
    const positions = await sportPositionRepository.fetchPositionsBySportEvent(sportId, eventId)

    if (positions) {
        positions.forEach((position: any) => {
            if (position.eventPlayers && position.eventPlayers.length) {
                const player: any = position.eventPlayers[position.eventPlayers.length - 1]
                position.playerId = player.id
                position.playerName = player.player.name
            }
        })
    }

    return positions
})

export const fetchSportStatItems = controllerWrapper(async (request) => {
    let sportId: number = Number(request.params.sportId | 0)
    return await sportRepository.fetchSportStatTypes(sportId)
})