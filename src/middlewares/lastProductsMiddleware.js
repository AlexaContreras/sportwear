const db = require('../database/models');
const sq = db.sequelize;
const fs = require('fs');

const lastProductsMiddleware = async (req, res, next) => {


    let products = await db.Products.findAll({
            order: [
                ['id', 'DESC']
            ],
            limit: 10
        })
        .catch(error => console.log(error));



    res.locals.lastProducts = products





    next();
}

module.exports = lastProductsMiddleware;