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

    const value = document.querySelector('.overlap')

    // Recuperar y mostrar los presupuestos de las categorías
    const categories = ['Others', 'Savings', 'Recreation', 'Transportation', 'Feeding'];
    categories.forEach(category => {
        const categoryBudget = parseFloat(localStorage.getItem(category)) || 0; // Valor predeterminado 0 si no existe
        console.log("CAtegori: ",localStorage.getItem(category))
        const categoryElement = document.querySelector(`.text-wrapper-10[data-category="${category}"]`);
        if (categoryElement) {
            categoryElement.textContent = `$ ${categoryBudget.toFixed(2)}`;
            // Almacenar el presupuesto de la categoría en localStorage
            localStorage.setItem(category, categoryBudget.toString());
        }
    });

    // Button
    const icon = document.getElementById('icon');
    if (icon) {
        icon.addEventListener('click', () => {
            window.location.href = 'new.html';
        });
    }
});