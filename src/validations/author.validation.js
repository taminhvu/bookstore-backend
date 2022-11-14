const { string } = require('joi');
const Joi = require('joi');
const addAuthor = {
    body: Joi.object().keys({
        TenTacGia: Joi.string().required(),
        DiaChi: Joi.string().required(),
    }),
};
const updateAuthor = {
    body: Joi.object().keys({
        TenTacGia: Joi.string().required(),
        DiaChi: Joi.string().required(),
    }),
};
const deleteAuthor = {
    body: Joi.object().keys({
    }),
};

const getAuthor = {
    body: Joi.object().keys({
    }),
};
module.exports ={
    addAuthor,
    updateAuthor,
    deleteAuthor,
    getAuthor,
}