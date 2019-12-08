const App = {
    get Core() {
        return require('./core')
    },
    get Models() {
        return require('./models')
    },
    get Services() {
        return require('./services')
    },
    // get Storage() {
    //     return Storage
    // }
}

global.App = App

module.exports = App