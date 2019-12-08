const { Router } = require('express')

const app = Router()

app.get('/', (_, res) => {
    res.status(200).send("STATUS OK")
})

app.get('/ping', (_, res) =>
    res.status(200).send('pong')
)

app.get('/reset', async () => {
    try {
        await App.Models.note.destroy({ where: {} })
        res.status(200).send(`All notes have been deleted from database.`)
    }
    catch (e) {
        res.status(e.status || 500).send(e.payload)
    }
})

module.exports = app