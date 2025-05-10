import db from '../db'

export default class SportRepository {
    async fetchAll(): Promise<any | undefined> {
        const sports = await db.sport.findMany()

        return sports
    }

    async fetchSportStatTypes(sportId: number): Promise<any | undefined> {
        const legend = await db.sportStatType.findMany({
            where: {
                sportId: {
                    equals: sportId
                }
            }
        })

        return legend
    }
}