// this is the file used for the jquery editing in the file
//Author: Lovish Sekhri
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems, {edge:'right'});
});

/// nav bar appears when scorlled upwards
var prevScrollpos = window.pageYOffset;
    window.onscroll = function() {
        var currentScrollPos = window.pageYOffset;
        if (prevScrollpos > currentScrollPos) {
            document.getElementById("navbar").style.top = "0";
        } else {
            document.getElementById("navbar").style.top = "-70px";
        }
        prevScrollpos = currentScrollPos;
}



//Side bar functionality triggerer
$(document).ready(function(){
    $('.sidenav').sidenav();
});


//functionality for the floating navbar

$(document).ready(function(){
    $('.fixed-action-btn').floatingActionButton();
});


///loops through the items and make them animate on the screen 
$(" .reveal").each(function(i) {

    gsap.from(this, {
        delay: 1.45 + i * 0.15,
        opacity: 0,
        y: -10,
        duration: 0.7,
        ease: "power2.out" // change easing to something other than elastic
    });

});