const httpStatus = require('http-status');
const {authService, userService, tokenService} = require('../services');
const Response = require('../utils/Response');

const login = async(req,res)=>{
    try{
        const {Email, MatKhau} = req.body;
        const user = await authService.loginWithEmailAndPassword(Email,MatKhau);
        const token = tokenService.generateAuthToken(user);
        delete user.MatKhau;
        user['accesstoken'] = token;
        res.status(httpStatus.OK).json(new Response(false,'',user));
    }catch(err){
        console.log(err);
        res.status(httpStatus.NOT_ACCEPTABLE).json(err);
    }
}
module.exports = {
    login,
}