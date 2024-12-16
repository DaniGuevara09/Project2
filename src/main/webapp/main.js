// Código para inicializar valores en localStorage y actualizar la interfaz de usuario
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar valores en localStorage si no existen
    const categories = {
        Feeding: 0,
        Transportation: 0,
        Recreation: 0,
        Savings: 0,
        Others: 0
    };

    // Guardar los valores en localStorage
    for (const [key, value] of Object.entries(categories)) {
        if (localStorage.getItem(key) === null) {
            localStorage.setItem(key, value);
        }
    }

    // Recuperar el monto disponible desde localStorage
    const amount = parseFloat(localStorage.getItem('amountAvailable')) || 0;

    // Seleccionar el elemento donde se debe mostrar el monto
    const amountElement = document.querySelector('.label-AA .state-layer .label-text');
    if (amountElement) {
        amountElement.textContent = `$ ${amount.toFixed(2)}`;
    }

    // Actualizar la interfaz de usuario con los valores de las categorías
    const categoryElements = {
        Feeding: document.querySelectorAll('.text-wrapper-10')[0],
        Transportation: document.querySelectorAll('.text-wrapper-10')[1],
        Recreation: document.querySelectorAll('.text-wrapper-10')[2],
        Savings: document.querySelectorAll('.text-wrapper-10')[3],
        Others: document.querySelectorAll('.text-wrapper-10')[4]
    };

    for (const category in categoryElements) {
        const value = localStorage.getItem(category);
        if (categoryElements[category]) {
            categoryElements[category].textContent = `$ ${parseFloat(value).toFixed(2)}`;
        }
    }

    // Button
    const icon = document.getElementById('icon');
    if (icon) {
        icon.addEventListener('click', () => {
            window.location.href = 'new.html';
        });
    }
});