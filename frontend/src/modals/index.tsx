import AssignPlayerModal from './AssignPlayerModal'
import PauseMatchModal from './PauseMatchModal'
import ScoreAdjusterModal from './ScoreAdjusterModal'

export type BaseModalProps = {
    visible: boolean
    onClose: () => void
    [key: string]: any
}

export const modalMap = {
    assignPlayer: AssignPlayerModal,
    pauseMatch: PauseMatchModal,
    scoreAdjuster: ScoreAdjusterModal
} as const

export type ModalType = keyof typeof modalMap