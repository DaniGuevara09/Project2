document.addEventListener('DOMContentLoaded', () => {
    // Función para calcular la suma de todos los presupuestos de las categorías
    const calculateTotalAmount = () => {
        const categoryOptions = ['Feeding', 'Transportation', 'Recreation', 'Savings', 'Others'];
        let totalAmount = 0;

        categoryOptions.forEach(category => {
            const categoryBudget = parseFloat(localStorage.getItem(category)) || 0;
            totalAmount += categoryBudget;
        });

        return totalAmount;
    };

    // Recuperar el monto desde localStorage
    const amount = calculateTotalAmount(); // Sumar todos los valores de las categorías
    console.log(`Total amount calculated from categories: ${amount}`);

    // Mostrar el monto en el elemento correspondiente
    const amountElement = document.querySelector('.label-AA .state-layer .label-text');
    if (amountElement) {
        amountElement.textContent = `$ ${amount.toFixed(2)}`;
    } else {
        console.warn('No se encontró el elemento para mostrar el monto.');
    }

    // Configurar el evento para guardar un nuevo movimiento
    const buttonNew = document.querySelector('#buttonNew');
    if (buttonNew) {
        buttonNew.addEventListener('click', () => {
            // Obtener el valor del campo de Amount
            const amountInput = document.getElementById('editableField');
            const amountValue = parseFloat(amountInput.value);

            // Validar que el monto sea mayor que 0
            if (amountValue <= 0) {
                alert('Please enter an amount greater than 0.'); // Mensaje de error
                amountInput.focus(); // Enfocar el campo de entrada
                return; // Salir de la función para evitar el envío
            }

            // Obtener el tipo de transacción
            const isIncome = document.querySelector('#typeSelect').value === 'Income';

            // Validar si es un gasto y el monto es menor que el disponible
            if (!isIncome && amountValue > amount) {
                alert(`You cannot add an expense greater than $${amount}.`); // Mensaje de error
                amountInput.focus(); // Enfocar el campo de entrada
                return; // Salir de la función para evitar el envío
            }

            // Obtener la categoría seleccionada
            const selectedCategory = document.querySelector('#categorySelect').value;

            // Recuperar el valor de la categoría desde localStorage
            const categoryBudget = parseFloat(localStorage.getItem(selectedCategory)) || 0;

            // Validar si es un gasto y el monto es mayor que el presupuesto de la categoría
            if (!isIncome && amountValue > categoryBudget) {
                alert(`You cannot add an expense greater than the budget for ${selectedCategory}, which is $${categoryBudget.toFixed(2)}.`); // Mensaje de error
                amountInput.focus(); // Enfocar el campo de entrada
                return; // Salir de la función para evitar el envío
            }

            // Si hay un campo de totalBudget manual, úsalo; de lo contrario, usa amount
            const totalBudgetInput = document.querySelector('#totalBudget');
            let totalBudget = totalBudgetInput ? parseInt(totalBudgetInput.value, 10) : amount;

            // Si es un ingreso, sumar el amountValue al totalBudget y actualizar el amount
            if (isIncome) {
                totalBudget += amountValue;
                // Actualizar el amount en localStorage
                const newAmount = amount + amountValue;
                localStorage.setItem('amountAvailable', newAmount.toString());
                // Actualizar el elemento de la interfaz de usuario
                amountElement.textContent = `$ ${newAmount.toFixed(2)}`;
            }

            // Actualizar el presupuesto de la categoría
            const newCategoryBudget = isIncome ? categoryBudget + amountValue : categoryBudget - amountValue;
            localStorage.setItem(selectedCategory, newCategoryBudget.toString()); // Almacenar el nuevo presupuesto en localStorage

            // Actualizar el elemento de la interfaz de usuario para la categoría
            const categoryElement = document.querySelector(`.text-wrapper-10[data-category="${selectedCategory}"]`);
            if (categoryElement) {
                categoryElement.textContent = `$ ${newCategoryBudget.toFixed(2)}`;
            }

            const description = document.querySelector('#description-txt').value;

            // Obtener la fecha seleccionada
            const dateInput = document.querySelector('#date');
            const date = dateInput ? dateInput.value : null; // Obtener la fecha
            // Obtener las categorías seleccionadas
            const categories = [];
            const selectedCategories = document.querySelectorAll('#categorySelect option:checked');
            selectedCategories.forEach(option => {
                categories.push({ name: option.value, budget: 0, maxBudget: 0 });
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
    const categoryOptions = ['Feeding', 'Transportation', 'Recreation', 'Savings', 'Others'];
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