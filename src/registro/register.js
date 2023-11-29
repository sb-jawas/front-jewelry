import { asyncApiRequest } from "../utils/funcs.js";
import { domain } from "../utils/funcs.js";

document.addEventListener('DOMContentLoaded', function () {
    console.log("El DOM está completamente cargado y parseado");

    //variables para verificar datos
    let pass1 = false;
    let pass2 = false;
    let pass3 = false;
    
    // Maneja el envío del formulario de registro
    document.getElementById('registerForm').addEventListener('submit', function (e) {
        e.preventDefault();
        const newUsername = document.getElementById('newUsername').value;
        const newPassword = document.getElementById('newPassword').value;
        const newEmail = document.getElementById('newEmail').value;

    
    });

  // Validación de campos en tiempo real
  document.getElementById('newUsername').addEventListener('input', function () {
    const username = this.value;
    const validationMessage = document.getElementById('usernameValidationMessage');
    
    if (/^[a-zA-Z0-9_]{4,15}$/.test(username)) {
        validationMessage.textContent = 'Nombre de usuario válido';
        validationMessage.style.color = 'green';
        pass1 = true
        
    } else {
        validationMessage.textContent = 'El nombre de usuario debe tener entre 4 y 10 caracteres y solo puede contener letras, números y _';
        validationMessage.style.color = 'red';
        pass1 = false;
    }
});

document.getElementById('newNombreEmpresa').addEventListener('input', function () {
    const username = this.value;
    const validationMessage = document.getElementById('nombreEmpresaValidationMessage');
    if (/^[a-zA-Z0-9_]{3,20}$/.test(username)) {
        validationMessage.textContent = 'Nombre de empresa válido';
        validationMessage.style.color = 'green';
        pass3 = true;
    } else {
        validationMessage.textContent = 'El nombre de la empresa debe tener entre 3 y 20 caracteres y solo puede contener letras, números y _';
        validationMessage.style.color = 'red';
        pass3 = false; 
    }
});



document.getElementById('newPassword').addEventListener('input', function () {
    const password = this.value;
    const validationMessage = document.getElementById('passwordValidationMessage');
    if (/^[\w*#$.]{6,12}$/.test(password)) {
        validationMessage.textContent = 'Contraseña válida';
        validationMessage.style.color = 'green';
    } else {
        validationMessage.textContent = 'La contraseña debe tener entre 6 y 12 caracteres y solo puede contener letras, números y los caracteres *, #, $ o .';
        validationMessage.style.color = 'red';
    }
});

document.getElementById('confirmPassword').addEventListener('input', function () {
    const password = document.getElementById('newPassword').value;
    const confirmPassword = this.value;
    const validationMessage = document.getElementById('confirmPasswordValidationMessage');
    if (confirmPassword === password) {
        validationMessage.textContent = 'Las contraseñas coinciden';
        validationMessage.style.color = 'green';
        pass2 = true;
    } else {
        validationMessage.textContent = 'Las contraseñas no coinciden';
        validationMessage.style.color = 'red';
        pass2 = false;
    }
});

// Maneja el envío del formulario de registro
    document.getElementById('registerForm').addEventListener('submit', function (e) {
        e.preventDefault();

        const newUsername = document.getElementById('newUsername').value;
        const newPassword = document.getElementById('newPassword').value;
        const newEmail = document.getElementById('newEmail').value;
        const newNombreEmpresa = document.getElementById('newNombreEmpresa').value

        // Realiza la validación final de todos los campos antes de enviar
        const usernameValidationMessage = document.getElementById('usernameValidationMessage');
        const passwordValidationMessage = document.getElementById('passwordValidationMessage');

        if (pass1 && pass2 && pass3) {

                alert("dentro");
            // Realiza la petición al servidor
            let bodyContent =JSON.stringify({
                name: newUsername,
                name_empresa: newNombreEmpresa,
                email: newEmail,
                password: newPassword,
                }) ;
            let url = domain+"/api/users"
            asyncApiRequest("POST",url,bodyContent).then(function(resRegister){
            console.log(resRegister);
    })
           
        } else {
            alert('Por favor, completa todos los campos correctamente.');
        }



        
    });



});


