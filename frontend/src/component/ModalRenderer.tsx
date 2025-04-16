import React from 'react'
import { useModal } from '../context/ModalContext'
import { modalMap } from '../modals'
import type { BaseModalProps } from '../modals'

const ModalRenderer = () => {
    const { modal, closeModal } = useModal()

    if (!modal.type) return null

    const ComponentToRender = modalMap[modal.type] as React.FC<BaseModalProps>

    return (
        <ComponentToRender
          visible
          onClose={closeModal}
          {...modal.props}
        />
    )
}

export default ModalRenderer
