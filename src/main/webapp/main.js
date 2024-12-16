document.addEventListener('DOMContentLoaded', () => {
    // Recuperar el monto desde localStorage
    const amount = parseFloat(localStorage.getItem('amountAvailable')) || 0; // Valor predeterminado 0 si no existe

    // Seleccionar el elemento donde se debe mostrar el monto
    const amountElement = document.querySelector('.label-AA .state-layer .label-text');
    if (amountElement) {
        amountElement.textContent = `$ ${amount.toFixed(2)}`;
    }

    // Almacenar el monto en localStorage
    localStorage.setItem('amountAvailable', amount.toString());

    // Recuperar y mostrar los presupuestos de las categorías
    const categories = ['Others', 'Savings', 'Recreation', 'Transportation', 'Feeding'];
    let totalCategoryBudget = 0; // Variable para almacenar la suma de los presupuestos de las categorías

    categories.forEach(category => {
        const categoryBudget = parseFloat(localStorage.getItem(category)) || 0; // Valor predeterminado 0 si no existe
        const categoryElement = document.querySelector(`.text-wrapper-10[data-category="${category}"]`);
        if (categoryElement) {
            categoryElement.textContent = `$ ${categoryBudget.toFixed(2)}`;
            // Almacenar el presupuesto de la categoría en localStorage
            localStorage.setItem(category, categoryBudget.toString());
            totalCategoryBudget += categoryBudget; // Sumar el presupuesto de la categoría
        }
    });

// Actualizar el monto total disponible en label-text con la suma de las categorías
    if (amountElement) {
        amountElement.textContent = `$ ${totalCategoryBudget.toFixed(2)}`; // Actualizar con la suma total
    }

    // Validar los inputs de presupuesto
    const budgetInputs = document.querySelectorAll('.label-text');
    budgetInputs.forEach(input => {
        input.addEventListener('input', () => {
            // Asegurarse de que el valor sea un número mayor o igual a cero
            if (input.value < 0) {
                input.value = 0; // Restablecer a 0 si el valor es negativo
            }
        });
    });

    // Button
    const icon = document.getElementById('icon');
    if (icon) {
        icon.addEventListener('click', () => {
            window.location.href = 'new.html';
        });
    }
});