const httpStatus = require('http-status');
const {authService, userService, tokenService} = require('../services');
const Response = require('../utils/Response');

const register = async(req,res)=>{
    try{
        const user = await userService.createUser(req.body);
        res.status(httpStatus.CREATED).json(new Response(false,'Create'));
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
        const token = tokenService.generateAuthToken(user);
        delete user.MatKhau;
        delete user.IDNguoiDung;
        delete  user.Quyen;
        user['accesstoken'] = token;
        res.status(httpStatus.OK).json(new Response(false,'',user));
    }catch(err){
        console.log(err);
        res.status(httpStatus.NOT_ACCEPTABLE).json(err);
    }
}
module.exports = {
    login,
    register,
}