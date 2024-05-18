document.addEventListener("DOMContentLoaded", function() {
    //obsługa zdarzenia kliknięcia na b1:
    var but1 = document.getElementById("pokazWyniki");
    but1.addEventListener('click', async function(){
            try {
                // Pobranie danych z pliku JSON
                const response = await fetch('http://127.0.0.1:8000/static/zrodloDanych.json');

                const data = Object.fromEntries(
                    Object.entries(await response.json()).sort(([,a], [,b]) => a[0] - b[0])
                );
                // Pobranie elementu tbody tabeli
                const element = document.getElementById("tabelaWyników");
                element.innerHTML="";

                // Iteracja przez dane i tworzenie wierszy tabeli
                for (const key in data) {
                    if (data.hasOwnProperty(key)) {
                        const value1 = data[key][0];
                        const value2 = data[key][1];
                        element.innerHTML+=key+" ";
                        element.innerHTML+=value1+" ";
                        element.innerHTML+=value2+" <br>";
                    }
                }

            } catch (error) {
                console.error('Error fetching data:', error);
            }
     })

    },
    false);


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}