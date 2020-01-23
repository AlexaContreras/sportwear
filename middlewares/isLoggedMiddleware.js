const fs = require('fs');
const path = require('path');

const userFilePath = path.join(__dirname, '/../data/users.json');

// Funciones necesarias para traer al usuario por id
function getAllUsers() {
    let usersFileContent = fs.readFileSync(userFilePath, 'utf-8');
    let finalUsers = usersFileContent == '' ? [] : JSON.parse(usersFileContent);
    return finalUsers;
}

function getUserById(id) {
    let allUsers = getAllUsers();
    let userToFind = allUsers.find(oneUser => oneUser.id == id);
    return userToFind;
}

const isLoggedMiddleware = (req,res,next) => {
    // Seteamos isLogged como false
    res.locals.isLogged = false;
    
    // Si req.session.userId es distinto de undefined, es porque existe
    /* 
        ¿Por qué existe? - Por que el userCookieMiddleware trajo de la cookie el id guardado 
        y ese id guardado en la cookie lo pasó a session.
        Por eso userCookieMiddleware en app.js va antes de isLoggedMiddleware
    */ 
    if (req.session.userId != undefined) {
        // Al saber que tenemos el id en req.session.userId, pasamos res.locals.isLogged a true
        res.locals.isLogged = true;
        // Ahora en locals vamos a guardar en userLogged al usuario que corresponde con el id que tenemos en session
        res.locals.userLogged = getUserById(req.session.userId);
    }
    next();
}

module.exports = isLoggedMiddleware;