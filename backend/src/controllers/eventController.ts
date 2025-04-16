import Boom from '@hapi/boom'
import EventRepository from '../repository/eventRepository'
import { controllerWrapper } from '../utils/controllerWrapper'

const eventRepository = new EventRepository()

export const fetchEventTypes = controllerWrapper(async () => {
    return await eventRepository.fetchEventTypes()
})

export const fetchEvents = controllerWrapper(async (request) => {
    const teamId = Number(request.params.teamId || 0)
    return await eventRepository.fetchAllEventsByTeam(teamId)
})

export const create = controllerWrapper(async (request) => {
    const teamId = Number(request.params.teamId || 0)
    const { type, opponent, date, location, duration, frequencyId, endDate } = request.payload as any

    const result = await eventRepository.create(type, teamId, opponent, date, location, duration)
    if (!result?.id) throw Boom.badRequest('An error occurred while creating the Schedule')

    return result
})

export const update = controllerWrapper(async (request) => {
    const id = Number(request.params.id || 0)
    const { typeId, opponent, date, location, duration, frequencyId, endDate } = request.payload as any

    const result = await eventRepository.update(id, typeId, opponent, date, location, duration)
    if (!result?.id) throw Boom.badRequest('An error occurred while updating the Schedule')

    return result
})
