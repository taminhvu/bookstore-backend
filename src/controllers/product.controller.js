const { productService } = require("../services");
const httpStatus = require("http-status");
const Response = require("../utils/Response");

const addProduct = async function (req, res) {
  try {
    const obj = req.body;
    await productService.addProduct(obj);
    return res.status(httpStatus.CREATED).send(new Response(false, "create"));
  } catch (err) {
    return res.status(httpStatus.BAD_REQUEST).send(err);
  }
};

const getProductById = async function (req, res) {
  try {
    const id = req.params.id;
    const product = await productService.getProductById(id);
    return res.httpStatus(httpStatus.OK).json(new Response(fase, "", product));
  } catch (err) {
    return res.status(httpStatus.BAD_REQUEST).json(err);
  }
};

const getAllProduct = async function (req, res) {
  try {
    const product = await productService.getAllProduct();
    return res.status(httpStatus.OK).json(new Response(false, "", product));
  } catch (err) {
    return res.status(httpStatus.BAD_REQUEST).json(err);
  }
};

module.exports = {
    addProduct,
    getProductById,
    getAllProduct,
}
