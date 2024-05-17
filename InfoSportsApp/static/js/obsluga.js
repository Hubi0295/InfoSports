
function dodaj_usun(){
    console.log("jestem")
    var but1 = document.getElementsByName("toggleWyscig")[0];
    var lista = JSON.parse(localStorage.getItem('lista'));
    if(but1.checked){
        var wyscig = {}
        wyscig.nazwa = document.getElementById("meeting_name").innerHTML;
        wyscig.oficialnaNazwa = document.getElementById("meeting_official_name").innerHTML;
        wyscig.lokalizacja = document.getElementById("meeting_localization").innerHTML;
        wyscig.kraj = document.getElementById("meeting_country").innerHTML;
        wyscig.tor = document.getElementById("meeting_circuit").innerHTML;
        wyscig.data = document.getElementById("meeting_date").innerHTML;
        if (lista===null) lista=[];
         if(!lista.some(obj => obj.id === but1.id)){
            wyscig.id=but1.id;
            lista.push(wyscig);
            localStorage.setItem('lista', JSON.stringify(lista));
            console.log(wyscig);
         }

    }
    else{
        lista = lista.filter(obj => obj.id != but1.id);
        localStorage.setItem('lista', JSON.stringify(lista));
    }
}

