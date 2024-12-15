document.addEventListener('DOMContentLoaded', () => {
    const buttonNew = document.getElementById('buttonNew');
    if (buttonNew) {
        buttonNew.addEventListener('click', () => {
            window.location.href = 'mainWindow.html';
        });
    }
});
