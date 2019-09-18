var express = require('express');
var router = express.Router();
var Desafio = require('../../model/desafio/desafioModel');
var uniqid = require('uniqid');
const fileType = require('file-type');
const fs = require('fs');

router.route("/desafios")

    //  BUSCAR TODOS OS DESAFIOS
    .get((req, res) => {
        //SELECT * FROM desafio;
        Desafio.findAll().then((desafio) => {
            if (desafio.length > 0) {
                res.json(desafio)
            } else {
                res.json({ mensagem: "NÃO HÁ DESAFIOS CADASTRADOS!" })
            }
        })
    })

    //  CRIAR UM NOVO DESAFIOS
    .post((req, res) => {
        let contextoEsse = req.body.contexto;
        let nomeEsse = req.body.nome;
        let audioEssa = saveAudioChallenge(req.body.audio, req);
        let imagemEssa = saveImageChallenge(req.body.imagem, req);

        //INSERT INTO desafio(...) VALUES (cate)
        Desafio.create({
            contexto: contextoEsse,
            nome: nomeEsse,
            audio: audioEssa,
            imagem: imagemEssa,
        }).then((desafio) => {
            res.json({ mensagem: "DESAFIO ADICIONADO" })
        })
    })

router.route("/desafios/:id")

    //  BUSCAR DESAFIO POR ID
    .get(function(req, res) {
        let id = req.params.id;

         //SELECT * FROM DESAFIO WHERE ID = REQ.PARAMS.ID LIMIT 1;
        Desafio.findOne(
            {where: {id}}
        ).then(function(desafio) {
            if (desafio) {
                res.json(desafio);
            } else {
                res.json({mensagem: "DESAFIO NÃO ENCONTRADO"})
            }
        })
    })

    //  EDITAR UM DESAFIO PELO ID
    .put(function (req, res) {
        let id = req.params.id;
        let contexto = req.body.contexto;
        let nome = req.body.nome;
        let audio = req.body.audio;
        let imagem = req.body.imagem;
        let novoDesafio = {contexto: contexto, nome: nome, audio: audio, imagem: imagem};

        //SELECT * FROM DESAFIO WHERE ID = REQ.PARAMS.ID LIMIT 1;
        Desafio.findOne({
            where: { id }
        }).then((desafio) => {
            if (desafio) {
                //UPDATE DESAFIO SET NOME = ?, DESCRICAO = ? WHERE ID = ?;
                Desafio.update(novoDesafio, { where: { id } }).then(() => {
                    res.json({ mensagem: "O DESAFIO " + id + " FOI ATUALIZADO COM SUCESSO" })
                })
            } else {
                res.json({ mensagem: "DESAFIO NÃO ENCONTRADO" })
            }
        })
    })

    //  DELETAR UM DESAFIO PELO ID
    .delete(function (req, res) {
        let id = req.params.id;

        //SELECT * FROM DESAFIO WHERE ID = REQ.PARAMS.ID LIMIT 1;
        Desafio.findOne({
            where: { id }
        }).then((desafio) => {
            if (desafio) {
                //DELETE FROM DESAFIO WHERE ID = REQ.PARAMS.ID;
                desafio.destroy().then(() => {
                    res.json({ mensagem: "DESAFIO DELETADO COM SUCESSO" })
                })
            }else{
                res.json({ mensagem: "DESAFIO NÃO ENCONTRADO" })
            }
        })
    })

// DESAFIO + ID + CONTEXTO
router.route("/desafios/:contexto/contexto")

    //BUSCAR TODOS OS DIASAFIOS DE UM CONTEXTO
    .get((req, res) => {
        let contexto = req.params.contexto;
        Desafio.findAll({ where: { contexto } }).then((desafio) => {
            if (desafio)
                res.json(desafio)
            else
                res.json({ mensagem: 'DESAFIO NÃO ENCONTRADO' })
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
        console.log('Salvando imagem base64');
        return req.protocol + "://" + req.get("host") + '/letreca/v1/' + BASE_URL_CONTEXT + imageName
    }

    // CONVERTER O AUDIO PRA BASE64 E MANDAR PRO SERVIDOR
    function saveAudioChallenge(codeBase64, req){
        if(!codeBase64) return null;
        let buffer = new Buffer(codeBase64, 'base64')
        let audioExtension = fileType(buffer).ext
        let audioName = uniqid()
        audioName = audioName + '.' + audioExtension
        fs.writeFileSync(BASE_URL_CONTEXT_AUDIO + audioName, buffer)
        return req.protocol + "://" + req.get("host") + '/letreca/v1/' + BASE_URL_CONTEXT_AUDIO + audioName
    }

const BASE_URL_CONTEXT = 'public/images/'
const BASE_URL_CONTEXT_AUDIO = 'public/sounds/'
module.exports = router;