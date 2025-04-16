import { Request, ResponseToolkit, ResponseObject } from '@hapi/hapi'
import StatRepository from '../repository/statRepository'

const statRepository = new StatRepository()

export async function fetchStatType(
    request: Request,
    h: ResponseToolkit
): Promise<ResponseObject> {
    try {
        const types = await statRepository.fetchStatTypes()

        return h
            .response({
                data: types,
                message: 'success',
                status: 200,
            })
            .code(200)
    } catch (error) {
        return h
            .response({ message: 'Oops!! Something Went Wrong', status: 500 })
            .code(500)
  }
}