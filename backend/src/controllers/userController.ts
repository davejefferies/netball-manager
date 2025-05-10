import Boom from '@hapi/boom'
import UserRepository from '../repository/userRepository'
import { compareHash, generateSalt, generateHash } from '../utils/bcrypt'
import { createAccessToken, createRefreshToken, validateRefreshToken } from '../utils/jwt'
import { IUser, IRefreshToken } from '../utils/constants'
import { controllerWrapper } from '../utils/controllerWrapper'

const userRepository = new UserRepository()

export const doRegister = controllerWrapper(async (request) => {
    const { firstName, lastName, email, password, roleId } = <IUser>request.payload
    const userExists = await userRepository.findByEmail(email)

    if (userExists)
        return Boom.conflict(`Email is already being used`)
    else {
        const salt = generateSalt(10)
        const hash = generateHash(password, salt)
        const newUser = await userRepository.create(firstName, lastName, email, hash, roleId)
        delete newUser.password
        const token = createAccessToken(newUser)
        return {
            user: newUser,
            token
        }
    }
})

export const doLogin = controllerWrapper(async (request) => {
    const { email, password } = <IUser>request.payload
    const userExists = await userRepository.findByEmail(email)
        if (!userExists)
            return Boom.notFound('Email Does Not Exist')
        else {
            const isMatch = compareHash(password, userExists.password)
            if (!isMatch)
                return Boom.conflict('Password Does Not Match')

            delete userExists.password
            const token = createAccessToken(userExists)
            const refreshToken = createRefreshToken(userExists)
            return {
                user: userExists,
                token,
                refreshToken
            }
        }
})

export const doTokenRefresh = controllerWrapper(async (request) => {
    let { refreshToken } = <IRefreshToken>request.payload
    const decoded = validateRefreshToken(refreshToken)
    if (!decoded)
        throw Boom.unauthorized('Token Expired')
    const user: any = decoded
    delete user.iat
    delete user.exp

    const token = createAccessToken(<IUser>user)
    refreshToken = createRefreshToken(<IUser>user)
    return {
        user: decoded,
        token,
        refreshToken
    }
})

export const fetchUserList = controllerWrapper(async () => {
    return await userRepository.fetchAllUser()
})