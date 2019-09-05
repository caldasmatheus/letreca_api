var express = require('express');
var router = express.Router();
var Usuarios = require('../../model/usuarios/usuariosModel');
var bcrypt = require('bcrypt');
var login = require('../../controllers/login');


router.route("/usuarios")
    //  BUSCAR TODOS OS USUÁRIOS
    .get((req, res) => {
        //SELECT * FROM usuarios;
        Usuarios.findAll().then((usuarios) => {
            if (usuarios.length > 0) {
                res.json(usuarios)
            } else {
                res.json({ mensagem: "NÃO HA USUARIOS CADASTRADOS!" })
            }
        })
    })

    //  CRIAR UM NOVO USUÁRIO
    .post((req, res) => {
        let nomeEsse = req.body.nome;
        let emailEsse = req.body.email;
        let senhaEssa = req.body.senha;

        //INSERT INTO usuarios(categoria, nome, descricao) VALUES (cate)
        Usuarios.findOne(
            { where: { email: emailEsse } }
        ).then((usuario) => {
            if (usuario) {
                res.json({ mensagem: "O USUÁRIO JÁ EXISTE" })
            } else {
                bcrypt.hash(senhaEssa, 12).then((senhaCripto) => { //CRIPTOGRAFIA DA SENHA
                    Usuarios.create({
                        nome: nomeEsse,
                        email: emailEsse,
                        senha: senhaCripto
                    }).then((usuarios) => {
                        res.json({ mensagem: "USUARIO ADICIONADO" })
                    })
                })
            }
        })
    })


router.route("/usuarios/:id")
    //  EDITAR UM USUÁRIO PELO ID
    .put(function (req, res) {
        let id = req.params.id;
        let nome = req.body.nome;
        let novoUsuario = { nome: nome };

        //SELECT * FROM PRODUTO WHERE ID = REQ.PARAMS.ID LIMIT 1;
        Usuarios.findOne({
            where: { id }
        }).then((usuarios) => {
            if (usuarios) {
                //UPDATE PRODUTO SET NOME = ?, DESCRICAO = ? WHERE ID = ?;
                Usuarios.update(novoUsuario, { where: { id } }).then(() => {
                    res.json({ mensagem: "USUARIO " + id + " FOI ATUALIZADO COM SUCESSO" })
                })
            } else {
                res.json({ mensagem: "USUÁRIO NÃO ENCONTRADO" })
            }
        })
    })

    //  DELETAR UM USUÁRIO PELO ID
    .delete(function (req, res) {
        let id = req.params.id;

        //SELECT * FROM usuarios WHERE ID = REQ.PARAMS.ID LIMIT 1;
        Usuarios.findOne({
            where: { id }
        }).then((usuarios) => {
            if (usuarios) {
                //DELETE FROM usuario WHERE ID = REQ.PARAMS.ID;
                usuarios.destroy().then(() => {
                    res.json({ mensagem: "USUÁRIO DELETADO COM SUCESSO" })
                })
            }
        })
    })

// BUSCAR USUÁRIOS POR NOME
router.route("/usuarios/:nome")
    .get((req, res) => {
        let nome = req.params.nome;
        Usuarios.findAll({ where: { nome } }).then((usuarios) => {
            if (usuarios)
                res.json(usuarios)
            else
                res.json({ mensagem: 'USUÁRIO NÃO ENCONTRADO' })
        })
    })

// BUSCAR USUÁRIOS POR EMAIL
router.route("/usuarios/:email")
    .get((req, res) => {
        let email = req.params.email;
        Usuarios.findAll({ where: { email } }).then((usuarios) => {
            if (usuarios)
                res.json(usuarios)
            else
                res.json({ mensagem: 'USUÁRIO NÃO ENCONTRADO' })
        })
    })

router.route("/login")
    .post(login)


module.exports = router;