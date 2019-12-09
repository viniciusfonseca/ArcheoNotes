import React, { useEffect, ReactElement } from 'react';
import {
    IonContent,
    IonPage, IonFab,
    IonFabButton,
    IonIcon, IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonButton,
    IonRefresher,
    IonRefresherContent,
    IonSpinner,
    IonPopover,
    IonList,
    IonItem,
    IonAlert
} from '@ionic/react';
import { RefresherEventDetail } from '@ionic/core';
import { add, create, more } from 'ionicons/icons'
import { AppHeader } from '../components/AppHeader';
import { useAsyncState } from '../core/useAsyncState';
import { api } from '../core/api';
import { LoadingContainer } from '../components/LoadingContainer';
import { Note } from '../types/Note';
import { useHistory } from 'react-router';
import { useAppContext } from '../core/AppContext';
import { useObjectState } from '../core/useObjectState';
import { presentToast } from '../core/presentToast';

const Home: React.FC = () => {

    const { notes, setAppState } = useAppContext()

    useEffect(() => {
        fetchNotes()
    }, [])

    async function fetchNotes() {
        try {
            setState({ loading: true })
            const { data } = await api.get(`/notes`, { params: { count: 10000 } })
            setAppState({ notes: data })
            setState({ loading: false })
        }
        catch (e) {
        }
    }

    const [ getState, setState ] = useObjectState({
        loading: true,
        showActionsPopover: false,
        showDeleteAlert: false,
        noteIdAction: -1,
        popoverEvent: new MouseEvent("empty")
    })

    const {
        loading,
        showActionsPopover,
        noteIdAction,
        popoverEvent,
        showDeleteAlert
    } = getState()

    const history = useHistory()

    function goToNoteAddPage() {
        history.push(`/add-note`)
    }

    async function doRefresh(event: CustomEvent<RefresherEventDetail>) {
        await fetchNotes()
        event.detail.complete()
    }

    return (
        <IonPage>
            <AppHeader />
            <IonContent className="ion-padding">

                {
                    notes.length > 0 &&
                    <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
                        <IonRefresherContent />
                    </IonRefresher>
                }

                <IonFab vertical="bottom" horizontal="end" slot="fixed">
                    <IonFabButton onClick={goToNoteAddPage}>
                        <IonIcon icon={add} />
                    </IonFabButton>
                </IonFab>

                {
                    loading &&
                    <div className="flex-row center-a center-b">
                        <IonSpinner />
                    </div>
                }

                {
                    notes.length === 0 ?
                    <div className="fit-parent flex-col center-a center-b">
                        <IonIcon icon={create} style={{ height: '72px', width: '72px', color: `#cbcbcb` }} />
                        <p>Você ainda não possui uma anotação.</p>
                        <IonButton color="primary" onClick={goToNoteAddPage}>
                            Clique para Adicionar
                        </IonButton>
                    </div> :
                    <div style={{ paddingBottom: '56px' }}>
                    {
                        notes.map(({ title, content, id, createdAt }: Note) =>
                            <IonCard key={`note-${id}`}>
                                <div style={{ position: 'relative' }}>
                                    <div style={{ position: 'absolute', right: `12px`, top: `12px`, zIndex: 99 }}
                                        onClick={
                                            event => setState({
                                                showActionsPopover: true,
                                                noteIdAction: id,
                                                popoverEvent: event.nativeEvent
                                            })
                                        }>
                                        <IonIcon icon={more} style={{ fontSize: '22px' }} />
                                    </div>
                                    {
                                        title &&
                                        <IonCardHeader>
                                            <IonCardTitle> { title } </IonCardTitle>
                                        </IonCardHeader>
                                    }
                        
                                    <IonCardContent>
                                        { content }
                                        <div className="flex-row flex-end ion-margin-top">
                                            <em> { new Date(createdAt).toLocaleString() } </em>
                                        </div>
                                    </IonCardContent>
                                </div>
                            </IonCard>
                        ) as JSX.Element[]
                    }
                    </div>
                }

                <IonPopover
                    event={popoverEvent}
                    isOpen={showActionsPopover}
                    onDidDismiss={
                        () => setState({
                            showActionsPopover: false,
                            noteIdAction: -1
                        })}
                >
                    <IonList className="ion-padding">
                        <IonItem onClick={
                            () => {
                                history.push(`/edit-note/${noteIdAction}`)
                                setState({ showActionsPopover: false })
                            }
                        }> Editar </IonItem>
                        <IonItem onClick={
                            () => {
                                setState({
                                    showActionsPopover: false,
                                    showDeleteAlert: true
                                })
                            }
                        }> Apagar </IonItem>
                    </IonList>
                </IonPopover>

                <IonAlert
                    isOpen={showDeleteAlert}
                    onDidDismiss={() => setState({ showDeleteAlert: false })}
                    header="Apagar Anotação"
                    message="Deseja mesmo apagar esta anotação?"
                    buttons={[
                        {
                            text: 'Não',
                            role: 'cancel',
                            cssClass: 'secondary',
                            handler() {
                                setState({
                                    showDeleteAlert: false,
                                    noteIdAction: -1
                                })
                            }
                        },
                        {
                            text: 'Sim',
                            async handler() {
                                setState({ showDeleteAlert: false })
                                try {
                                    await api.delete(`/notes/${noteIdAction}`)
                                    setAppState({
                                        notes: notes.filter(note => note.id !== noteIdAction)
                                    })
                                    presentToast("Anotação apagada com sucesso.")
                                }
                                catch (e) {
                                    setState({ showDeleteAlert: false })
                                    presentToast("Ocorreu um erro ao apagar a anotação.")
                                }
                            }
                        }
                    ]}
                />

            </IonContent>
        </IonPage>
    );
};

export default Home;
