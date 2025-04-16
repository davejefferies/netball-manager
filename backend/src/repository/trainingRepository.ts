import db from '../db'

export default class TrainingRepository {

    async fetchTrainingItemsByScheduleId(eventId: number | undefined): Promise<any | undefined> {
        const schedules = await db.trainingItem.findMany({
            where: {
                eventId: {
                    equals: eventId
                }
            },
            include: {
                event: true
            }
        })

        return schedules
    }

    async create(eventId: number, name: string, duration: number, notes: string): Promise<any> {
        if (!eventId)
            return null
        const result = await db.trainingItem.create({ data: { eventId, name, duration, notes }})

        return result
    }

    async update(id: number, name: string, duration: number, notes: string): Promise<any> {
        const result = await db.trainingItem.update({ where: { id }, data: { name, duration, notes }})

        return result
    }

    async delete(id: number): Promise<any> {
        const result = await db.trainingItem.delete({ where: { id }})

        return result
    }
}