const db = require('../database/models');
const sq = db.sequelize;
let apisController = {
    users: (req, res) => {
        db.Users
        .findAll({
            attributes: ['first_name' , 'last_name', 'email']
        })
        .then(users => {
            let result = {
                metadata : {
                    url: req.originalUrl,
                    quantity : users.length
                },
                data : users
            }
            return res.send(result);
        }).catch(error => console.log(error)
        )
    },
    products : (req, res) => {
        /* sumo todos los precios */
        let totalPrice = db.Products
           .sum('price');
           
        /* Busco todos los productos */
        let allProducts = db.Products
           .findAll(
            {
                order: [ ['id', 'DESC']],
                attributes: ['id','name', 'price', 'description', 'avatar'],
                include : ['category']
            }
           );
           
           let allCategories =  db.Categories.findAll();
       
           /* aca escribo que queries deben terminar de ejecutarse para que haga el 'then' */
           Promise.all([totalPrice, allProducts, allCategories])
           
           /* pongo 2 parametros, uno para el AMOUNT q encontro, otro para los PRODUCTOS */
           .then (function ([amount, products, categories]){
            let finalCat = []
            let cat = categories.forEach(oneCat=> {
                       finalCat.push(oneCat.name)
            });
            console.log(finalCat);
            
            /* aca ya defino el resultado que va a mostrar la API */
            let result = {  
                metadata: {
                    url: req.originalUrl,
                    quantity: products.length, 
                    amount: amount,
                    categories: finalCat                         
                },
                data: products
            }
               return res.send(result);
           })
           .catch(error => console.log(error)); 
    }

}

module.exports = apisController;
