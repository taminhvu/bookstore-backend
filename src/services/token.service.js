const jwt = require('jsonwebtoken');
const moment = require('moment');
const httpStatus = require('http-status');
const helper = require('../utils/Helper');

const generateToken = (IDNguoiDung,Quyen,exprires)=>{
    const payload = {
        Id: IDNguoiDung,
        Quyen: Quyen,
        time: exprires,
    }
    return helper.getAccesstoken(payload,exprires);
}
const generateAuthToken = (user)=>{
    return generateToken(user.IDNguoiDung,user.Quyen,'30d');
}
module.exports = {
    generateToken,
    generateAuthToken,
};