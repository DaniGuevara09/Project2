// Seleccionar el botón por su ID
const button = document.getElementById('navigate-button');

// Agregar un evento para redirigir a mainWindow.html al hacer clic
button.addEventListener('click', () => {
    window.location.href = 'mainWindow.html';
});
