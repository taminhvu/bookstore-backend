const httpStatus = require("http-status");
const{orderService} =require("../services");
const Response = require('../utils/Response');
const addOrder = async function(req,res){
    try {
        const obj = req.body;
        // obj[IDNguoiDung] = req.user;
        console.log(obj);
        await orderService.addOrder(obj);
        return res.sendStatus(httpStatus.NO_CONTENT);
    } catch (error) {
        res.status(httpStatus.BAD_REQUEST).json(new Response(true,error.message));
    }
}
module.exports={
    addOrder,
}