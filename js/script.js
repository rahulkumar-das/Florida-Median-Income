// use this file to add all the javascript code

// JavaScript for Florida County Median Income project

document.addEventListener("DOMContentLoaded", function() {
    // Retrieve county name from URL parameter
    var params = new URLSearchParams(window.location.search);
    var countyName = params.get('county');

    // Define county information
    var countyInfo = {
        hillsborough: {
            name: "Hillsborough",
            description: "Hillsborough County is a county located in the west-central portion of the U.S. state of Florida. As of the 2020 census, the population was 1,471,968, making it the fourth-most populous county in Florida.",
            image: "images/hillsborough.jpg",
            incomeData: {
                labels: ['2016', '2017', '2018', '2019', '2020', '2021'],
                data: [55000, 56000, 57000, 58000, 57000, 59000]
            }
        },
        sarasota: {
            name: "Sarasota",
            description: "Sarasota County is located in southwestern Florida on the Gulf Coast. As of the 2020 United States Census, the population was 433,742.",
            image: "images/sarasota.jpg",
            incomeData: {
                labels: ['2016', '2017', '2018', '2019', '2020', '2021'],
                data: [60000, 61000, 62000, 61000, 63000, 64000]
            }
        },
        charlotte: {
            name: "Charlotte",
            description: "Charlotte County is located in the southwestern portion of the U.S. state of Florida. As of the 2020 census, the population was 192,964.",
            image: "images/charlotte.jpg",
            incomeData: {
                labels: ['2016', '2017', '2018', '2019', '2020', '2021'],
                data: [52000, 53000, 54000, 55000, 54000, 56000]
            }
        },
        orange: {
            name: "Orange",
            description: "Orange County is located in the central portion of the U.S. state of Florida. As of the 2020 census, the population was 1,421,745.",
            image: "images/orange.jpg",
            incomeData: {
                labels: ['2016', '2017', '2018', '2019', '2020', '2021'],
                data: [57000, 59000, 58000, 60000, 59000, 61000]
            }
        },
        miami_dade: {
            name: "Miami-Dade",
            description: "Miami-Dade County is located in the southeastern portion of the U.S. state of Florida. As of the 2020 census, the population was 2,700,794.",
            image: "images/miami_dade.jpg",
            incomeData: {
                labels: ['2016', '2017', '2018', '2019', '2020', '2021'],
                data: [58000, 57000, 59000, 58000, 60000, 59000]
            }
        },
        palm_beach: {
            name: "Palm Beach",
            description: "Palm Beach County is located in the southeastern part of the U.S. state of Florida. As of the 2020 census, the population was 1,496,770.",
            image: "images/palm_beach.jpg",
            incomeData: {
                labels: ['2016', '2017', '2018', '2019', '2020', '2021'],
                data: [59000, 61000, 60000, 62000, 61000, 63000]
            }
        },
        pinellas: {
            name: "Pinellas",
            description: "Pinellas County is located on the west-central coast of the U.S. state of Florida. As of the 2020 census, the population was 979,114.",
            image: "images/pinellas.jpg",
            incomeData: {
                labels: ['2016', '2017', '2018', '2019', '2020', '2021'],
                data: [56000, 57000, 59000, 58000, 60000, 59000]
            }
        },
        duval: {
            name: "Duval",
            description: "Duval County is located in the northeastern part of the U.S. state of Florida. As of the 2020 census, the population was 996,311.",
            image: "images/duval.jpg",
            incomeData: {
                labels: ['2016', '2017', '2018', '2019', '2020', '2021'],
                data: [53000, 54000, 55000, 54000, 56000, 55000]
            }
        }
    };
    

    // Display county information
    var county = countyInfo[countyName];
    if (county) {
        var countyInfoHTML = `
            <h2>${county.name} County</h2>
            <div class="countyDescription">
            <img src="images/${county.name.toLowerCase()}.jpg" alt="${county.name} County">
                <p>${county.description}</p>
            </div>
            <h2>Median Household Income Chart</h2>
            <div class="chartContainer">
                <canvas id="incomeChart"></canvas>
            </div>
            <p>This chart displays the median household income for ${county.name} County from 2016 to 2021.</p>
        `;
        
        document.getElementById("countyInfo").innerHTML = countyInfoHTML;
        
        
        // Display income chart
        var ctx = document.getElementById('incomeChart').getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: county.incomeData.labels,
                datasets: [{
                    label: 'Median Household Income',
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1,
                    data: county.incomeData.data
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
    } else {
        // County not found, display error message
        document.getElementById("countyInfo").innerHTML = "<p>County not found.</p>";
    }
    
});
