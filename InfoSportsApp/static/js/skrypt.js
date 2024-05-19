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
                const element = document.getElementById("tabelaWynikow");
                element.innerHTML="";
                let ndane="";
                // Iteracja przez dane i tworzenie wierszy tabeli
                for (const key in data) {
                    ndane="";
                    if (data.hasOwnProperty(key)) {
                        const value1 = data[key][0];
                        const value2 = data[key][1];
                        const x=await fetch('https://api.openf1.org/v1/drivers?driver_number='+key+'&session_key=latest');
                        const y = await x.json();
                        ndane+="<ul><li class=driver_data>";
                        ndane+=key+"  |  "+y[0].full_name+"  |  ";
                        ndane+=value1+"  |  ";
                        ndane+=value2+"  |  ";
                        ndane+="</li></ul>";
                        console.log(ndane);
                        element.innerHTML+=ndane;
                    }
                }

                console.log(ndane);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
     })

    },
    false);
(function() {
    // Funkcja do kliknięcia przycisku
    function kliknijPrzycisk() {
        var przycisk = document.getElementById('pokazWyniki');
        if (przycisk) {
            przycisk.click();
        }
    }

    // Ustawienie interwału, który będzie klikał przycisk co 5 sekund (5000 milisekund)
    setInterval(kliknijPrzycisk, 15000);
})();

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}