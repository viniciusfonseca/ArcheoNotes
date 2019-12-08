describe('notes crud', () => {

    it('creates a note', async () => {

        const note = {
            title: 'Exemplo de Anotação',
            content: 'Conteúdo da Anotação'
        }

        const { data, status } = await api.post(`/notes`, note)

        expect(status).toBe(200)
        for (const key in note) {
            expect(data[key]).toBe(note[key])
        }
    })

    it('lists notes', async () => {

        const { data, status } = await api.get(`/notes`)

        expect(status).toBe(200)
        expect(Array.isArray(data)).toBe(true)
    })

    it('gets one specific note', async () => {

        const note = await App.Services.User.addNote({
            title: `Anotação 1`,
            content: `Conteúdo 1`
        })

        const { data, status } = await api.get(`/notes/${note.dataValues.id}`)

        expect(status).toBe(200)
        for (const key in note) {
            expect(data[key]).toBe(note.dataValues[key])
        }
    })

    it('edits one specific note', async () => {

        const note = await App.Services.User.addNote({
            title: `Anotação 2`,
            content: `Conteúdo 2`
        })

        const newNoteData = {
            title: `Anotação 3`,
            content: `Conteúdo 3`
        }

        const { data, status } = await api.put(`/notes/${note.dataValues.id}`, newNoteData)

        expect(status).toBe(200)
        for (const key in newNoteData) {
            expect(data[key]).toBe(newNoteData[key])
        }
    })

    it('removes one specific note', async () => {

        const note = await App.Services.User.addNote({
            title: `Anotação 4`,
            content: `Conteúdo 4`
        })

        const { status } = await api.delete(`/notes/${note.dataValues.id}`)
        expect(status).toBe(200)

        const dbNote = await App.Models.note.findByPk(note.dataValues.id)
        expect(dbNote).toBe(null)
    })
})