const httpStatus = require('http-status');
const {userService} = require('../services');
const Response = require('../utils/Response');


const loginWithEmailAndPassword = async(Email,MatKhau)=>{
    const user = await userService.getUserByEmail(Email);
    if(user.length === 0){
        throw new Response(true,"0");
    }

    if(MatKhau !== user[0].MatKhau){
        throw new Response(true,"1");
    }

    return user[0];
}

module.exports = {
    loginWithEmailAndPassword,
}