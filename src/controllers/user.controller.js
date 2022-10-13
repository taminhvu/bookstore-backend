const httpStatus = require('http-status');
const Response = require('../utils/Response');
const {userService} = require('../services');


const createUser = async (req,res)=>{
    try{
        const user = await userService.createUser(req.body);
        res.status(httpStatus.CREATED).json(new Response(false,'Create'));
    }
    catch(err){
        res.status(httpStatus.NOT_ACCEPTABLE).json(err);
    }
    
}


const getUser = async(req,res)=>{
    try{
        const user = await userService.getUserById(req.params.id);
        if(user.length == 0){
           return res.status(httpStatus.NOT_FOUND).json(new Response(true,"Not Found"));
        }
        return res.status(httpStatus.OK).json(new Response(false,'',user));
    }
    catch(err){
        console.log(err);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json(new Response(true,"error"));
    }
}

const getAllUser = async (req,res)=>{
    try{
        const alluser = await userService.getAllUser();
        res.status(httpStatus.OK).json(alluser);
    }catch{
        console.log(e);
        res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}

const deleteUser = async (req,res)=>{
    try{
        const response = await userService.deleteUser(req.params.id);
        res.sendStatus(httpStatus.NO_CONTENT);
    }catch(err){
        console.log(err);
        res.status(httpStatus.NOT_FOUND).send(err);
    }
}
module.exports = {
    createUser,
    getAllUser,
    getUser,
    deleteUser,
}