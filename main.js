// this is the file used for the jquery editing in the file
//Author: Lovish Sekhri
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems, {edge:'right'});
});

//Side bar functionality triggerer
$(document).ready(function(){
    $('.sidenav').sidenav();
});


//functionality for the floating navbar

$(document).ready(function(){
    $('.fixed-action-btn').floatingActionButton();
});


///loops through the items and make them animate on the screen 
$("nav .reveal, .home .reveal").each(function(i) {

    gsap.from(this, {
        delay: 1.45 + i * 0.15,
        opacity: 0,
        y: -10,
        duration: 0.7,
        ease: "power2.out" // change easing to something other than elastic
    });

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


//animation to reveal on scroll
///////////
// determines the height of nav bar plus buffer
var navOffset = $("nav").innerHeight() + 10;




$(window).scroll(function(){
    
    var contentPosTop = $(window).scrollTop() + navOffset + 10;
    
    
    // reveal the content AS you scroll
    $(".reveal-ele").each(function(){
        var botEle =$(this).offset().top + $(this).innerHeight();
        var botWin = contentPosTop + $(window).height();
        
        if(botEle<botWin) {
            $(this).animate({
                
                opacity:1,
                marginTop:0
                
            },1000,"easeOutSine");
            
        }
        
        
    });
    
    
});
    
