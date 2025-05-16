import { Event, EventType, EventPlayer, EventLog } from '@prisma/client'
import db from '../db'
import { format } from 'date-fns'

export default class EventRepository {
    async fetchEventTypes(): Promise<EventType[] | undefined> {
        const types = await db.eventType.findMany()
        return types
    }

    async fetchAllEventsByTeam(teamId: number | undefined): Promise<any | undefined> {
        const events: Event[] = await db.event.findMany({
            where: {
                teamId: {
                    equals: teamId
                }
            },
            include: {
                type: true,
                team: true,
                eventLogs: {
                    include: {
                        event: true,
                        code: true,
                        position: true,
                        player: true
                    }
                }
            },
            orderBy: [{
                date: 'asc'
            }]
        })

        return events.map((event: Event) => ({
            ...event,
            date: event.date ? format(event.date, 'd MMM yyyy, HH:mm') : null
        }))
    }

    async create(typeId: number, teamId: number, opponent: string, date: Date, location: string, duration: number): Promise<Event | null> {
        if (!teamId || !typeId)
            return null

        const event = await db.event.create({ data: { typeId, teamId, opponent, date, location, duration }})

        return event
    }

    async update(id: number, typeId: number, opponent: string, date: Date, location: string, duration: number): Promise<Event> {
        const event: Event = await db.event.update({ where: { id }, data: { typeId, opponent, date, location, duration }})

        return event
    }

    async delete(id: number): Promise<Event> {
        const result = await db.event.delete({ where: { id }})

        return result
    }

    async assignPlayer(eventId: number, positionId: number, memberId: number): Promise<EventPlayer> {
        const result = await db.eventPlayer.create({ data: { eventId, positionId, memberId }})

        return result
    }

    async addEventLog(eventId: number, codeId: number, period: number, away: boolean | undefined, positionId: number | undefined, playerId: number | undefined): Promise<EventLog> {
        const payload: any = {
            eventId,
            codeId,
            period,
            away
        }
        if (positionId)
            payload.positionId = positionId
        if (playerId)
            payload.playerId = playerId
        if (away)
            payload.away = away
        const result = await db.eventLog.create({ data: payload})

        return result
    }

    async fetchEventLogByEvent(eventId: number): Promise<EventLog[]> {
        const items = db.eventLog.findMany({
            where: {
                eventId: {
                    equals: eventId
                }
            },
            include: {
                event: true,
                code: true,
                position: true,
                player: true
            },
            orderBy: [{
                createdAt: 'asc'
            }]
        })

        return items
    }
}