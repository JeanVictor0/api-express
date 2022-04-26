const { Router } = require('express')
const controller = require('../controllers/auth')
const router = Router()

// Criando um mini sistema de login. Usando controllers para ficar as funcoes e aqui so decidir rotas e tals 

router.post('/register', controller.register)

router.put('/reset_password', controller.reset)

router.post('/forget_password', controller.forget)

router.get('/auth' , controller.login)

// Aqui setamos o que usar no index. O app.use

module.exports = app => app.use('/auth', router)