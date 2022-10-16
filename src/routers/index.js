const express = require("express");
const userRouter = require("./user.route");
const authRouter = require('./auth.route');
const router = express.Router();

const defaultRouter = [
    { 
        path: "/users",
        route: userRouter,
    },
    { 
        path: "/auths",
        route: authRouter,
    },
];

defaultRouter.forEach((route)=>{
    router.use(route.path,route.route);
});
module.exports = router;
