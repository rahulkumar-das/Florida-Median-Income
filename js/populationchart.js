document.addEventListener("DOMContentLoaded", function() {
    // Define population data
    var populationData = {
        "Charlotte County": 209686,
        "Duval County": 1044633,
        "Hillsborough County": 1557655,
        "Miami-Dade County": 2700678,
        "Orange County": 1491071,
        "Palm Beach County": 1547735,
        "Pinellas County": 961400,
        "Sarasota County": 475474
    };

    // Extract county names and populations from the data
    var counties = Object.keys(populationData);
    var populations = Object.values(populationData);

    // Define colors for each county
    var colors = [
        'rgba(255, 99, 132, 0.2)', // Red
        'rgba(54, 162, 235, 0.2)', // Blue
        'rgba(255, 206, 86, 0.2)', // Yellow
        'rgba(75, 192, 192, 0.2)', // Green
        'rgba(153, 102, 255, 0.2)', // Purple
        'rgba(255, 159, 64, 0.2)', // Orange
        'rgba(255, 99, 132, 0.2)', // Red (again)
        'rgba(54, 162, 235, 0.2)'  // Blue (again)
    ];

    // Create the chart
    var ctx = document.getElementById('populationChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: counties,
            datasets: [{
                label: 'Population 2024',
                backgroundColor: colors,
                borderColor: 'rgba(0, 0, 0, 1)',
                borderWidth: 1,
                data: populations
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        suggestedMax: Math.max(...populations) * 1.1  // Sets a maximum limit on the y-axis
                    }
                }]
            }
        }
    });
});
