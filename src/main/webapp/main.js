document.addEventListener('DOMContentLoaded', () => {
    // Recuperar el monto desde localStorage
    const amount = parseFloat(localStorage.getItem('amountAvailable')) || 0; // Valor predeterminado 0 si no existe

    // Seleccionar el elemento donde se debe mostrar el monto
    const amountElement = document.querySelector('.label-AA .state-layer .label-text');
    if (amountElement) {
        amountElement.textContent = `$ ${amount.toFixed(2)}`; // Mostrar el monto con dos decimales
    } else {
        console.warn('No se encontró el elemento para mostrar el monto.');
    }

    // Almacenar el monto en localStorage
    localStorage.setItem('amountAvailable', amount.toString());

    // Configurar el evento para el ícono
    const icon = document.getElementById('icon');
    if (icon) {
        icon.addEventListener('click', () => {
            window.location.href = 'new.html'; // Redirigir a la página new.html
        });
    } else {
        console.error('No se encontró el ícono para la navegación.');
    }

    // Función para actualizar el presupuesto de la categoría
    function updateCategoryBudget(category, amount, isIncome) {
        const categoryElement = document.querySelector(`.${category.toLowerCase()} .assistive-chip .label-text`);
        if (categoryElement) {
            let currentBudget = parseFloat(categoryElement.textContent.replace('$', '').replace(',', '')) || 0;
            if (isIncome) {
                currentBudget += amount; // Sumar si es ingreso
            } else {
                currentBudget -= amount; // Restar si es gasto
            }
            categoryElement.textContent = `$ ${currentBudget.toFixed(2)}`; // Actualizar el texto con el nuevo presupuesto
        } else {
            console.error(`No se encontró el elemento para la categoría: ${category}`);
        }
    }

    // Configurar el evento para guardar un nuevo movimiento
    const buttonNew = document.querySelector('#buttonNew'); // Asegúrate de que este botón exista en tu HTML
    if (buttonNew) {
        buttonNew.addEventListener('click', () => {
            const totalBudgetInput = document.querySelector('#totalBudget'); // Asegúrate de que este input exista
            const totalBudget = totalBudgetInput ? parseFloat(totalBudgetInput.value) : 0;

            const isIncome = document.querySelector('#typeSelect').value === 'Income';
            const selectedCategories = document.querySelectorAll('#categorySelect option:checked');

            selectedCategories.forEach(option => {
                const category = option.value;
                updateCategoryBudget(category, totalBudget, isIncome); // Actualizar el presupuesto de la categoría
            });
        });
    } else {
        console.error('No se encontró el botón para guardar el movimiento.');
    }
});