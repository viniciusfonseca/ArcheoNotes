const { readdirSync, lstatSync } = require("fs");
const { join } = require("path");

const MODULE_RE = /(\.js|\.ts)$/
const controllersRootDirectory = '../controllers'

function loadControllers(folder = controllersRootDirectory) {
    const modules = {}

    const files = readdirSync(join(__dirname, folder))

    for (const file of files) {
        const key = file.replace(MODULE_RE, "")
        const fullPath = join(__dirname, folder, key)
        if (MODULE_RE.exec(file)) {
            modules[key] = require(fullPath)
        }
        else if (lstatSync(join(__dirname, folder, key)).isDirectory()) {
            modules[key] = loadControllers(join(folder, key))
        }
    }

    return modules
}

module.exports = loadControllers