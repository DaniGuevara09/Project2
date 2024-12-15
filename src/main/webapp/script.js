document.addEventListener('DOMContentLoaded', () => {
    // Seleccionar el botón por su ID
    const button1 = document.getElementById('navigate-button');
    if (button1) {
        button1.addEventListener('click', () => {
            window.location.href = 'mainWindow.html';
        });
    }

    const buttonNew = document.getElementById('buttonNew');
    if (buttonNew) {
        buttonNew.addEventListener('click', () => {
            window.location.href = 'mainWindow.html';
        });
    }

    const icon = document.getElementById('icon');
    if (icon) {
        icon.addEventListener('click', () => {
            window.location.href = 'new.html';
        });
    }
});
