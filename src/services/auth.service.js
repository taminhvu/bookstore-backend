
const tokenService = require('./token.service');
const emailService = require('./email.service');
const userService = require('./user.service');
const Response = require('../utils/Response');
const bcrypt = require('bcrypt');
const moment = require('moment');

const createUser = async(user)=>{
    return userService.createUser(user);
}
const loginWithEmailAndPassword = async(Email,MatKhau)=>{
    let user = await userService.getUserByEmail(Email);
    user = user[0];
    if(!user){
        throw new Response(true,"0");
    }
    const ckPass = bcrypt.compareSync(MatKhau, user.MatKhau);
    if(!ckPass){
        throw new Response(true,"1");
    }
    
    if(user.XacThuc === 0){
        throw new Response(true,'2');
    }
    if(user.trangThai === 0){
        throw new Response(true,'3');
    }
    delete user.MatKhau;
    delete user.IDNguoiDung;
    delete  user.Quyen;
    user.NgaySinh = moment(user.NgaySinh).utc().format('YYYY-MM-DD');
    return user;
}

const generateAuthToken = (user)=>{
    return tokenService.generateAuthToken(user);
}

const generateVerifyEmailToken = (user)=>{
    return tokenService.generateVerifyEmailToken(user);
}
const verifyEmailToken = async(token)=>{
    try{
        const user = tokenService.verifyToken(token);
        console.log(user);
        return await userService.updateUserById(user.IDNguoiDung,{XacThuc:1});
    }catch(err){
        throw err;
    }
}

const sendVerificationEmail = async(to, token)=>{
    return emailService.sendVerificationEmail(to, token);
}
module.exports = {
    createUser,
    loginWithEmailAndPassword,
    generateVerifyEmailToken,
    generateAuthToken,
    verifyEmailToken,
    sendVerificationEmail,
}