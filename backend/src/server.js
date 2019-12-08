const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

const PORT = process.env.PORT || 8000

App.Models.init().then(() => {

    const controllers = App.Core.loadControllers()
    App.Core.injectControllers(app, '/', controllers)

    app.listen(PORT, () => console.log(`app listening at ::${PORT}`))
})