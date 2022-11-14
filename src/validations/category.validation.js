const { string } = require('joi');
const Joi = require('joi');
const addCategory = {
    body: Joi.object().keys({
        TenDanhMuc: Joi.string().required(),
    }),
};
const updateCategory = {
    body: Joi.object().keys({
        TenDanhMuc: Joi.string().required(),
    }),
};
const deleteCategory = {
    body: Joi.object().keys({
    }),
};

const getCategory = {
    body: Joi.object().keys({
    }),
};
module.exports ={
    addCategory,
    getCategory,
    updateCategory,
    deleteCategory,
}