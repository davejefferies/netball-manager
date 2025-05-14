import { Request } from '@hapi/hapi'
import { controllerWrapper } from '../utils/controllerWrapper'
import EventRepository from '../repository/eventRepository'

const eventRepository = new EventRepository()
const periods = 4

async function splitArrayByPeriod(eventId: number) {
    const logItems = await eventRepository.fetchEventLogByEvent(eventId)
    const positions = logItems.filter((item: any) => item.code.code === 'PS' && item.positionId)
    logItems.filter((item: any) => !item.playerId && item.code.code !== 'PS').forEach((item: any) => {
        const list = positions.filter((pos: any) => pos.positionId === item.positionId && pos.createdAt < item.createdAt)
        if (list.length) {
            const found = list[list.length - 1]
            item.playerId = found.playerId
            item.player - item.player
        }
    })
    const periods = logItems.reduce((acc: any, curr: any) => {
        if (curr.code.code === 'GE')
            acc.push([])
        else
            acc[acc.length - 1].push(curr)
        return acc
    }, [[]])

    return periods
}

export const fetchScoringStats = controllerWrapper(async (request: Request) => {
    const eventId: number = Number(request.params.eventId || 0)
    const items: any = await splitArrayByPeriod(eventId)
    return {
        headers: [
            'Name', 
            ...Array.from({ length: items.length }).map((p: any, i: number) => 'Q' + (i + 1)), 
            'Total'
        ],
        rows: [
            [
                'Us',
                ...Array.from({ length: items.length }).map((P: any, i: number) => items[i].filter((item: any) => item.code.code === 'P').length),
                Array.from({ length: items.length }).map((P: any, i: number) => items[i].filter((item: any) => item.code.code === 'P').length).reduce((acc, val) => acc + val, 0)
            ],
            [
                'Them',
                ...Array.from({ length: items.length }).map((P: any, i: number) => items[i].filter((item: any) => item.code.code === 'PO').length),
                Array.from({ length: items.length }).map((P: any, i: number) => items[i].filter((item: any) => item.code.code === 'PO').length).reduce((acc, val) => acc + val, 0)
            ]
        ]
    }
})

export const fetchShootingStats = controllerWrapper(async (request: Request) => {
    const eventId: number = Number(request.params.eventId || 0)
    const items: any = await splitArrayByPeriod(eventId)
    const rows: any = []
    const shooters = Array.from({ length: items.length }).map((P: any, i: number) => 
        items[i].filter((item: any) => item.code.code === 'PS' && (item.position.code === 'GS' || item.position.code === 'GA'))).flat()
    .reduce((unique: any[], item: any) => {
        const alreadyAdded = unique.some(d => d.player.id === item.player.id)
        if (!alreadyAdded) unique.push(item)
        return unique
    }, [])
    
    shooters.forEach((shooter: any) => {
        const line: string[] = [
            shooter.player.name
        ]
        const totals = {
            goals: 0,
            missed: 0
        }
        items.forEach((period: any) => {
            const goals = period.filter((p: any) => p.code.code === 'P' && p.playerId === shooter.playerId).length
            const missed = period.filter((p: any) => p.code.code === 'M' && p.playerId === shooter.playerId).length
            totals.goals = totals.goals + goals
            totals.missed = totals.missed + missed
            line.push(`${goals}/${goals + missed} (${goals ? Math.round((goals / (goals + missed)) * 100) : 0}%)`)
        })
        line.push(`${totals.goals}/${totals.goals + totals.missed} (${totals.goals ? Math.round((totals.goals / (totals.goals + totals.missed)) * 100) : 0}%)`)
        rows.push(line)
    })

    return {
        headers: [
            'Name', 
            ...Array.from({ length: items.length }).map((p: any, i: number) => 'Q' + (i + 1)), 
            'Total'
        ],
        rows
    }
})

export const fetchReboundStats = controllerWrapper(async (request: Request) => {
    const eventId: number = Number(request.params.eventId || 0)
    const items: any = await splitArrayByPeriod(eventId)
    const rows: any = []
    const defenders = Array.from({ length: items.length }).map((P: any, i: number) => 
        items[i].filter((item: any) => item.code.code === 'PS' && (item.position.code === 'GK' || item.position.code === 'GD'))).flat()

    defenders.forEach((defender: any) => {
        const line: string[] = [
            defender.player.name
        ]
        const totals = {
            gains: 0,
            loses: 0
        }

        items.forEach((period: any) => {
            const gains = period.filter((p: any) => p.code.code === 'R' && p.playerId === defender.playerId).length
            const loses = period.filter((p: any) => p.code.code === 'LR' && p.playerId === defender.playerId).length
            totals.gains = totals.gains + gains
            totals.loses = totals.loses + loses
            line.push(`${gains}/${gains + loses} (${gains ? Math.round((gains / (gains + loses)) * 100) : 0}%)`)
        })
        line.push(`${totals.gains}/${totals.gains + totals.loses} (${totals.gains ? Math.round((totals.gains / (totals.gains + totals.loses)) * 100) : 0}%)`)
        rows.push(line)
    })

    return {
        headers: [
            'Name', 
            ...Array.from({ length: items.length }).map((p: any, i: number) => 'Q' + (i + 1)), 
            'Total'
        ],
        rows
    }
})