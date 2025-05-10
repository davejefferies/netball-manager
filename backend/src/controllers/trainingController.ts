import TrainingRepository from '../repository/trainingRepository'
import Boom from '@hapi/boom'
import { controllerWrapper } from '../utils/controllerWrapper'

const trainingRepository = new TrainingRepository()

export const fetchTrainingItems = controllerWrapper(async (request) => {
    let scheduleId: number = Number(request.params.scheduleId | 0)
    return await trainingRepository.fetchTrainingItemsByScheduleId(scheduleId)
})

export const create = controllerWrapper(async (request) => {
    let scheduleId: number = Number(request.params.scheduleId | 0)
    const { name, duration, notes } = <any>request.payload

    const result = await trainingRepository.create(scheduleId, name, duration, notes)
    if (!result || !result.id)
        throw Boom.badRequest('An error occurred while adding a Training Item')

    return result
})

export const update = controllerWrapper(async (request) => {
    let id: number = Number(request.params.id | 0)
    const { name, duration, notes } = <any>request.payload
    const result = await trainingRepository.update(id, name, duration, notes)
    if (!result || !result.id)
        throw Boom.badRequest('An error occurred while updating a Training item')

    return result
})