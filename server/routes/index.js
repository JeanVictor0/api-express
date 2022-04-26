const fs = require('fs')
const path = require('path')

// Vai listar todos os controllers e exportar. Assim so usando diretamente no app sem problema. Ja que nos outros controllers ja tem app.use e tals

module.exports = app => {
    fs.readdirSync(__dirname)  
    .filter(file => ((file.indexOf('.')) !== 0 && (file !== "index.js") ))
    .forEach(file => ( require(path.resolve(__dirname + "/" + file))))
}