const { string } = require('joi');
const Joi = require('joi');
const changeInfo = {
    body: Joi.object().keys({
        HoTen: Joi.string().required(),
        SoDienThoai: Joi.number().required(),
        GioiTinh: Joi.number().required(),
        NgaySinh: Joi.string().required().isoDate(),
    }),
};
const changeInfoByAdmin = {
    body: Joi.object().keys({
        TrangThai: Joi.number().required(),
        Quyen: Joi.number().required(),
    }),
};
const getInfor = {
    body: Joi.object().keys({
    }),
};

module.exports ={
    changeInfo,
    getInfor,
    changeInfoByAdmin,
}