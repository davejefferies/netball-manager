import { Request } from '@hapi/hapi'
import Boom from '@hapi/boom'
import { Event, EventLog, EventPlayer, EventType } from '@prisma/client'
import EventRepository from '../repository/eventRepository'
import { controllerWrapper } from '../utils/controllerWrapper'

const eventRepository = new EventRepository()

export const fetchEventTypes = controllerWrapper(async () => {
    return await eventRepository.fetchEventTypes()
})

export const fetchEvents = controllerWrapper(async (request: Request) => {
    const teamId: number = Number(request.params.teamId || 0)
    const events = await eventRepository.fetchAllEventsByTeam(teamId)
    const processedEvents: any = []
    events.forEach(async (event: any) => {
        let {eventLogs, ...result} = event
        if (!eventLogs) eventLogs = []
        result.homeScore = eventLogs.filter((item: any) => item.code.code === 'P').length
        result.awayScore = eventLogs.filter((item: any) => item.code.code === 'PO').length
        result.quarter = eventLogs.filter((item: any) => item.code.code === 'GE').length + 1
        result.completed = !!eventLogs.filter((item: any) => item.code.code === 'GC').length
        processedEvents.push(result)
    })
    return processedEvents
})

export const create = controllerWrapper(async (request: Request) => {
    const teamId: number = Number(request.params.teamId || 0)
    const { type, opponent, date, location, duration } = request.payload as any

    const result = await eventRepository.create(type, teamId, opponent, date, location, duration)
    if (!result?.id) throw Boom.badRequest('An error occurred while creating the Schedule')

    return result
})

export const update = controllerWrapper(async (request: Request) => {
    const id: number = Number(request.params.id || 0)
    const { typeId, opponent, date, location, duration } = request.payload as any

    const result = await eventRepository.update(id, typeId, opponent, date, location, duration)
    if (!result?.id) throw Boom.badRequest('An error occurred while updating the Schedule')

    return result
})

export const assignEventPlayer = controllerWrapper(async (request: Request) => {
    const eventId: number = Number(request.params.eventId || 0)
    const { position, player } = request.payload as any
    const result = await eventRepository.assignPlayer(eventId, position, player)

    if (!result?.id) throw Boom.badRequest('An error occurred while assigning the player to a position.')

    return result
})

export const createEventLogItem = controllerWrapper(async (request: Request) => {
    const eventId: number = Number(request.params.eventId || 0)
    const { codeId, positionId, playerId, period, away } = request.payload as any
    const result = await eventRepository.addEventLog(eventId, codeId, period, away, positionId, playerId)

    if (!result?.id) throw Boom.badRequest('An error occurred while add to the event log.')

    return result
})

export const fetchEventLogByEvent = controllerWrapper(async (request: Request) => {
    const eventId: number = Number(request.params.eventId || 0)
    return await eventRepository.fetchEventLogByEvent(eventId)
})