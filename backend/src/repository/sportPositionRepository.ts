import db from '../db'

export default class SportPositionRepository {
    async fetchBySportId(id: number): Promise<any | undefined> {
        const positions = await db.sportPosition.findMany({
            where: {
                sportId: {
                    equals: id
                }
            },
            relationLoadStrategy: 'join',
            include: {
                sport: true
            }
        })

        return positions
    }

    async fetchPositionsBySportEvent(id: number, eventId: number) {
        const positions = await db.sportPosition.findMany({
            where: {
                sportId: {
                    equals: id
                }
            },
            relationLoadStrategy: 'join',
            include: {
                sport: true,
                eventPlayers: {
                    where: {
                        eventId: {
                            equals: eventId
                        }
                    },
                    include: {
                        player: true
                    }
                }
            }
        })

        return positions
    }
}
