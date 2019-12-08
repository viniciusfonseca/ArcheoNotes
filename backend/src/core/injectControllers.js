function injectControllers(app, path, controllers) {
    for (let key in controllers) {
        if (typeof controllers[key] === "object") {
            injectControllers(app, path + key, controllers[key])
        }
        else if (typeof controllers[key] === "function") {
            const handler = controllers[key]
            if (key.startsWith('/')) { key = key.replace(/^\//, "") }
            if (key === "index") key = ""
            if (key.length > 0) key = '/' + key
            // console.log('injected at', path + key)
            app.use(path + key, handler)
        }
    }
}

module.exports = injectControllers