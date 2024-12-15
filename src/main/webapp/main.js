document.addEventListener('DOMContentLoaded', () => {
    // Recuperar el monto desde localStorage
    const amount = parseFloat(localStorage.getItem('amountAvailable'));

    // Seleccionar el elemento donde se debe mostrar el monto
    const amountElement = document.querySelector('.label-AA .state-layer .label-text');
    console.log(amountElement)
    amountElement.textContent = `$ ${amount}`
    localStorage.setItem('amountAvailable', amount.toString());

    // Button
    const icon = document.getElementById('icon');
    if (icon) {
        icon.addEventListener('click', () => {
            window.location.href = 'new.html';
        });
    }
});
