import { Request, ResponseToolkit, ResponseObject } from '@hapi/hapi'
import Boom from '@hapi/boom'

type HandlerFunction<T> = (request: Request, h: ResponseToolkit) => Promise<T>

export function controllerWrapper<T>(handler: HandlerFunction<T>) {
    return async (request: Request, h: ResponseToolkit): Promise<ResponseObject> => {
        try {
            const result = await handler(request, h)
            return h.response({
                data: result,
                message: 'success',
                status: 200
            }).code(200)
        } catch (error: any) {
            if (Boom.isBoom(error)) {
                throw error
            }
            return h.response({
                message: error?.message || 'Oops!! Something went wrong',
                status: 500
            }).code(500)
        }
    }
}
