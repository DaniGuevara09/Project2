async function fetchBudgetData() {
        const response = await fetch('/Project2_war_exploded/SvExpense'); // Asegúrate de que la URL sea correcta
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return await response.json();
}

async function loadChartData() {
    try {
        const data = await fetchBudgetData();
        const labels = data.map(item => item.date); // Suponiendo que cada objeto tiene una propiedad 'date'
        const totalBudgets = data.map(item => item.totalBudget); // Suponiendo que cada objeto tiene una propiedad 'totalBudget'

        createChart(labels, totalBudgets);
    } catch (error) {
        console.error('Error fetching budget data:', error);
    }
}

function createChart(labels, totalBudgets) {
    const ctx = document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'line', // Tipo de gráfica
        data: {
            labels: labels,
            datasets: [{
                label: 'Total Budget',
                data: totalBudgets,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderWidth: 1,
                fill: true,
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    loadChartData().then(r => {});
});