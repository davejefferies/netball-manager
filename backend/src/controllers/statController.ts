import { Request } from '@hapi/hapi'
import { controllerWrapper } from '../utils/controllerWrapper'
import EventRepository from '../repository/eventRepository'

const eventRepository = new EventRepository()

export const fetchScoringStats = controllerWrapper(async (request: Request) => {
    const eventId: number = Number(request.params.eventId || 0)
    const logItems = await eventRepository.fetchEventLogByEvent(eventId)
    const periods = 4
    const points = logItems.filter((item: any) => item.code.code === 'P')
    const oppositionPoints = logItems.filter((item: any) => item.code.code === 'PO')
    return {
        headers: ['Name', ...Array.from({ length: periods }).map((p: any, i: number) => 'Q' + (i + 1)), 'Total'],
        rows: [
            [
                'Us',
                ...Array.from({ length: periods }).map((p: any, i: number) => points.filter((point: any) => point.period === i + 1).length),
                points.length
            ],
            [
                'Them',
                ...Array.from({ length: periods }).map((p: any, i: number) => oppositionPoints.filter((point: any) => point.period === i + 1).length),
                oppositionPoints.length
            ]
        ]
    }
})

export const fetchShootingStats = controllerWrapper(async (request: Request) => {
    const result: any = {
        headers: [],
        rows: []
    }
    const eventId: number = Number(request.params.eventId || 0)
    const logItems = await eventRepository.fetchEventLogByEvent(eventId)
    const shooters = logItems.filter((item: any) => item.code.code === 'PS' && (item.position.code === 'GS' || item.position.code === 'GA'))
    .reduce((unique: any[], item: any) => {
        const alreadyAdded = unique.some(d => d.player.id === item.player.id)
        if (!alreadyAdded) unique.push(item)
        return unique
    }, [])
    const points = logItems.filter((item: any) => item.code.code === 'P')
    const miss = logItems.filter((item: any) => item.code.code === 'M')
    const periods = 4
    result.headers = ['Name', ...Array.from({ length: periods }).map((p: any, i: number) => 'Q' + (i + 1)), 'Total']
    shooters.forEach((shooter: any) => {
        const pers: any = []
        for (let i = 1; i <= periods; i++) {
            const goals = points.filter(point => point.playerId === shooter.playerId && point.period === i).length
            const misses = miss.filter(miss => miss.playerId === shooter.playerId && miss.period === i).length
            pers.push({
                period: i,
                goals,
                misses,
                total: goals + misses,
                percentage: goals ? ((goals / (goals + misses)) * 100) + '%' : '0%'
            })
        }
        const goals = pers.reduce((total: number, p: any) => total + p.goals, 0)
        const misses = pers.reduce((total: number, p: any) => total + p.misses, 0)
        result.rows.push([
            shooter.player.name,
            ...Array.from({ length: periods }).map((p: any, index: number) => {
                let found = pers.find((period: any) => period.period === index + 1)
                if (found)
                    return `${found.goals}/${found.total} (${found.percentage})`
                return `0/0 (0%)`
            }),
            goals ? `${goals}/${(goals + misses)} (${((goals / (goals + misses)) * 100)}%)` : '0%'
        ])
    })
    return result
})

export const fetchReboundStats = controllerWrapper(async (request: Request) => {
    const periods = 4
    const eventId: number = Number(request.params.eventId || 0)
    const logItems = await eventRepository.fetchEventLogByEvent(eventId)
    const defenders = logItems.filter((item: any) => item.code.code === 'PS' && (item.position.code === 'GD' || item.position.code === 'GK'))
    .reduce((unique: any[], item: any) => {
        const alreadyAdded = unique.some(d => d.player.id === item.player.id)
        if (!alreadyAdded) unique.push(item)
        return unique
    }, [])
    const result: any = {
        headers: ['Name', ...Array.from({ length: periods }).map((p: any, i: number) => 'Q' + (i + 1)), 'Total'],
        rows: []
    }
    const gained = logItems.filter((item: any) => item.code.code === 'R')
    const lost = logItems.filter((item: any) => item.code.code === 'LR')

    defenders.forEach((defender: any) => {
        const pers: any = []
        for (let i = 1; i <= periods; i++) {
            const gains = gained.filter(gain => gain.playerId === defender.playerId && gain.period === i).length
            const losses = lost.filter(loss => loss.playerId === defender.playerId && loss.period === i).length
            pers.push({
                period: i,
                gains,
                losses,
                total: gains + losses,
                percentage: gains ? ((gains / (gains + losses)) * 100) + '%' : '0%'
            })
        }
        const totalGains = pers.reduce((total: number, p: any) => total + p.gains, 0)
        const totalLosses = pers.reduce((total: number, p: any) => total + p.losses, 0)
        result.rows.push([
            defender.player.name,
            ...Array.from({ length: periods }).map((p: any, index: number) => {
                let found = pers.find((period: any) => period.period === index + 1)
                if (found)
                    return `${found.gains}/${found.total} (${found.percentage})`
                return `0/0 (0%)`
            }),
            totalGains ? `${totalGains}/${(totalGains + totalLosses)} (${((totalGains / (totalGains + totalLosses)) * 100)}%)` : '0%'
        ])
    })

    return result
})