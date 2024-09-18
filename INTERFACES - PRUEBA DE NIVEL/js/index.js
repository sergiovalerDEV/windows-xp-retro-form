document.addEventListener('DOMContentLoaded', () => {
    const nombreInput = document.getElementById('nombre');
    const apellidosInput = document.getElementById('apellidos');
    const emailInput = document.getElementById('email');
    const edadInput = document.getElementById('edad');
    const contraseñaInput = document.getElementById('contraseña');
    const errorSound = new Audio('./audio/Windows XP Error Sound.mp3');
    const clickSound = new Audio('./audio/Click sound.mp3');
    const form = document.getElementById('myForm');

    // Función para validar el campo Nombre
    function checkNameInput() {
        const name = nombreInput.value;
        if (/\d/.test(name) || name === "") {
            errorSound.play();
            document.getElementById("nombre-error").style.display = "block";
            return false;
        } else {
            document.getElementById("nombre-error").style.display = "none";
            return true;
        }
    }

    // Función para validar el campo Apellidos
    function checkSurnameInput() {
        const surname = apellidosInput.value;
        if (/\d/.test(surname) || surname === "" || !/\s/.test(surname)) {
            errorSound.play();
            document.getElementById("apellidos-error").style.display = "block";
            apellidosInput.value = "";
            return false;
        } else {
            document.getElementById("apellidos-error").style.display = "none";
            return true;
        }
    }

    // Función para validar el campo Email
    function checkEmailInput() {
        const email = emailInput.value;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            errorSound.play();
            document.getElementById("email-error").style.display = "block";
            return false;
        } else {
            document.getElementById("email-error").style.display = "none";
            return true;
        }
    }

    // Función para validar el campo Contraseña
    function checkPasswordInput() {
        const password = contraseñaInput.value;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
        if (!passwordRegex.test(password)) {
            errorSound.play();
            document.getElementById("contraseña-error").style.display = "block";
            return false;
        } else {
            document.getElementById("contraseña-error").style.display = "none";
            return true;
        }
    }

    // Función para validar el campo Edad
    function checkAgeInput() {
        const edad = parseInt(edadInput.value, 10);
        if (isNaN(edad) || edad < 18 || edad > 120) {
            errorSound.play();
            document.getElementById("edad-error").style.display = "block";
            return false;
        } else {
            document.getElementById("edad-error").style.display = "none";
            return true;
        }
    }


    //Función para ejecutar el sonido de click al presionar aceptar o X en las ventanas de errores

    
    // Función para cerrar la ventana de error específica
    function closeErrorWindow(errorId) {
        document.getElementById(errorId).style.display = 'none';
    }

    function setupErrorCloseListeners() { //Ver, solo falta esto por pulir
        const errorIds = ['nombre-error', 'apellidos-error', 'email-error', 'contraseña-error', 'edad-error'];
        errorIds.forEach(id => {
            const closeButton = document.getElementById(id + '-close');
            const acceptButton = document.getElementById('error-accept-' + id);
            if (closeButton) {
                closeButton.addEventListener('click', () => {
                    closeErrorWindow(id);
                    clickSound.play(); // Reproduce el sonido de clic
                });
            }
            if (acceptButton) {
                acceptButton.addEventListener('click', () => {
                    closeErrorWindow(id);
                    clickSound.play(); // Reproduce el sonido de clic
                });
            }
        });
    }
    setupErrorCloseListeners();


    // Comprobaciones varias al enviar el formulario
    document.getElementById('send-button').addEventListener('click', (event) => {
        event.preventDefault(); // Evita el comportamiento por defecto del formulario

        // Ejecutar todas las validaciones
        const validName = checkNameInput();
        const validSurname = checkSurnameInput();
        const validEmail = checkEmailInput();
        const validPassword = checkPasswordInput();
        const validAge = checkAgeInput();

        // Si todas las validaciones son correctas, enviar el formulario
        if (validName && validSurname && validEmail && validPassword && validAge) {
            clickSound.play();
            form.submit(); // Envía el formulario
        }
    });
});