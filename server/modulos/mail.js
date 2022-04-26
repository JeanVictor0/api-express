const path = require('path')
const nodemailer = require('nodemailer')
const hbs = require('nodemailer-express-handlebars')
const { mail }  = require('../config/config')

// Bem simples, so usara um sistema de email da biblioteca nodemail. Eu estava usando mailtrap

var transport = nodemailer.createTransport(mail);

transport.use('compiler', hbs({
    viewEngine: "handlebars",
    viewPath: path.resolve('./server/public/mail'),
    extName: ".html"
}))

module.exports = transport