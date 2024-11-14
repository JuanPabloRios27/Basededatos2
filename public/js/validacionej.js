document.addEventListener('DOMContentLoaded', () => {
    const loginButton = document.querySelector('.login-button');

    loginButton.addEventListener('click', (event) => {
        event.preventDefault(); 
        
        const username = document.querySelector('input[type="text"]').value;
        const password = document.querySelector('input[type="password"]').value;

     
        if (!username || !password) {
            alert('Rellene los campos de usuario y contraseña');
        } else {
            // Si los campos están completos, realiza la solicitud de inicio de sesión
            loginUser(username, password);
        }
    });
});


async function loginUser(username, password) {
    try {
        const response = await fetch('/api/auth/login', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (response.ok) {
            
            alert(data.message);
            window.location.href = '../navegacion/menuinicio.html'; 
        } else {
          
            alert(data.message || 'Error en el inicio de sesión');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error en el servidor');
    }
}
