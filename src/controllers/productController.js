const fs = require('fs');
const path = require('path');
const db = require('../database/models');
const sq = db.sequelize;

let productController = {

    productDetail: (req, res) => {
        db.Products
            .findByPk(req.params.id, {
                include: ['brand', 'category', 'sizes', 'colors']
            })
            .then(product => {

                return res.render('products/productDetail', {
                    product,
                    title: 'Detalle',
                    bodyName: 'detail'
                });
            })
            .catch(error => console.log(error));

    },

    productCart: (req, res) => {
        res.render('products/productCart', {
            title: 'Product cart',
            bodyName: 'cart',
        })

    },

    productShow: (req, res) => {
        let productColors = db.Colors.findAll();
        let productTypes = db.Types.findAll();
        let productCategoties = db.Categories.findAll();
        let productBrand = db.Brands.findAll();
        let productSize = db.Sizes.findAll();
        let productStatus = db.Status.findAll();

        Promise.all([productColors, productTypes, productCategoties, productBrand, productSize, productStatus])
            .then(([colors, types, categories, brands, sizes, status]) => {

                res.render('products/productAdd', {
                    colors,
                    types,
                    categories,
                    brands,
                    sizes,
                    status,
                    title: 'Añadir producto',
                    bodyName: 'add'
                })
            }).catch(error => console.log(error))

    },

    productAdd: (req, res) => {
        req.body.avatar = req.file.filename
        db.Products
            .create(req.body)
            .then(productSaved => {

                let colors = req.body.colors;
                for (const oneColor of colors) {
                    // 	// Guardar en la tabla pivot colorProducts
                    db.ColorProducts
                        .create({
                            product_id: productSaved.id,
                            color_id: oneColor
                        }).catch(error => console.log(error));
                }

                let sizes = req.body.sizes;
                for (const oneSize of sizes) {
                    // 	// Guardar en la tabla pivot sizesProducts
                    db.SizeProducts
                        .create({
                            product_id: productSaved.id,
                            size_id: oneSize
                        }).catch(error => console.log(error));
                }

                res.redirect('/');

            })
            .catch(error => console.log(error));


    },

    deleteProduct: (req, res) => {
        db.ColorProducts.destroy({
            where: {
                product_id: req.params.id
            }
        }).then(product => {
            db.SizeProducts.destroy({
                where: {
                    product_id: req.params.id
                }
            }).then(product => {
                db.Products.destroy({
                    where: {
                        id: req.params.id
                    }
                })
            }).catch(error => console.log(error))
        })

        res.redirect('/')


    },

    editProductShow: (req, res) => {
        let productFind = db.Products.findByPk(req.params.id, { include: ['colors', 'sizes']})
        let productColors = db.Colors.findAll();
        let productTypes = db.Types.findAll();
        let productCategoties = db.Categories.findAll();
        let productBrand = db.Brands.findAll();
        let productSize = db.Sizes.findAll();
        let productStatus = db.Status.findAll();

        Promise.all([productFind, productColors, productTypes, productCategoties, productBrand, productSize, productStatus])
            .then(([product, colors, types, categories, brands, sizes, status]) => {
                res.render('products/productEdit', {
                    product,
                    colors,
                    types,
                    categories,
                    brands,
                    sizes,
                    status,
                    title: 'Edit',
                    bodyName: 'edit'
                })
            }).catch(error => console.log(error))


    },

    editProduct: async (req, res) => {

        req.body.avatar = req.file.filename;
        let productEdited = await db.Products
            .update(req.body, {
                where: {
                    id: req.params.id
                }
            });

            await db.Products
            .findByPk(req.params.id, {
                include: [ {
                    association: 'colors', 
                }, {association: 'sizes'}]
            }).then(productFound =>{
                let colors = productFound.colors;
                let sizes = productFound.sizes;
                
                colors.map(eachColor => {
                    sq
                        .query(`DELETE FROM colorProducts WHERE product_id = ${productFound.id} AND color_id = ${eachColor.id}`)
                        .then(() => console.log("Todo ok")) 
                        .catch(error => console.log(error));
                });
                sizes.map(eachSize => {
                    sq
                        .query(`DELETE FROM sizeProducts WHERE product_id = ${productFound.id} AND size_id = ${eachSize.id}`)
                        .then(() => console.log("Todo ok")) 
                        .catch(error => console.log(error));
                });

                let colorsToSave = req.body.colors;
                let sizesToSave = req.body.sizes

                colorsToSave.forEach(async oneColor => {
                    await db.ColorProducts
                        .create({
                            product_id: req.params.id,
                            color_id: oneColor
                        }) 
                        .catch(error => console.log(error));
                })

                sizesToSave.forEach(async oneSize => {
                    await db.SizeProducts
                        .create({
                            product_id: req.params.id,
                            size_id: oneSize
                        }) 
                        .catch(error => console.log(error));
                })



                return res.redirect('/');
            })

        
    },

    men: (req, res) => {
        db.Products
            .findAll({
                include: ['brand', 'category', 'status', 'type']
            })
            .then(products => {
                return res.render('productViews/men', {
                    products,
                    title: 'Hombres',
                    bodyName: 'hombre'
                });
            })
            .catch(error => console.log(error));
    },

    women: (req, res) => {
        db.Products
            .findAll({
                include: ['brand', 'category', 'status', 'type']
            })
            .then(products => {
                return res.render('productViews/women', {
                    products,
                    title: 'Mujeres',
                    bodyName: 'mujer'
                });
            })
            .catch(error => console.log(error));
    },

    kids: (req, res) => {
        db.Products
            .findAll({
                include: ['brand', 'category', 'status', 'type']
            })
            .then(products => {
                return res.render('productViews/kids', {
                    products,
                    title: 'Nenes',
                    bodyName: 'nenes'
                });
            })
            .catch(error => console.log(error));
    },

    new: (req, res) => {
        db.Products
            .findAll({
                include: ['brand', 'category', 'status', 'type']
            })
            .then(products => {
                return res.render('productViews/new', {
                    products,
                    title: 'New',
                    bodyName: 'new'
                });
            })
            .catch(error => console.log(error));
    },

    sale: (req, res) => {
        db.Products
            .findAll({
                include: ['brand', 'category', 'status', 'type']
            })
            .then(products => {
                return res.render('productViews/sale', {
                    products,
                    title: 'Sale',
                    bodyName: 'sale'
                });
            })
            .catch(error => console.log(error));
    },


    shoes: (req, res) => {
        db.Products
            .findAll({
                include: ['brand', 'category', 'status', 'type']
            })
            .then(products => {
                return res.render('productViews/shoes', {
                    products,
                    title: 'Calzados',
                    bodyName: 'bodyCalzado'
                });
            })
            .catch(error => console.log(error));
    },

    clothes: (req, res) => {
        db.Products
            .findAll({
                include: ['brand', 'category', 'status', 'type']
            })
            .then(products => {
                return res.render('productViews/clothes', {
                    products,
                    title: 'Indumentaria',
                    bodyName: 'bodyIndumentaria'
                });
            })
    },

    accesories: (req, res) => {
        db.Products
            .findAll({
                include: ['brand', 'category', 'status', 'type']
            })
            .then(products => {
                return res.render('productViews/accesories', {
                    products,
                    title: 'Accesorios',
                    bodyName: 'bodyAccesorios'
                });
            })
            .catch(error => console.log(error));
    },


};

module.exports = productController;