const express = require('express')
const authMiddleware = require('../middlewares/auth')
const controller = require('../controllers/project')

const router = express.Router()

// Nessa rota usara autenticacao. Seria mais para projetos e coisas privadas. E ate como sites com login usando cookies ou localstorage para amazenar coisas
router.use(authMiddleware)

router.get('/', controller.getProject)

router.get('/:projectid', controller.byId)

router.post('/:projectid', controller.create)

router.put('/:projectid', controller.updateById)

router.delete('/:projectid', controller.deleteById)

module.exports = app => app.use('/project', router)