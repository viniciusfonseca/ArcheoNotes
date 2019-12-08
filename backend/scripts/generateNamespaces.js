const fs = require('fs')
const path = require('path')

const namespaces = require('../nsconfig.json').directories

function generateNamespace(target) {
    const [ exportName ] = target.match(/[^(\\|\/)]*$/)

    let content = ""
    
    content += '/** ATTENTION. THIS IS AN AUTO GENERATED FILE. DO NOT MODIFY IT. */\n\n'
    
    content += `const ${exportName} = {\n`
    
    fs.readdirSync(path.join(__dirname, '..', target))
        .forEach(filename => {

            const fullFilePath = path.join(__dirname, '..', target, filename)

            if (filename === "index.js") { return }
            if (
                fs.lstatSync(fullFilePath).isFile() &&
                !filename.endsWith(".js")
            ) { return }
            const importName = filename.replace(/\.js$/, "")
            content += `    get ${importName}() { return require('./${importName}') },\n`
        })
    
    content += `}\n\n`
    content += `module.exports = ${exportName}`
    
    fs.writeFileSync(path.join(__dirname, '..', target, 'index.js'), content, { encoding: 'utf8' })

    console.log(`Namespace generated for ${target}`)
}

namespaces.forEach(generateNamespace)