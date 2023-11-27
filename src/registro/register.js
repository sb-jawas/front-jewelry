document.addEventListener('DOMContentLoaded', function () {
    console.log("El DOM está completamente cargado y parseado");
    let  usernameConfirm = false;
    let  passwordConfirm = false;
    
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
         usernameConfirm = true;
    } else {
        validationMessage.textContent = 'El nombre de usuario debe tener entre 4 y 15 caracteres y solo puede contener letras, números y _';
        validationMessage.style.color = 'red';
         usernameConfirm = false;
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

         passwordConfirm = true;
    } else {
        validationMessage.textContent = 'Las contraseñas no coinciden';
        validationMessage.style.color = 'red';
        passwordConfirm = false;
    }
});

// Maneja el envío del formulario de registro
    document.getElementById('registerForm').addEventListener('submit', function (e) {
        e.preventDefault();

        const newUsername = document.getElementById('newUsername').value;
        const newPassword = document.getElementById('newPassword').value;
        const newEmail = document.getElementById('newEmail').value;

        // Realiza la validación final de todos los campos antes de enviar
        const usernameValidationMessage = document.getElementById('usernameValidationMessage');
        const passwordValidationMessage = document.getElementById('passwordValidationMessage');

        if (usernameConfirm == true &&
        passwordConfirm == true) {

                alert("dentro");
            // Realiza la petición al servidor
            fetch('http://127.0.0.1:8000/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: newUsername,
                    email: newEmail,
                    password: newPassword,
                }),
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error en la creación del usuario');
                }
                return response.json();
            })
            .then(data => {
                console.log('Usuario creado con éxito:', data);
                // Aquí puedes redirigir al usuario o mostrar un mensaje de éxito
            })
            .catch(error => {
                console.error('Error:', error);
                // Manejar errores, como mostrar un mensaje al usuario
            });
        } else {
            alert('Por favor, completa todos los campos correctamente.');
        }
    });



});


