import db from '../db'
import { format } from 'date-fns'

export default class EventRepository {
    async fetchEventTypes(): Promise<any | undefined> {
        const types = await db.eventType.findMany()
        return types
    }

    async fetchAllEventsByTeam(teamId: number | undefined): Promise<any | undefined> {
        const events = await db.event.findMany({
            where: {
                teamId: {
                    equals: teamId
                }
            },
            include: {
                type: true,
                team: true
            },
            orderBy: [{
                date: 'asc'
            }]
        })

        return events.map((event) => ({
            ...event,
            date: event.date ? format(event.date, 'd MMM yyyy, HH:mm') : null
        }))
    }

    async create(typeId: number, teamId: number, opponent: string, date: Date, location: string, duration: number): Promise<any> {
        if (!teamId || !typeId)
            return null

        const event = await db.event.create({ data: { typeId, teamId, opponent, date, location, duration }})

        return event
    }

    async update(id: number, typeId: number, opponent: string, date: Date, location: string, duration: number): Promise<any> {
        const event = await db.event.update({ where: { id }, data: { typeId, opponent, date, location, duration }})

        return event
    }

    async delete(id: number): Promise<any> {
        const result = await db.event.delete({ where: { id }})

        return result
    }
}