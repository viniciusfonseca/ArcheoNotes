import React from 'react'
import { IonSpinner } from '@ionic/react'

export const LoadingContainer: React.FC<{
    loading?: boolean,
    children: JSX.Element
}> = ({
    loading = false,
    children
}) => {

    if (loading) {
        return (
            <div className="flex-row center-a center-b">
                <IonSpinner name="circles" />
            </div>
        )
    }

    return children
}