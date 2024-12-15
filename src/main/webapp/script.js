document.addEventListener('DOMContentLoaded', () => {
    // Seleccionar el botón y el campo de entrada
    const navigateButton = document.getElementById('navigate-button');
    const labelTextElement = document.getElementById('editableField');

    navigateButton.addEventListener('click', () => {
        // Obtener el valor del campo de entrada
        const labelText = labelTextElement.value.trim();

        // Convertir el valor a un número
        const amount = parseFloat(labelText);

        // Verificar si el valor es válido y mayor a cero
        if (!isNaN(amount) && amount >= 0) {
            // Guardar el monto en localStorage
            localStorage.setItem('amountAvailable', amount);

            // Redirigir a la siguiente página
            window.location.href = 'mainWindow.html';
        } else {
            // Mostrar una advertencia si el valor no es válido
            alert('The amount must be a number greater than $0 to continue');
        }
    });
});