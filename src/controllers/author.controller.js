const {authorService} = require('../services')
const httpStatus = require('http-status');
const Response = require('../utils/Response');

const addAuthor = async function(req,res){
    const obj = req.body;
    try {
        await authorService.addAuthor(obj);
        res.sendStatus(httpStatus.NO_CONTENT);
    } catch (error) {
        res.status(httpStatus.BAD_REQUEST).json(new Response(true,error.message));
    }
}

const deleteAuthorByID = async function(req,res){
    try {
        const ID = req.params.ID;
        await authorService.deleteAuthorByID(ID);
        res.sendStatus(httpStatus.NO_CONTENT);
    } catch (error) {
        res.status(httpStatus.BAD_REQUEST).json(new Response(true,error.message));
    }
}

const updateAuthorByID = async function(req,res){
    try {
        const ID = req.params.ID;
        const obj = req.body;
        await authorService.updateAuthorByID(ID,obj);
        res.sendStatus(httpStatus.NO_CONTENT);
    } catch (error) {
        res.status(httpStatus.BAD_REQUEST).json(new Response(true,error.message));
    }
}
const getAuthorByID = async function(req,res){
    try {
        const ID = req.params.ID;
        const data = await authorService.getAuthorByID(ID);
        res.status(httpStatus.OK).json(new Response(false,"",data));
    } catch (error) {
        res.status(httpStatus.BAD_REQUEST).json(new Response(true,error.message));
    }
}
module.exports = {
    addAuthor,
    getAuthorByID,
    updateAuthorByID,
    deleteAuthorByID,
}