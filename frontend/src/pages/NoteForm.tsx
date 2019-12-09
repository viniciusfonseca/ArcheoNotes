import React, { useEffect, useState } from 'react'
import { IonPage, IonContent, IonInput, IonItem, IonLabel, IonTextarea, IonButton, IonLoading } from '@ionic/react'
import { AppHeader } from '../components/AppHeader'
import { useRouteMatch, useHistory } from 'react-router'
import { useObjectState } from '../core/useObjectState'
import { api } from '../core/api'
import { Note } from '../types/Note'
import { createObjectKeyUpdater } from '../core/createObjectKeyUpdater'
import { useAppContext } from '../core/AppContext'
import { presentToast } from '../core/presentToast'

export const NoteForm: React.FC<{}> = () => {

    const { params: { id } } = useRouteMatch<{ id: string }>()

    useEffect(() => {
        if (id) {
            api.get(`/notes/${id}`).then(({ data: note }: { data: Note }) => {
                setForm(note)
            })
        }
    }, [])

    const [ sending, setSending ] = useState(false)

    const [ getForm, setForm ] = useObjectState({
        title: "",
        content: ""
    })

    const { notes, setAppState } = useAppContext()

    const history = useHistory()

    const createUpdater = createObjectKeyUpdater(setForm)
    const createInputHandler = (key: string) =>
        (event: CustomEvent) => createUpdater(key)((event.target as any).value) 

    async function createNote() {
        setSending(true)
        try {
            const { data: note } = await api.post(`/notes`, getForm())
            setAppState({ notes: [note].concat(notes) })
            setSending(false)
            history.goBack()
            presentToast("Anotação criada com sucesso.")
        }
        catch (e) {
            setSending(false)
        }
        finally {
        }
    }

    async function updateNote() {
        setSending(true)
        try {
            const { data: note } = await api.put(`/notes/${id}`, getForm())
            setAppState({
                notes: notes.map(
                    _note => +_note.id === +id ? note : _note
                )
            })
            setSending(false)
            history.goBack()
            presentToast("Anotação atualizada com sucesso.")
        }
        catch (e) {}
    }

    function onSubmit() {
        if (id) {
            updateNote()
        }
        else {
            createNote()
        }
    }

    return (
        <IonPage>
            <AppHeader hasBackButton title={ id ? 'Editar Anotação' : 'Criar Nova Anotação' } />
            <IonContent className="ion-padding">

                <IonItem>
                    <IonLabel position="floating"> Título </IonLabel>
                    <IonInput onIonChange={createInputHandler('title')} value={getForm().title} />
                </IonItem>

                <IonItem className="ion-margin-bottom">
                    <IonLabel position="floating"> Descrição </IonLabel>
                    <IonTextarea onIonChange={createInputHandler('content')} rows={5} value={getForm().content} />
                </IonItem>

                <IonButton expand="block"
                    disabled={getForm().content.length === 0}
                    onClick={onSubmit}
                >
                    Enviar
                </IonButton>
                
            </IonContent>
            <IonLoading isOpen={sending}
                backdropDismiss={false}
                message="Enviando..."
            />
        </IonPage>
    )
}