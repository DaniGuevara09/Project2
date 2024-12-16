document.addEventListener('DOMContentLoaded', () => {
    // Recuperar el monto desde localStorage
    const amount = parseFloat(localStorage.getItem('amountAvailable')) || 0; // Valor predeterminado 0 si no existe
    console.log(`Amount from localStorage: ${amount}`);

    // Mostrar el monto en el elemento correspondiente
    const amountElement = document.querySelector('.label-AA .state-layer .label-text');
    if (amountElement) {
        amountElement.textContent = `$ ${amount}`;
    } else {
        console.warn('No se encontró el elemento para mostrar el monto.');
    }

    // Configurar el evento para guardar un nuevo expense
    const buttonNew = document.querySelector('#buttonNew');
    if (buttonNew) {
        buttonNew.addEventListener('click', () => {
            // Si hay un campo de totalBudget manual, úsalo; de lo contrario, usa amount
            const totalBudgetInput = document.querySelector('#totalBudget');
            const totalBudget = totalBudgetInput ? parseInt(totalBudgetInput.value, 10) : amount;

            const isIncome = document.querySelector('#typeSelect').value === 'Income';
            const description = document.querySelector('#description-txt').value;

            // Obtener la fecha seleccionada
            const dateInput = document.querySelector('#date');
            const date = dateInput ? dateInput.value : null; // Obtener la fecha

            // Obtener las categorías seleccionadas
            const categories = [];
            const selectedCategories = document.querySelectorAll('#categorySelect option:checked');
            selectedCategories.forEach(option => {
                categories.push(option.value); // Solo almacenar el nombre de la categoría
            });

            // Crear el objeto expense
            const expense = {
                totalBudget: totalBudget,
                isIncome: isIncome,
                description: description,
                date: date, // Agregar la fecha al objeto expense
                categories: categories
            };

            console.log('Expense data to send:', expense);

            // Convertir a JSON y enviar con AJAX
            const expenseJson = JSON.stringify(expense);

            const xhr = new XMLHttpRequest();
            xhr.open('POST', 'SvExpense', true);
            xhr.setRequestHeader('Content-Type', 'application/json');

            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    console.log('Respuesta del servidor:', xhr.responseText);
                    alert('Expense saved successfully!');

                    // Almacenar los valores en localStorage antes de redirigir
                    localStorage.setItem('lastTotalBudget', totalBudget);
                    localStorage.setItem('lastIsIncome', isIncome);
                    localStorage.setItem('lastCategory', JSON.stringify(categories)); // Almacenar como JSON

                    window.location.href = 'mainWindow.html'; // Redireccionar después del éxito
                } else if (xhr.readyState === 4) {
                    console.error('Error al guardar el expense:', xhr.responseText);
                    alert('Error saving expense!');
                }
            };

            xhr.send(expenseJson);
        });
    } else {
        console.error('No se encontró el botón para guardar.');
    }

    // Configurar el combobox para el tipo de transacción
    const typeOptions = ['Income', 'Expense'];
    const typeSelect = document.querySelector('#typeSelect');
    if (typeSelect) {
        typeOptions.forEach(type => {
            const option = document.createElement('option');
            option.value = type;
            option.textContent = type;
            typeSelect.appendChild(option);
        });
    } else {
        console.error('No se encontró el select para el tipo.');
    }

    // Configurar el combobox para las categorías
    const categoryOptions = ['Food', 'Transportation', 'Entertainment', 'Savings', 'Others'];
    const categorySelect = document.querySelector('#categorySelect');
    if (categorySelect) {
        categoryOptions.forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            categorySelect.appendChild(option);
        });
    } else {
        console.error('No se encontró el select para las categorías.');
    }
});