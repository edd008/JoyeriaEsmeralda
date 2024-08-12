document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let message = document.getElementById('message').value;
    let error = document.getElementById('error');
    
    if (name === '' || email === '' || message === '') {
        error.textContent = 'Por favor, complete todos los campos.';
        return;
    }
    
    let emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email)) {
        error.textContent = 'Por favor, ingrese un correo electrónico válido.';
        return;
    }
    
    error.textContent = '';
    alert('Formulario enviado con éxito.');
});


