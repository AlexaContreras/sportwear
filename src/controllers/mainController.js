const fs = require('fs');
const path = require('path');


let mainController = {
    home: (req, res) => {
    
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
};

module.exports = mainController;