import React, { createContext, useContext, useState, ReactNode } from 'react';

import { ModalType } from '../modals'

type ModalState = {
    type: ModalType | null
    props?: Record<string, any>
}

type ModalContextType = {
    modal: ModalState;
    openModal: (type: ModalType, props?: Record<string, any>) => void;
    closeModal: () => void;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
    const [modal, setModal] = useState<ModalState>({ type: null });

    const openModal = (type: ModalType, props?: Record<string, any>) => {
        setModal({ type, props });
    };

    const closeModal = () => setModal({ type: null });

    return (
        <ModalContext.Provider value={{ modal, openModal, closeModal }}>
            {children}
        </ModalContext.Provider>
    );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) throw new Error('useModal must be used within ModalProvider');
  return context;
};
