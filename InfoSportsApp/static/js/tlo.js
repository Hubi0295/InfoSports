
document.addEventListener("DOMContentLoaded", function() {
    // Dodawanie klasy do <main> po najechaniu myszą
    var mainElement = document.querySelector('main');
    var football=document.getElementById('football');
    var tenis=document.getElementById('tenis');
    var f1=document.getElementById('f1');
    var home=document.getElementById('home');

    if (football != null){
        football.addEventListener('mouseenter', function() {
        mainElement.classList.add('change-background-to-football');
    });
    }
    if (tenis != null){
        tenis.addEventListener('mouseenter', function() {
        mainElement.classList.add('change-background-to-tenis');
    });
    }
    if (f1!= null){
        f1.addEventListener('mouseenter', function() {
        mainElement.classList.add('change-background-to-f1');
    });
    }
    if (home != null){
        home.addEventListener('mouseenter', function() {
        mainElement.classList.add('change-background-to-home');
    });
    }


    if (football != null){
        football.addEventListener('mouseleave', function() {
        mainElement.classList.remove('change-background-to-football');
    });
    }
    if (tenis != null){
        tenis.addEventListener('mouseleave', function() {
        mainElement.classList.remove('change-background-to-tenis');
    });
    }
    if (f1!= null){
        f1.addEventListener('mouseleave', function() {
        mainElement.classList.remove('change-background-to-f1');
    });
    }
    if (home != null){
        home.addEventListener('mouseleave', function() {
        mainElement.classList.remove('change-background-to-home');
    });
    }
});