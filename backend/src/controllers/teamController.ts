import TeamRepository from '../repository/teamRepository'
import TeamMemberRepository from '../repository/teamMemberRepository'
import { ITeam, IUser } from '../utils/constants'
import Boom from '@hapi/boom'
import { controllerWrapper } from '../utils/controllerWrapper'

const teamRepository = new TeamRepository()
const teamMemberRepository = new TeamMemberRepository()

export const fetchTeamsList = controllerWrapper(async (request) => {
    let { id } = <IUser>request.auth.credentials.user
    const teams = await teamRepository.fetchAllTeamsByCoordinator(id)

    return teams.map((team: any) => ({
        ...team,
        members: team.members.map((member: any) => ({
            ...member,
            positions: JSON.parse(member.positions)
        }))
    }))
})

export const create = controllerWrapper(async (request) => {
    const { name, coach, members } = <ITeam>request.payload
    let { id } = <IUser>request.auth.credentials.user
    const team = await teamRepository.create(1, name, coach || '', id)
    if (!team || !team.id)
        throw Boom.badRequest('An error occurred while creating the Team')

    await alterTeamMembers(id, team.id, members)

    return team
})

export const update = controllerWrapper(async (request) => {
    let { id } = <IUser>request.auth.credentials.user
    let teamId: number = Number(request.params.teamId | 0)
    const { name, coach, members } = <ITeam>request.payload
    const team = await teamRepository.update(teamId, name, coach || '', id)
    if (!team || !team.id)
        throw Boom.badRequest('An error occurred while updating the Team')

    await alterTeamMembers(id, teamId, members)

    return team
})

async function alterTeamMembers(id: number | undefined, teamId: number, members: any) {
    if (!members || members.length === 0) {
        teamMemberRepository.fetchAllTeamMembersByTeam(teamId)
    } else if (id) {
        const savedMembers = await teamMemberRepository.fetchAllTeamMembersByTeam(id || 0)
        const removals = savedMembers.map((obj: any) => <number>obj.id).filter((id: number) => members.map((obj: any) => <number>obj.id).indexOf(id) < 0)
        const additions = members.filter((member: any) => !member.id)
        const updates = members.filter((member: any) => member.id)
        additions.forEach(async (member: any) => {
            await teamMemberRepository.create(teamId, member.name, JSON.stringify(member.positions))
        })
        updates.forEach(async (member: any) => {
            await teamMemberRepository.update(member.id, teamId, member.name, JSON.stringify(member.positions))
        })
        removals.forEach(async (id: number) => {
            await teamMemberRepository.delete(id)
        })
    }
}