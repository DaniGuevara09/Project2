document.addEventListener('DOMContentLoaded', () => {
    const icon = document.getElementById('icon');
    if (icon) {
        icon.addEventListener('click', () => {
            window.location.href = 'new.html';
        });
    }
});
