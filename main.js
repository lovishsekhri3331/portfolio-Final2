// this is the file used for the jquery editing in the file
//Author: Lovish Sekhri
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems, {edge:'right'});
});

  // Or with jQuery
    $(document).ready(function(){
        $('ul.tabs').tabs({
        swipeable : true,
        responsiveThreshold : 1920
        });
    });

//gsap for appear floating button

gsap.from(".fixed-action-btn",{
    delay:3.5,
    scale:0,
    duration:0.7,
    ease: "power2.out",
})

//functionality for the floating navbar

$(document).ready(function(){
    $('.fixed-action-btn').floatingActionButton();
});


///loops through the items and make them animate on the screen 
$("nav .reveal, .home .reveal").each(function(i) {

    gsap.from(this, {
        delay: 4.45 + i * 0.15,
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
    $("nav a[href^='#']").click(function (e) {

        // prevents browser from doing a default click
        // finds the position of selected link/ID
        var idPos = $($(this).attr("href")).offset().top - navOffset - 110;

        // animates to selected section position
        $("body, html").animate({scrollTop: idPos}, 500, "linear");

    });
    //animate the the window while performing scroll based animation
    $(window).scroll(function(){
        
        var contentPosTop = $(window).scrollTop() + navOffset;
        
        
        // reveal the content AS you scroll
        $(".reveal-ele").each(function(){
            var botEle =$(this).offset().top + $(this).innerHeight()-30;
            var botWin = contentPosTop + $(window).height() + 100;

            
            
            if(botEle<botWin) {
                $(this).animate({
                    
                    opacity:1,
                    marginTop:0
                    
                },1000,"linear");
            }
        });
    });



// animation for preloader
setTimeout(() => {
    $('.loader-bg').fadeToggle();
}, 3000);