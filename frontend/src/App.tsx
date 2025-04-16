import React from 'react'
import RootNavigator from './navigation/RootNavigator'
import { AuthProvider } from './context/AuthContext'
import { ModalProvider } from './context/ModalContext'
import ModalRenderer from './component/ModalRenderer'

export default function App() {
    return (
        <ModalProvider>
            <AuthProvider>
                <RootNavigator />
                <ModalRenderer />
            </AuthProvider>
        </ModalProvider>
    )
}
