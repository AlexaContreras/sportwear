const fs = require('fs');
const path = require('path');

const productFilePath = path.join(__dirname, '/../data/products.json');
const userFilePath = path.join(__dirname, '/../data/users.json');

function getProducts() {
    let productsContent = fs.readFileSync(productFilePath, 'utf-8');
    let finalProducts = productsContent == '' ? [] : JSON.parse(productsContent);
    return finalProducts;
}

/* 
    Como en todos los métodos estás usando siempre el mismo array de productos,
    podes setear esta variable como global y de esa manera solo la tenés que pasar
    como variable de la vista
*/
const products = getProducts();

let mainController = {
    home: (req, res) => {
        /* 
            Como ahora las variables isLogged y userLogged están en res.locals,
            aquí ya no es necesario ni generar esas variables, ni pasar las mismas
            a la vista al momento de res.render.
            Idem para todos los métodos
        */
        res.render('index', {
            title: 'Home',
            bodyName: 'home',     
        })
    },


    FAQ: (req, res) => {
        res.render('FAQ', {
            title: 'FAQ',
            bodyName: 'faq',

        })
    },

    Nosotros: (req, res) => {
        res.render('nosotros', {
            title: 'Nosotros',
            bodyName: 'nosotros',
        });

    },

    Hombre: (req, res) => {
        res.render('hombre', {
            products: products,
            title: 'Hombres',
            bodyName: 'hombre',
        })

       
    },

    Mujer: (req, res) => {
        res.render('mujer', {
            products: products,
            title: 'Mujeres',
            bodyName: 'mujer',
        })

    },

    Nenes: (req, res) => {
        res.render('nenes', {
            products: products,
            title: 'Nenes',
            bodyName: 'nenes',
        })

    },

    Lonuevo: (req, res) => {
        res.render('lonuevo', {
            products: products,
            title: 'New',
            bodyName: 'new',
        })

    },

    Sale: (req, res) => {
        res.render('sale', {
            products: products,
            title: 'Sale',
            bodyName: 'sale',
        })

    },


    Calzado: (req, res) => {
        res.render('calzado', {
            products: products,
            title: 'Calzado',
            bodyName: 'bodyCalzado',
        })
    },

    indumentaria: (req, res) => {
        res.render('indumentaria', {
            products: products,
            title: 'Indumentaria',
            bodyName: 'bodyIndumentaria',
        })
    },

    accesorios: (req, res) => {
        res.render('accesorios', {
            products: products,
            title: 'Accesorios',
            bodyName: 'bodyAccesorios',
        })
    },
};

module.exports = mainController;