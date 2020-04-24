const bcrypt = require('bcrypt');
const {
    check,
    validationResult,
    body
} = require('express-validator');
const db = require('../database/models');
const sq = db.sequelize;


const userController = {


    register: async (req, res) => {

        let countries = await db.Countries.findAll().catch(error => console.log(error));

        res.render('users/register', {
            countries,
            title: 'Register',
            bodyName: 'register',
        })
        res.redirect('users/login')


    },
    registerStore: async (req, res) => {

        let user = await db.Users.findOne({
            where: {
                email: req.body.email
            }
        }).then(userFound => {
            let errors = validationResult(req);

            if (errors.isEmpty()) {
                req.body.avatar = req.file.filename;
                req.body.password = bcrypt.hashSync(req.body.password, 10);
                db.Users
                    .create(req.body)
                    .then(productSaved => {
                        res.redirect('/users/login');
                    }).catch(error => console.log(error))
            } else {
                res.render('users/register', {
                    errors: errors.errors,
                    title: 'Register',
                    bodyName: 'register'
                })
            }

            if(userFound.email == req.body.email){
                res.render('users/registerError', {
                    title: 'Register Error',
                    bodyName: 'registerError'
                })
            } 
                            
        }).catch(error => console.log(error)
        )
            
        

        
    },
    showUsers: (req, res) => {
        db.Users
            .findAll({
                order: [
                    ['id', 'DESC']
                ]
            })
            .then(users => {
                return res.render('users/userList', {
                    users,
                    title: 'Users List',
                    bodyName: 'bodyUsersList',
                });
            })
            .catch(error => console.log(error));
    },
    changeRole: function (req, res) {
        db.Users.update({
            role: req.body.role
        }, {
            where: {
                id: req.params.id
            }
        }).then(user => {

            res.redirect('/users/list')
        })

    },

    login: (req, res) => {
        res.render('users/login', {
            title: 'Login',
            bodyName: 'bodyLogin',
        })

    },

    procesarLogin: (req, res) => {
        // Consigo al usuario comparando el mail de cada usuario de la base de datos con el mail que recibo del formulario por el req.body
        db.Users.findOne({
            where: {
                email: req.body.email
            }
        }).then(userFound => {
            if (userFound != undefined) {
                // si da true, comparo la contraseña con el metodo compare de bcrypt la que recibo del formulario del login con las que se guardo en la base de datos con el form del register.

                if (bcrypt.compareSync(req.body.password, userFound.password)) {

                    //Asigamos el usuario que no llego a la session
                    req.session.userId = userFound.id;


                    // Preguntamos si del formulario el input checkbox de recordar mis datos es true, es decir, que esta tildado
                    if (req.body.remember) {
                        // si lo esta entra en el if y creamos una cookie , que recibe el nombre que va a tener la cookie, el valor como segundo parametro (user.id) y la duracion como tercer parametro.
                        res.cookie('userIdCookie', userFound.id, {
                            maxAge: 60000 * 60
                        });
                    }
                    // Redireccionamos al visitante a su perfil
                    res.redirect('/users/profile');
                } else {
                    //En caso contrario le envìo la vista de credenciales invalidas
                    res.render('users/wrongPassword', {
                        title: 'Password Login',
                        bodyName: 'passwordLogin',
                    })

                }

            } else {
                //en caso de que el mail no coincida no realiza el compare y salta a la vista de no existe un usuario registrado con ese mail
                res.render('users/wrongEmail', {
                    title: 'Email Login',
                    bodyName: 'emailLogin',
                })

            }
        }).catch(error => console.log(error));


    },

    editShow: (req, res) => {

        let userFind = db.Users.findByPk(req.params.id);
        let userCountries = db.Countries.findAll();

        Promise.all([userFind, userCountries])
            .then(([user, countries]) => {


                res.render('users/userEdit', {
                    user,
                    countries,
                    title: 'Edit User',
                    bodyName: 'editUser'
                })



            }).catch(error => console.log(error))
    },

    editUser: (req, res) => {

        req.body.avatar = req.file.filename;
        req.body.password = bcrypt.hashSync(req.body.password, 10);
        db.Users
            .update(req.body, {
                where: {
                    id: req.params.id
                }
            }).catch(error => console.log(error));


        return res.redirect('/');


    },
    delete: (req, res) => {
        db.Users.destroy({
            where: {
                id: req.params.id
            }
        }).catch(error => console.log(error))
        
        if (req.body.id == req.session.userId) {
            res.redirect('/users/logout')
        } else {
            res.redirect('/users/list')
        }


    },
    profile: (req, res) => {
        res.render('users/profile', {
            title: 'Profile',
            bodyName: 'profile',
        });
    },

    logout: (req, res) => {
        // Destruir la session
        req.session.destroy();
        // Destruir la cookie
        res.cookie('userIdCookie', null, {
            maxAge: -1
        });
        return res.redirect('/');
    }
}

module.exports = userController;