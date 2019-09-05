var express = require('express');
var bcrypt = require('bcrypt');
var Usuarios = require('../model/usuarios/usuariosModel');
const jwt = require('jsonwebtoken');
var HttpStatus = require('http-status-codes');
var middleware = require('../middleware/auth');


const login = (req, res) => {
    Usuarios.findOne(
        { where: { email: req.body.email } }
    ).then((Usuario) => {
        if (Usuario) {
            bcrypt.compare(req.body.senha, Usuario.get({ plain: true }).senha).then((result) => {
                if (result) {
                    const token = jwt.sign(Usuario.get({ plain: true }), middleware.chave)
                    res.status(HttpStatus.OK).json({ token: token }).send()
                } else {
                    res.status(HttpStatus.UNAUTHORIZED).json({"Erro":"Credenciais inválidas"}).send()
                }
            })
        } else {
            res.status(HttpStatus.UNAUTHORIZED).json({"Erro":"Credenciais inválidas"}).send()
        }
    })
}
module.exports = login;