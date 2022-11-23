const { string } = require('joi');
const Joi = require('joi');
const addProduct = {
    body: Joi.object().keys({
        TenSanPham: Joi.string().required(),
        IDNhaXuatBan:Joi.string().required(),
        DonViTinh: Joi.string().required(),
        TomTatND: Joi.string(),
        GiaBan:Joi.number().required(),
        GiamGia:Joi.number(),
        SoTrang:Joi.number().required(),
        IDTheLoai: Joi.string().required(),
        SoLuongConLai: Joi.number().required(),
        HinhAnh:Joi.required(),
    }),
};
const updateProduct = {
    body: Joi.object().keys({
        TenSanPham: Joi.string().required(),
        IDDanhMuc: Joi.string().required(),
        IDNhaXuatBan:Joi.string().required(),
        DonViTinh: Joi.string().required(),
        TomTatND: Joi.string(),
        GiaBan:Joi.number().required(),
        Giamgia:Joi.number(),
        SoTrang:Joi.number().required(),
    }),
};
const deleteProduct = {
    body: Joi.object().keys({
    }),
};
const getProduct = {
    body: Joi.object().keys({
    }),
};
module.exports ={
    addProduct,
    getProduct,
    deleteProduct,
    updateProduct,
}