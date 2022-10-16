const verifyRoles = (...allwedRoles) =>{
    return (req, res, next) =>{
        if(!req?.roles) return res.sendStatus(401);
        const rolesArray = [...allwedRoles];
        const rolesTest = req.roles == 1 ? "User":"Admin";
        console.log(rolesTest);
        const result = req.roles.map(role => rolesArray.includes(role)).find(val => val === true);
        if(!result) return res.sendStatus(401);
        next();
    }
}

module.exports = verifyRoles;