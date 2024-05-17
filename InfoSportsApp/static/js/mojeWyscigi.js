function pokazMojeWyscigi(){
    var pole = document.getElementById("panel");
    var lista = JSON.parse(localStorage.getItem('lista'));
    var wynik="";
    for(var i=0; i<lista.length;i++){
        wynik += "<fieldset style=border-radius:10px;margin-top:10px;><div style=margin-bottom:210px; ><ul>";
        wynik+="<li class=driver_data> <h3>Meeting name:</h3><p id=meeting_name>"+lista[i].nazwa+"</p></li>";
        wynik+="<li class=driver_data> <h3>Meeting Official Name:</h3><p id=meeting_official_name>"+lista[i].oficialnaNazwa+"</p></li>";
        wynik+="<li class=driver_data> <h3>Location:</h3><p id=meeting_localization>"+lista[i].lokalizacja+"</p></li>";
        wynik+="<li class=driver_data> <h3>Country Name:</h3><p id=meeting_country>"+lista[i].kraj+"</p></li>";
        wynik+="<li class=driver_data> <h3>Circuit Short Name:</h3><p id=meeting_circuit>"+lista[i].tor+"</p></li>";
        wynik+="<li class=driver_data> <h3>Date Start:</h3><p id=meeting_date>"+lista[i].data+"</p></li>";
        wynik += "</ul><label class=checkbox-f1> <input type=checkbox id="+lista[i].id+" class=checkmark name=toggleWyscig /> </label></div></fieldset>";

    }
    pole.innerHTML=wynik;
}
function pokazFormularzEdycji(){
    var pole = document.getElementById("panel");
    var lista = JSON.parse(localStorage.getItem('lista'));
    var wynik = "";
    wynik+="<form action>";
    wynik+="<label for=Meeting_name>Napisz nazwę wyścigu: </label><input type=text title=NapiszNazweWyscigu required name=Meeting_name id=Meeting_name class=Meeting_name/><br>";
    wynik+="<label for=Meeting_Official_Name>Napisz oficjalną nazwę wyścigu: </label><input type=text title=NapiszNazweWyscigu required name=Meeting_Official_Name id=Meeting_Official_Name class=Meeting_Official_Name/><br>";
    wynik+="<label for=Location>Napisz lokalizacje wyścigu: </label><input type=text title=NapiszNazweWyscigu required name=Location id=Location class=Location/><br>";
    wynik+="<label for=Country_Name>Napisz kraj wyścigu: </label><input type=text title=NapiszNazweWyscigu required name=Country_Name id=Country_Name class=Country_Name/><br>";
    wynik+="<label for=Circuit_Short_Name>Napisz tor gdzie odbywa się wyścig: </label><input type=text title=NapiszNazweWyscigu required name=Circuit_Short_Name id=Circuit_Short_Name class=Circuit_Short_Name/><br>";
    wynik+="<label for=Date_Start>Napisz date odbycia wyścigu: </label><input type=text title=NapiszNazweWyscigu required name=Date_Start id=Date_Start class=Date_Start/><br>";
    wynik+="<button onClick=edytuj()>Edytuj</button>";
    wynik+="</form>";
    pole.innerHTML += wynik
}
function usunMojeWyscigi(){
     var tab = document.getElementsByName("toggleWyscig");
     var op=-1;
     var id=0
     for(let i=0;i<tab.length;i++){
        if(tab[i].checked){
             op = i;
             id = tab[i].id;
             break;
        }
      }
      var lista = JSON.parse(localStorage.getItem('lista'));
      lista.splice(op,1)
      localStorage.setItem('lista', JSON.stringify(lista));
      pokazMojeWyscigi();

}
function edytuj(){
     var tab = document.getElementsByName("toggleWyscig");
     var op=-1;
     var id=0
     for(let i=0;i<tab.length;i++){
        if(tab[i].checked){
             op = i;
             id = tab[i].id;
             break;
        }
      }
      var info={};
      if(op>=0){
            info.data = document.getElementById("Date_Start").value;
      info.kraj = document.getElementById("Country_Name").value;
      info.lokalizacja = document.getElementById("Location").value;
      info.nazwa = document.getElementById("Meeting_name").value;
      info.oficialnaNazwa = document.getElementById("Meeting_Official_Name").value;
      info.tor = document.getElementById("Circuit_Short_Name").value;
      info.id = id
      var lista = JSON.parse(localStorage.getItem('lista'));
      lista[op]=info;
      console.log(info);
      localStorage.setItem('lista', JSON.stringify(lista));
      pokazMojeWyscigi();
      }

}