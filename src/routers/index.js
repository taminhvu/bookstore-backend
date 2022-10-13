const express = require("express");
const userRouter = require("./user.route");

const router = express.Router();

const defaultRouter = [
    { 
        path: "/users",
        route: userRouter,
    },
];

defaultRouter.forEach((route)=>{
    router.use(route.path,route.route);
});
module.exports = router;
