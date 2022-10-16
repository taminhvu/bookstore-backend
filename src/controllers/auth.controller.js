const { query } = require('express');
const httpStatus = require('http-status');
const {authService} = require('../services');
const Response = require('../utils/Response');
const moment = require('moment');
const register = async(req,res)=>{
    try{
        const user = await authService.createUser(req.body);
        res.status(httpStatus.CREATED).json(new Response(false,'Create',{IDNguoiDung:user.insertId, Email:req.body.Email}));
    }
    catch(err){
        console.log(err);
        res.status(httpStatus.NOT_ACCEPTABLE).json(err);
    }
    
}
const login = async(req,res)=>{
    try{
        const {Email, MatKhau} = req.body;
        const user = await authService.loginWithEmailAndPassword(Email,MatKhau);
        const token = authService.generateAuthToken(user);
        user['accesstoken'] = token;
        res.status(httpStatus.OK).json(new Response(false,'',user));
    }catch(err){
        console.log(err);
        res.status(httpStatus.NOT_ACCEPTABLE).json(err);
    }
}

const sendVerificationEmail = async (req,res)=>{
    const verifyEmailToken = authService.generateVerifyEmailToken(req.body);
    await authService.sendVerificationEmail(req.body.Email, verifyEmailToken);
    return res.status(httpStatus.NO_CONTENT).json();
}
const verifyEmailToken = async(req,res)=>{
    try{
        const token = req.query.token;
        await authService.verifyEmailToken(token);
        return res.status(httpStatus.OK).json();
    }catch(err){
        console.log(err);
        return res.status(httpStatus.BAD_REQUEST).json(err);
    }
        
}
module.exports = {
    login,
    register,
    sendVerificationEmail,
    verifyEmailToken,
}