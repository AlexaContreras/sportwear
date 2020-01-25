const fs = require('fs');
const path = require('path');

const productFilePath = path.join(__dirname, '/../data/products.json');
let productsContent = fs.readFileSync(productFilePath, 'utf-8');

function getProducts() {
    let productsContent = fs.readFileSync(productFilePath, 'utf-8');
    let finalProducts = productsContent == '' ? [] : JSON.parse(productsContent);
    return finalProducts;
}

function storeProduct(newProduct) {
    let allProducts = getProducts();
    allProducts.push(newProduct);
    fs.writeFileSync(productFilePath, JSON.stringify(allProducts, null, ' '));
}

function generateProductId() {
    let allProducts = getProducts();
    if (allProducts.length == 0) {
        return 1;
    }

    let lastProduct = allProducts.pop();
    return lastProduct.id + 1;
}

function getProductById(id) {
    let allProducts = getProducts();
    let productToFind = allProducts.find(product => product.id == id);
    return productToFind;
}

let productController = {
    /*
        Como ahora las variables isLogged y userLogged están en res.locals,
        aquí ya no es necesario ni generar esas variables, ni pasar las mismas
        a la vista al momento de res.render.
        Idem para todos los métodos
    */
    productDetail: (req, res) => {
        let productFind = getProductById(req.params.id);
        const colors = require('../data/colors.json')
        res.render('productDetail', {
            productFind: productFind,
            title: 'Detail',
            bodyName: 'detail',
            colors
        })

    },

    productCart: (req, res) => {
        res.render('productCart', {
            title: 'Product cart',
            bodyName: 'cart',
        })

    },

    productShow: (req, res) => {
        res.render('productAdd', {
            title: 'Product Add',
            bodyName: 'add',
        })

    },

    productAdd: (req, res, next) => {
        let newAddProduct = {
            id: generateProductId(),
            name: req.body.productName,
            price: req.body.productPrice,
            description: req.body.productDescription,
            category: req.body.category,
            type: req.body.type,
            color: req.body.color,
            size: req.body.size,
            status: req.body.status,
            avatar: req.file.filename,
        };

        storeProduct(newAddProduct);

        return res.redirect('/');
    },

    deleteProduct: (req, res) => {
        let products = getProducts();
        let productosSinElQueBorramos = products.filter(function (unProducto) {
            return unProducto.id != req.params.id;
        })
        // guardo el array con los productos finales
        fs.writeFileSync(productFilePath, JSON.stringify(productosSinElQueBorramos, null, ' '));
        res.redirect('/');
    },

    editProductShow: (req, res) => {
        /* let colors = [
            "Negro", "Blanco", "Gris", "Azul", "Verde", "Rojo", "Naranja", "Bordo", "Rosa", "Celeste", "Natural", "Fucsia", "Lila", "Mostaza"
        ] */
        /* let colorFound = colors.filter(color => color != productFind.color);
        let colorSolo = colors.filter(color => color == productFind.color);
        let colorFinal = [...colorSolo, ...colorFound] */
        let productFind = getProductById(req.params.id);
        const colors = require('../data/colors.json');
        const sizes = require ('../data/sizes.json');
        const categories = require('../data/categories.json');
        const typesOfProducts = require('../data/typesOfProducts.json');
        const status = require('../data/status.json');
      
        res.render('productEdit', {
            productFind: productFind,
            title: 'Edit',
            bodyName: 'edit',
            colors,
            sizes,
            categories,
            typesOfProducts,
            status
        })
    },

    editProduct: (req, res) => {
        let products = getProducts();
        let productId = parseInt(req.params.id); //router.put('/productEdit/:id'

        //inicializo la variable a almacenar
        let productFound;

        //recorro el array
        products.map(product => {

            //pregunto si el id que recibo es igual al id del producto 
            if (product.id === productId) {

                //reasigno las propiedades del producto con lo que viene del form (req.body)
                product.nombre = req.body.productName,
                    product.precio = req.body.productPrice,
                    product.descripcion = req.body.productDescription,
                    product.categoria = req.body.category,
                    product.tipo = req.body.type,
                    product.color = req.body.color,
                    product.talle = req.body.size,
                    product.status = req.body.status,
                    product.avatar = req.file.filename

                // //asigno el valor a la variable inicializada
            }
            productFound = products;
        });
        fs.writeFileSync(productFilePath, JSON.stringify(productFound, null, ' '));

    },

    
};

module.exports = productController;