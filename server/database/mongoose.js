const mongoose = require('mongoose')
const {mongoUrl} = require('../config/config')
mongoose.connect(mongoUrl, {useMongoClient: true})
mongoose.Promise = global.Promise

module.exports = mongoose