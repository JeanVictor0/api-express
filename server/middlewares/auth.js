const jwt = require('jsonwebtoken')
const {jwtToken} = require('../config/config')

// Sistema de ver cada coisa, se ta quantidade ou chave certa e tals. Para menor processamento. Na minha opiniao ate tinha como diminuir if em alguns mas aqui ta ate aceitavel
module.exports = (req,res,next) => {
    const authHeader = req.header.authorization

    if (!authHeader){
        return res.status(401).json({erro: "No token provided"})
    }

    const parts = authHeader.split(' ')

    if (!parts.lenght === 2) {
        return res.status(401).json({erro: "No token provided"})
    }

    const  { schema, token } = parts

    if (!/Bearer$/i.test(schema)) {
        return res.status(401).json({erro: "Token malformated"})
    }

    jwt.verify(token,jwtToken, (err,decoded) => {
        if (err) {
            return res.status(401).json({ error: "Token is invalid"})
        }
        req.userId = decoded.id
    })

    next();

    }
