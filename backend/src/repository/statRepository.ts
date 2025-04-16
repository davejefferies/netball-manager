import db from '../db'

export default class StatRepository {
    async fetchStatTypes(): Promise<any | undefined> {
        const result = await db.statType.findMany()

        return result
    }
}