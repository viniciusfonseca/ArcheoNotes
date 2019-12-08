import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';

const Home: React.FC = () => {

    

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <div className="fit-parent flex-row center-a center-b">
                        <img src="/assets/logo.png" style={{ width: '200px' }} />
                    </div>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">

            </IonContent>
        </IonPage>
    );
};

export default Home;
