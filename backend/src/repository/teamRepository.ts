import db from '../db'

export default class TeamRepository {
    async fetchAllTeamsByCoordinator(coordinatorId: number | undefined): Promise<any | undefined> {
        const teams = await db.team.findMany({
            where: {
                coordinatorId: {
                    equals: coordinatorId
                }
            },
            include: {
                sport: true,
                coordinator: true,
                members: true
            }
        })

        return teams
    } 

    async create(sportId: number, name: string, coach: string, coordinatorId: number | undefined): Promise<any> {
        if (!coordinatorId)
            return null
        const team = await db.team.create({ data: { sportId, name, coach, coordinatorId }})

        return team
    }

    async update(id: number, name: string, coach: string, coordinatorId: number | undefined): Promise<any> {
        const team = await db.team.update({ where: { id }, data: { name, coach, coordinatorId }})

        return team
    }

    async delete(id: number): Promise<any> {
        const result = await db.team.delete({ where: { id }})

        return result
    }
}