
const fs = require('fs');
const bcrypt = require('bcrypt');

//ruta donde se almacenan los usuarios que se crean en el form register
const userFilePath = __dirname + '/../data/users.json';


function getAllUsers () {
//leemos el archivo que se guardo con fs.readFileSync, esta funcion recibe la ruta del archivo que se quiere leer y la codificacion
    let usersFileContent = fs.readFileSync(userFilePath, 'utf-8');
    //despues de leerlo se crea una variable en la que preguntamos si lo que se leyo esta vacio si es true se crea un array y si es falso parseamos el contenido que es un string y lo pasamos a ser array con la funcion JSON.parse
	let finalUsers = usersFileContent == '' ? [] : JSON.parse(usersFileContent); 
	return finalUsers;
}

function storeUser (newUserData) {
    // recibe a todos los usuarios
    let allUsers = getAllUsers();
    //luego se pushea el usuario recibido
    allUsers.push(newUserData);
    //luego se almacena de vuelta a todos los usuarios con fs que recibe la ruta y lo que queremos guardar que como es json se tiene que pasar a string
	fs.writeFileSync(userFilePath, JSON.stringify(allUsers, null, ' '));
}

function generateUserId () {
    // recibe todos los usuarios
    let allUsers = getAllUsers();
    //si lo que recibimos esta vacio el valor será 1
	if (allUsers.length == 0) {
		return 1;
	} // en caso contrario tomamos al ultimos usuario con pop() y le tomamos la propiedad id y le sumamos 1
	let lastUser = allUsers.pop();
	return lastUser.id + 1;
}

function getUserByEmail(email) {
    // recibe a todos los usuarios
    let allUsers = getAllUsers();
    //luego con el metodo find preguntamos si el usuario en su propiedad mail es igual al mail que estamos recibiendo del formulario en el req.body.email
	let userToFind = allUsers.find(oneUser => oneUser.email == email);
	return userToFind;
}

function getUserById(id) {
    // Es igual al de mail pero con el id
	let allUsers = getAllUsers();
	let userToFind = allUsers.find(oneUser => oneUser.id == id);
	return userToFind;
}

const userController = {
    register: (req, res) => {
        const isLogged = req.session.userId ? true : false;
		let userLogged = getUserById(req.session.userId);
        res.render('register', {
            title: 'Register',
            bodyName: 'register', 
            isLogged, 
            userLogged
        })

    },
    login: (req, res) => {
        const isLogged = req.session.userId ? true : false;
		let userLogged = getUserById(req.session.userId);
        res.render('login', {
            title: 'Login',
            bodyName: 'bodyLogin', 
            isLogged, 
            userLogged
        })

    },
    registerStore: (req, res) => {
        //para registrar los usuarios hacemos un obejto literal le asignamos la propiedad y como valor pasamos lo que se recibe del formulario de registro en el req.body
            let userFinalData = {
                id: generateUserId(),
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                fecha: req.body.fecha,
                pais: req.body.pais,
                ciudad: req.body.ciudad,
                email: req.body.mail,
                password: bcrypt.hashSync(req.body.pass, 10),
                avatar: req.file.filename,
            };
            
            // Guardar al usario con la funcion store 
    
            storeUser(userFinalData);
            
            // Redirección al login
            res.redirect('/users/login');

    },
    procesarLogin: (req, res) => {
        // Consigo al usuario comparando el mail de cada usuario de la base de datos con el mail que recibo del formulario por el req.body
        let user = getUserByEmail(req.body.email);
        
        //Luego pregunto si el usuario no esta vacio 
		if (user != undefined) {
            // si da true, comparo la contraseña con el metodo compare de bcrypt la que recibo del formulario del login con las que se guardo en la base de datos con el form del register.
			
			if (bcrypt.compareSync(req.body.password, user.password)) {
                //Asigamos el usuario que no llego a la session
                req.session.userId = user.id;

                // Preguntamos si del formulario el input checkbox de recordar mis datos es true, es decir, que esta tildado
                if (req.body.remember) {
                    // si lo esta entra en el if y creamos una cookie , que recibe el nombre que va a tener la cookie, el valor como segundo parametro (user.id) y la duracion como tercer parametro.
					res.cookie('userIdCookie', user.id, { maxAge: 60000 * 60 });
                }
                // Redireccionamos al visitante a su perfil
                res.redirect('/users/profile');
			} else {
                //En caso contrario le envìo la vista de credenciales invalidas
                res.send('Credenciales invalidas')

                }
			
		} else {
            //en caso de que el mail no coincida no realiza el compare y salta a la vista de no existe un usuario registrado con ese mail
            
			res.send('No hay usuarios registrados con ese email');
		}
    },
    profile: (req, res) => {
        const isLogged = req.session.userId ? true : false;
		let userLogged = getUserById(req.session.userId);
        res.render('profile', {
        title: 'Profile',
        bodyName: 'profile',
        isLogged,
        userLogged,

    });
    },
    logout: (req, res) => {
		// Destruir la session
		req.session.destroy();
		// Destruir la cookie
		res.cookie('userIdCookie', null, { maxAge: -1 });
		return res.redirect('/');
	}
}

module.exports = userController;