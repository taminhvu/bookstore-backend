const verifyRoles = (...allwedRoles) =>{
    return (req, res, next) =>{
        if(!req?.roles) return res.sendStatus(401);
        const rolesArray = [...allwedRoles];
        console.log(req.roles);
        const result = req.roles.map(role => rolesArray.includes(role)).find(val => val === true);
        console.log(result);
        if(!result) return res.sendStatus(401);
        next();
    }
}

module.exports = verifyRoles;