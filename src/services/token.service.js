const helper = require('../utils/Helper');
const Response = require('../utils/Response');

const generateAuthToken = (user)=>{
    
    const{IDNguoiDung, Quyen} = user
    const payload = {
        Id: IDNguoiDung,
        Quyen: Quyen,
    }
    return helper.getAccesstoken(payload,'30d');
}

const generateVerifyEmailToken = (user)=>{
    const payload = {IDNguoiDung: user.IDNguoiDung}
    return helper.getAccesstoken(payload,'10h');
}

const verifyToken = (token)=>{
    return helper.verifyAccesstoken(token);
}

module.exports = {
    generateAuthToken,
    generateVerifyEmailToken,
    verifyToken,
};
