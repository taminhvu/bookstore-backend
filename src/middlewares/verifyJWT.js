const helper = require('../utils/Helper');

const verifyJWT = (req, res, next )=>{
    const authHeader = req.headers.Authorization || req.headers.authorization;
    if(!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);

    const token = authHeader.split(' ')[1];
    const user = helper.verifyAccesstoken(token);
    if(!user) return res.sendStatus(403);
    req.user = user.IDNguoiDung;
    req.roles = [user.Quyen];
    next();
}
module.exports = verifyJWT;