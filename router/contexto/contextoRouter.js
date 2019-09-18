var express = require('express');
var router = express.Router();
var Contexto = require('../../model/contexto/contextoModel');
var uniqid = require('uniqid');
const fileType = require('file-type');
const fs = require('fs');


router.route("/contextos")

    //  BUSCAR TODOS OS CONTEXTOS
    .get((req, res) => {
        //SELECT * FROM contexto;
        Contexto.findAll().then((contexto) => {
            if (contexto.length > 0) {
                res.json(contexto)
            } else {
                res.json({ mensagem: "NÃO HÁ CONTEXTOS CADASTRADOS!" })
            }
        })
    })

    //  CRIAR UM NOVO CONTEXTO
    .post((req, res) => {
        let nomeEsse = req.body.nome;
        let imagemEssa = saveImageChallenge(req.body.imagem, req);

        //INSERT INTO contexo(nome, imagem) VALUES (cate)
        Contexto.create({
            nome: nomeEsse,
            imagem: imagemEssa,
        }).then((contexto) => {
            res.json({ mensagem: "CONTEXTO ADICIONADO" })
        })
    })

router.route("/contextos/:id")

    //  BUSCAR CONTEXTO POR ID
    .get(function(req, res) {
        let id = req.params.id;

            //SELECT * FROM CONTEXTO WHERE ID = REQ.PARAMS.ID LIMIT 1;
        Contexto.findOne(
            {where: {id}}
        ).then(function(contexo) {
            if (contexo) {
                res.json(contexo);
            } else {
                res.json({mensagem: "CONTEXTO NÃO ENCONTRADO"})
            }
        })
    })

    //  EDITAR UM CONTEXTO PELO ID
    .put(function (req, res) {
        let id = req.params.id;
        let nome = req.body.nome;
        let imagem = req.body.imagem;
        let novoContexto = {nome: nome, imagem: imagem};

        //SELECT * FROM CONTEXTO WHERE ID = REQ.PARAMS.ID LIMIT 1;
        Contexto.findOne({
            where: { id }
        }).then((contexo) => {
            if (contexo) {
                //UPDATE CONTEXTO SET NOME = ?, DESCRICAO = ? WHERE ID = ?;
                Contexto.update(novoContexto, { where: { id } }).then(() => {
                    res.json({ mensagem: "O CONTEXTO " + id + " FOI ATUALIZADO COM SUCESSO" })
                })
            } else {
                res.json({ mensagem: "CONTEXTO NÃO ENCONTRADO" })
            }
        })
    })

    //  DELETAR UM CONTEXTO PELO ID
    .delete(function (req, res) {
        let id = req.params.id;

        //SELECT * FROM CONTEXTO WHERE ID = REQ.PARAMS.ID LIMIT 1;
        Contexto.findOne({
            where: { id }
        }).then((contexto) => {
            if (contexto) {
                //DELETE FROM CONTEXTO WHERE ID = REQ.PARAMS.ID;
                contexto.destroy().then(() => {
                    res.json({ mensagem: "CONTEXTO DELETADO COM SUCESSO" })
                })
            }
        })
    })

    // CONVERTER A IMAGEM PRA BASE64 E MANDAR PRO SERVIDOR
    function saveImageChallenge(codeBase64, req){
        if(!codeBase64) return null;
        let buffer = new Buffer(codeBase64, 'base64')
        let imageExtension = fileType(buffer).ext
        let imageName = uniqid()
        imageName = imageName + '.' + imageExtension
        fs.writeFileSync(BASE_URL_CONTEXT + imageName, buffer)
    
        return  req.protocol + "://" + req.get("host") + '/letreca/v1/' + BASE_URL_CONTEXT + imageName
    }

const BASE_URL_CONTEXT = 'public/images/';
module.exports = router;