const express = require('express')
const bodyParser = require('body-parser')
const app = express()

// Para ser processado json e receber no req
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

// Rotas express da api
require('./routes/index')(app)

// Normalmente se usa 3000 para nao interferir com 8080 ou 80 por seguranca
const server = app.listen(3000, () => {
    console.log("Servidor ligado http://localhost:3000")
})

// Se dar algum erro
server.on("error", (err) => {
    console.log(err)
})