import React from 'react'
import { IonHeader, IonToolbar, IonBackButton, IonButtons, IonTitle } from '@ionic/react'

export const AppHeader: React.FC<{
    title?: string
    hasBackButton?: boolean
}> = ({
    title = "",
    hasBackButton = false
}) => {

    return (
        <IonHeader>
            <IonToolbar>
                {
                    hasBackButton &&
                    <IonButtons slot="start">
                        <IonBackButton />
                    </IonButtons>
                }
                {
                    !title ? (
                        <div className="fit-parent flex-row" style={{ position: 'relative' }}>
                            <div className="fit-parent flex-row flex center-a center-b" style={{ position: 'absolute' }}>
                                <img src="/assets/logo.png" style={{ width: '200px' }} />
                            </div>
                        </div>
                    ) : (
                        <IonTitle> { title } </IonTitle>
                    )
                }
            </IonToolbar>
        </IonHeader>
    )
}