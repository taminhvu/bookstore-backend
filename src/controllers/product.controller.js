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

const getProductByID = async function (req, res) {
  try {
    const id = req.params.ID;
    const product = await productService.getProductByID(id);
    return res.status(httpStatus.OK).json(new Response(false, "", product));
  } catch (error) {
    console.log(error);
    return res.status(httpStatus.BAD_REQUEST).json(error.message);
  }
};

const getAllProduct = async function (req, res) {
  try {
    const product = await productService.getAllProduct();
    return res.status(httpStatus.OK).json(new Response(false, "", product));
  } catch (err) {
    return res.status(httpStatus.BAD_REQUEST).json(err.message);
  }
};

const deleteProductByID = async function(req,res){
  try {
    const ID = req.params.ID;
    await productService.deleteProductByID(ID);
    return res.sendStatus(httpStatus.NO_CONTENT);
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).json(error.message);
  }
}
const updateProductByID = async function(req,res){
  try {
    const ID = req.params.ID;
    const obj = req.body;
    await productService.updateProductByID(ID,obj);
    return res.sendStatus(httpStatus.NO_CONTENT);
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).json(error.message);
  }
}
module.exports = {
    addProduct,
    getProductByID,
    getAllProduct,
    deleteProductByID,
    updateProductByID,
}
