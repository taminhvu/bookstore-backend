const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const {userService} = require('../services');


const createUser = async (req,res)=>{
    const user = await userService.createUser(req.body);
    res.status(httpStatus.CREATED).json(user);
}


const getUser = async(req,res)=>{
    try{
        const user = await userService.getUserById(req.params.id);
        if(user.length == 0){
           return res.status(httpStatus.NOT_FOUND).json(new ApiError(httpStatus.NOT_FOUND,'id not found'));
        }
        req.user = user;
        return res.status(httpStatus.OK).json(user);
    }
    catch(err){
        console.log(err);
        res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
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