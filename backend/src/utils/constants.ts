export interface IUser {
    id?: number
    firstName: string
    lastName: string
    email: string
    password: string
    roleId: number
    createdAt?: Date
}

export interface ITeam {
    id?: number
    name: string
    coach?: string
    coordinatorId?: number
    members?: any
}

export interface IRefreshToken {
    refreshToken: string
}

export function formatNumber(num: Number) {
    return Number.isInteger(num) ? num : Number(num.toFixed(2));
}