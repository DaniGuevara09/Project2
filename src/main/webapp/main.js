document.addEventListener('DOMContentLoaded', () => {
    // Recuperar el monto desde localStorage
    const amount = parseFloat(localStorage.getItem('amountAvailable')) || 0; // Valor predeterminado 0 si no existe

    // Seleccionar el elemento donde se debe mostrar el monto
    const amountElement = document.querySelector('.label-AA .state-layer .label-text');
    if (amountElement) {
        amountElement.textContent = `$ ${amount.toFixed()}`;
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
            categoryElement.textContent = `$ ${categoryBudget.toFixed()}`;
            // Almacenar el presupuesto de la categoría en localStorage
            localStorage.setItem(category, categoryBudget.toString());
            totalCategoryBudget += categoryBudget; // Sumar el presupuesto de la categoría
        }
    });

// Actualizar el monto total disponible en label-text con la suma de las categorías
    if (amountElement) {
        amountElement.textContent = `$ ${totalCategoryBudget.toFixed()}`; // Actualizar con la suma total
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

    // Valores de presupuesto predefinidos para cada categoría
    const budgetValues2 = {
        'Feeding': 210,
        'Transportation': 200,
        'Recreation': 100,
        'Savings': 150,
        'Others': 50
    };

    // Recuperar y mostrar los presupuestos de las categorías
    const categories2 = Object.keys(budgetValues2);

    // Función para mostrar el mensaje de límite mínimo para cada categoría
    function checkMinimumLimit(category, index) {
        const labelMessages = document.querySelectorAll('.label-message');
        const budgetValue = budgetValues2[category]; // Obtener el valor del presupuesto predefinido para la categoría
        const availableValue = document.querySelector(`.text-wrapper-10[data-category="${category}"]`);
        const value = availableValue.textContent.replace('$ ', '');

        // Calcular la diferencia
        const difference = availableValue.textContent.replace('$ ', '') - budgetValue;
        console.log(value, "  -  ", budgetValue, "  =  ", difference)
        console.log(index)

        // Mostrar u ocultar el mensaje según la diferencia
        if (budgetValue >= value || difference <= 20) {
            labelMessages[index].textContent = 'Minimum limit reached';
        } else {
            labelMessages[index].textContent = ''; // Limpiar el mensaje
        }
    }

    // Validar y mostrar mensajes para cada categoría
    categories.reverse().forEach((category, index) => {
        checkMinimumLimit(category, index);
    });
});