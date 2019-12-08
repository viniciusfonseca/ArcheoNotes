const { Router } = require('express')

const app = Router()

app.get('/',
    // App.Core.AuthRoute,
    // App.Core.AdminRoute,
    async (req, res) => {
        try {
            const notes = await App.Services.Note.list(req.query)
            res.status(200).send(notes)
        }
        catch (e) {
            res.status(e.status || 500).send(e.payload)
        }
    })

app.post('/',
    // App.Core.AuthRoute,
    // App.Core.AdminRoute,
    async (req, res) => {
        try {
            const note = await App.Services.User.addNote(req.body, req.body.authorId)
            res.status(200).send(note)
        }
        catch (e) {
            console.log(e)
            res.status(e.status || 500).send(e.payload)
        }
    })

app.get('/:id',
    // App.Core.AuthRoute,
    // App.Core.AdminRoute,
    async (req, res) => {
        try {
            const note = await App.Services.Note.getInfo(req.params.id)
            res.status(200).send(note)
        }
        catch (e) {
            res.status(e.status || 500).send(e.payload)
        }
    })

app.put('/:id',
    // App.Core.AuthRoute,
    // App.Core.AdminRoute,
    async (req, res) => {
        try {
            const note = await App.Services.User.editNote(req.params.id, req.body)
            res.status(200).send(note)
        }
        catch (e) {
            res.status(e.status || 500).send(e.payload)
        }
    })

app.delete('/:id',
    async (req, res) => {
        try {
            await App.Services.User.removeNote(req.params.id)
            res.status(200).send()
        }
        catch (e) {
            res.status(e.status || 500).send(e.payload)
        }
    })

module.exports = app