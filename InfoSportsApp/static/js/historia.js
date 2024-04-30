function slide() {
 var $active = $('#slideshow IMG.active');
 if ($active.length === 0)
 $active = $('#slideshow IMG:last');
 var $next = $active.next().length ? $active.next()
 : $('#slideshow IMG:first');
 $active.addClass('last-active');
 $next.css({opacity: 0.0})
 .addClass('active')
 .animate({opacity: 1.0}, 1000, function () {
 $active.removeClass('active last-active');
 });
}
$(function () {setInterval("slide()", 3000);});
function toggleDiv() {
            const div = document.getElementById('slideshow');
            if (div.style.display === 'none') {
                div.style.display = 'block';
            } else {
                div.style.display = 'none';
            }
}
document.addEventListener("DOMContentLoaded", function() {
    var but1 = document.getElementById("b1");
    but1.addEventListener('click', function(){
    fetch("http://127.0.0.1:8000/static/historia1950-1960.txt")
    .then( response => {return response.text();} )
        .then( dane => { document.getElementById("contentHistoria").innerHTML = dane; })
    },
    false);

    var but2 = document.getElementById("b2");
    but2.addEventListener('click', function(){
    fetch("http://127.0.0.1:8000/static/historia1960-1970.txt")
    .then( response => {return response.text();} )
        .then( dane => { document.getElementById("contentHistoria").innerHTML = dane; })
    },
    false);

    var but3 = document.getElementById("b3");
    but3.addEventListener('click', function(){
    fetch("http://127.0.0.1:8000/static/historia1970-1980.txt")
    .then( response => {return response.text();} )
        .then( dane => { document.getElementById("contentHistoria").innerHTML = dane; })
    },
    false);

    var but4 = document.getElementById("b4");
    but3.addEventListener('click', function(){
    fetch("http://127.0.0.1:8000/static/historia1980-1990.txt")
    .then( response => {return response.text();} )
        .then( dane => { document.getElementById("contentHistoria").innerHTML = dane; })
    },
    false);

    var but5 = document.getElementById("b5");
    but3.addEventListener('click', function(){
    fetch("http://127.0.0.1:8000/static/historia1990-2000.txt")
    .then( response => {return response.text();} )
        .then( dane => { document.getElementById("contentHistoria").innerHTML = dane; })
    },
    false);

    var but6 = document.getElementById("b6");
    but3.addEventListener('click', function(){
    fetch("http://127.0.0.1:8000/static/historia2000-2010.txt")
    .then( response => {return response.text();} )
        .then( dane => { document.getElementById("contentHistoria").innerHTML = dane; })
    },
    false);

    var but7 = document.getElementById("b7");
    but4.addEventListener('click', function(){
        fetch("http://127.0.0.1:8000/static/historia2010-2024.txt")
        .then( response => {return response.text();} )
        .then( dane => { document.getElementById("contentHistoria").innerHTML = dane; })
        },
        false);
    },
    false);
