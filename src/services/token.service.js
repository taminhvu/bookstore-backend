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

const generateVerifyEmailToken = (IDNguoiDung)=>{
    const payload = {IDNguoiDung:IDNguoiDung}
    return helper.getAccesstoken(payload,'1h');
}

const verifyToken = (token)=>{
    return helper.verifyAccesstoken(token);
}

module.exports = {
    generateAuthToken,
    generateVerifyEmailToken,
    verifyToken,
};
