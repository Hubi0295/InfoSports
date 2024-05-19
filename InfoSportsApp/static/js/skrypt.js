document.addEventListener("DOMContentLoaded", function() {
    //obsługa zdarzenia kliknięcia na b1:
    var but1 = document.getElementById("pokazWyniki");
    but1.addEventListener('click', async function(){
            try {
                // Pobranie danych z pliku JSON
                const response = await fetch('http://127.0.0.1:8000/static/zrodloDanych.json');
                let data = await response.json()
                data = Object.entries(data);
                data.sort((a, b) => a[1][0] - b[1][0]);

                // data.sort(function(a, b) {
                // return a[0] > b[0];
                // });
                console.log(data)
                // Pobranie elementu tbody tabeli
                const element = document.getElementById("tabelaWynikow");
                element.innerHTML="";
                let ndane="";
                // Iteracja przez dane i tworzenie wierszy tabeli
                for (const key in data) {
                    ndane="";
                    if (data.hasOwnProperty(key))
                        console.log("key: "+data[key][0]);
                        const value1 = data[key][1][0];
                        console.log("value1: "+value1);
                        const value2 = data[key][1][1];
                        console.log("value2: "+value2);

                        const x=await fetch('https://api.openf1.org/v1/drivers?driver_number='+data[key][0].toString()+'&session_key=latest');
                        const y = await x.json();
                        ndane+="<ul><li class=driver_data>";
                        ndane+=data[key][0]+"  |  "+y[0].full_name+"  |  ";
                        ndane+=value1+"  |  ";
                        ndane+=value2+"  |  ";
                        ndane+="</li></ul>";
                        console.log(ndane);
                        element.innerHTML+=ndane;
                    }

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