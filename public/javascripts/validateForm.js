const form = document.querySelector('form.user');


let formFields = Array.from(form.elements);

// Sacamos al botón del array de campos
formFields.pop();
formFields.pop();
formFields.pop();
formFields.pop();

let fieldsWithErrors = {};

// Iteramos sobre el array de campos
for (const oneField of formFields) {
		oneField.addEventListener('blur', function () {
			// Capturamos el valor del campo
			let fieldValue = oneField.value.trim();
	
			// trim() es un método que elimina los espacios vacíos al principio y al final
	
			// Sí el valor del campo está vacío
			if (validator.isEmpty(fieldValue))  {
				// Si el campo tiene error, agregamos la clase de boostrap 'is-invalid'
				oneField.classList.add('is-invalid');
	
	
				// Insertamos un mensaje de error en el div 'invalid-feedback'
				oneField.nextElementSibling.innerHTML = `El campo <b>${oneField.getAttribute('data-name')}</b> es obligatorio`;
				// Al objeto literal de errores, la asignamos una prop con el nombre del campo y valor true
				fieldsWithErrors[oneField.name] = true;
			} else {
				// Cuando no hay error, eliminamos la clase por si la tuviera
				oneField.classList.remove('is-invalid');
				oneField.classList.add('is-valid');
				// Eliminamos el mensaje de error en el div 'invalid-feedback'
				oneField.nextElementSibling.innerHTML = '';
				// Al objeto literal de errores, le eliminamos la prop del campo que tenía error
				delete fieldsWithErrors[oneField.name];
			}

	});

	if(oneField.name == 'avatar'){
		oneField.addEventListener('blur', function () {
			
			let fieldValue = oneField.value.trim();
			let avatarError = document.querySelector('div.avatar-error');
	
			
			if (validator.isEmpty(fieldValue))  {
				
				oneField.classList.add('is-invalid');
	
				avatarError.innerHTML = `El campo <b>${oneField.getAttribute('data-name')}</b> es obligatorio`;
				
				fieldsWithErrors[oneField.name] = true;
			} else {

				oneField.classList.remove('is-invalid');
				oneField.classList.add('is-valid');
				
				avatarError.innerHTML = '';
				
				delete fieldsWithErrors[oneField.name];
			}
	})}
	


	
	if(oneField.name === 'password'){
		oneField.addEventListener('blur', function () {
			// Capturamos lo que se escribío en el campo email
			let fieldValue = oneField.value.trim();

			// Si el valor del campo NO es un formato de correo electrónico
			if (!validator.isLength(fieldValue, {min:8})) {
				// Si el campo tiene error, agregamos la clase de boostrap 'is-invalid'
				oneField.classList.remove('is-valid');
				oneField.classList.add('is-invalid');
				// Insertamos un mensaje de error en el div 'invalid-feedback'
				oneField.nextElementSibling.innerHTML = `El campo <b>${oneField.getAttribute('data-name')}</b> debe contener al menos 8 carácteres`;
				// Al objeto literal de errores, la asignamos una prop con el nombre del campo y valor true
				fieldsWithErrors[oneField.name] = true;
	
			} else {
				// Cuando no hay error, eliminamos la clase por si la tuviera
				oneField.classList.remove('is-invalid');
				oneField.classList.add('is-valid');
				// Eliminamos el mensaje de error en el div 'invalid-feedback'
				oneField.nextElementSibling.innerHTML = '';
				// Al objeto literal de errores, le eliminamos la prop del campo que tenía error
				delete fieldsWithErrors[oneField.name];
			}
		})

	}

	// Si el nombre del campo es 'email'
	if (oneField.name === 'email') {
		oneField.addEventListener('blur', function () {
			// Capturamos lo que se escribío en el campo email
			let fieldValue = oneField.value.trim();

			// Si el valor del campo NO es un formato de correo electrónico
			if (!validator.isEmail(fieldValue)) {
				// Si el campo tiene error, agregamos la clase de boostrap 'is-invalid'
				oneField.classList.remove('is-valid');
				oneField.classList.add('is-invalid');
				// Insertamos un mensaje de error en el div 'invalid-feedback'
				oneField.nextElementSibling.innerHTML = `El campo <b>${oneField.getAttribute('data-name')}</b> debe contener un formato de correo electrónico`;
				// Al objeto literal de errores, la asignamos una prop con el nombre del campo y valor true
				fieldsWithErrors[oneField.name] = true;
				
			} else {
				// Cuando no hay error, eliminamos la clase por si la tuviera
				oneField.classList.remove('is-invalid');
				oneField.classList.add('is-valid');
				// Eliminamos el mensaje de error en el div 'invalid-feedback'
				oneField.nextElementSibling.innerHTML = '';
				// Al objeto literal de errores, le eliminamos la prop del campo que tenía error
				delete fieldsWithErrors[oneField.name];
			}
		})
	}
}

form.addEventListener('submit', function (event) {

	// verificamos SI hay campos vacíos
	for (const oneField of formFields) {
		let fieldValue = oneField.value.trim();
		if (validator.isEmpty(fieldValue)) {
			fieldsWithErrors[oneField.name] = true;
		}
	}

	console.log(fieldsWithErrors);	

	if (Object.keys(fieldsWithErrors).length > 0) {
		let errorMsg = document.querySelector('div.error-msg');
		
		
		event.preventDefault();
		errorMsg.innerHTML = 'Debes completar correctamente el formulario'
	
	}
})