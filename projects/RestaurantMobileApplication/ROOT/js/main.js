/* jslint browser: true */
/* global $, gsap */

// hide all screens and section divs
$("main,section").hide();

// SPLASH SCREEN //////////////////////////////////////////////

// display splash screen
$("#splash").show();

// animate on the splash screen on app load
gsap.from("#splash", {
    opacity: 0,
    duration: 1,
    delay: 0.25,
});
gsap.from("#splash .sideRect", {
    delay: 0.75,
    duration: 0.75,
    x: -$("#splash .sideRect").outerHeight(),
    y: -$("#splash .sideRect").outerHeight(),
    ease: "power2.out"
});
gsap.from("#splash .sideRect2", {
    delay: 0.75,
    duration: 0.75,
    x: $("#splash .sideRect2").outerHeight(),
    y: $("#splash .sideRect2").outerHeight(),
    ease: "power2.out"
});
//gsap.from("#splash footer", {
//    delay: 0.75,
//    duration: 0.5,
//    y: $("#splash header").outerHeight(),
//    ease: "elastic.out"
//});
gsap.from("#splash img", {
    delay: 1.75,
    duration: 0.5,
    scale: 0,
    ease: "back.out"
});

// wait 5 secs then fade out and load landing screen
gsap.to("#splash", {
    delay: 5,
    duration: 0.5,
    opacity: 0,
    onComplete: loadLanding
});

// LANDING SCREEN ///////////////////////////////////////////

function loadLanding() {
    $("#landing").show();

    gsap.from("#landing .header", {
        delay: 0.75,
        duration: 0.5,
        y: -$("#landing .header").outerHeight(),
        ease: "power2.out"
    });

    gsap.from("#logo1", {
        delay: 1.25,
        duration: 0.5,
        opacity: 0
    });
    gsap.from("#logo2", {
        delay: 1.75,
        duration: 0.5,
        opacity: 0
    });
    gsap.from("#logo3", {
        delay: 2.15,
        duration: 0.5,
        opacity: 0
    });

}
// part of landing screen but not part of loadLoading function /////////////////
// set up logos to link to related restaurant
// pass rest ID and subnav highlight colour to loadRest function
// fade landing out and load selected restaurant
$("#logo1").click(function () {
    gsap.to("#landing", {
        delay: 0.25,
        opacity: 0,
        ease: "back.out",
        onComplete: loadRest,
        onCompleteParams: ["#rest1", "#0f6b37"]
    });

});
$("#logo2").click(function () {
    gsap.to("#landing", {
        delay: 0.25,
        opacity: 0,
        ease: "back.out",
        onComplete: loadRest,
        onCompleteParams: ["#rest2", "#0f6b37"]
    });

});
$("#logo3").click(function () {
    gsap.to("#landing", {
        delay: 0.25,
        opacity: 0,
        ease: "back.out",
        onComplete: loadRest,
        onCompleteParams: ["#rest3", "#0f6b37"]
    });

});

// RESTAURANT SCREENS ///////////////////////////////////////////

function loadRest(restID, highlightColour) {
    
    // hide landing screen
    $("#landing").hide();

    // display selected restaurant screen
    $(restID).show();

    // animate on the restaurant
    gsap.from(restID + " header", {
        delay: 0.25,
        y: -$(restID + " header").outerHeight(),
        duration: 0.5,
        ease: "sine.out"
    });

    gsap.from(restID + " footer", {
        delay: 0.25,
        y: $(restID + " footer").outerHeight(),
        duration: 0.5,
        ease: "sine.out"
    });

    // display home section
    $(restID + " .home").show();

    // animate on home section
    gsap.from(restID + " .home", {
        delay: 0.75,
        opacity: 0,
        duration: 0.5
    });

    // loop through and reveal all elements on home screen with .reveal class applied
    $(restID + " .home .reveal").each(function(i) {

        gsap.from(this, {
            delay: 1.25 + i * 0.15,
            opacity: 0,
            y: -10,
            duration: 1,
            ease: "elastic.out" // change easing to something other than elastic
        });

    });
    
    // create var to target icons from selected restaurant
    var iconsTarget = restID + " .homeIcon," +restID + " .specialsIcon," + restID+" .reservationsIcon" ; 
    // remove highlight and active class from all icons
    $(iconsTarget).css({background: "none"}).removeClass("active");
    
    
    // highlight home icon and add active class on restaurant load
    $(restID + " .homeIcon").css({background: highlightColour}).addClass("active");
    
    // set up section nav - highlight and load section
    $(iconsTarget).click(function(){
        if (!$(this).hasClass("active")){
            
        $(iconsTarget).css({background: "none"}).removeClass("active");
        $(this).css({background: highlightColour}).addClass("active");
            
            //load selected section
            loadSection( restID + " section", restID + " " + $(this).attr("data-section"));            
                
        }
        
    });

}


// hamburger tweens on
$(".hamburger").click(function(){
    // alert('click works');
// checks if the hamburger icon is hamburger
    if($(this).attr("src") == "img/close2hamburger.gif"){
        // this changes gif to X
        $(this).attr("src","img/hamburger2close.gif");
        gsap.fromTo("#menu",{
            x:-100,
            opacity:0,
            duration:0.5,
            ease:"sine.out"
        },{
            x:0,
            opacity:1,
            duration:0.5,
            ease:"sine.out"
        })
        // display the hamburgerMenu 
        $("#menu").show(); 

        //animate the hamburger section

    }else{
        // display the hamburgerMenu 
        $(this).attr("src","img/close2hamburger.gif");
        //animate the hamburger section
        gsap.to("#menu",{
                    x:-100,
                    opacity:0,
                    duration:0.5,
                    ease:"sine.out",
                    onComplete: function(){
                        $("#menu").hide();
                    }
        })
    }
})

$("#Hamburger_hearth").click(function(){
    $("main").hide();
    $(".hamburger").attr("src","img/close2hamburger.gif");
    gsap.to("#menu",{
        x:-100,
        duration:0.5,
        opacity:0,
        ease:"sine.out",
        onComplete: loadRest,
        onCompleteParams:["#rest1", "#0f6b37"]
    })
})
$("#Hamburger_vines").click(function(){
    $("main").hide();
    $(".hamburger").attr("src","img/close2hamburger.gif");
    gsap.to("#menu",{
        x:-100,
        duration:0.5,
        opacity:0,
        ease:"sine.out",
        onComplete: loadRest,
        onCompleteParams:["#rest2", "#0f6b37"]
    })
})
$("#Hamburger_crispy").click(function(){
    $("main").hide();
    $(".hamburger").attr("src","img/close2hamburger.gif");
    gsap.to("#menu",{
        x:-100,
        duration:0.5,
        opacity:0,
        ease:"sine.out",
        onComplete: loadRest,
        onCompleteParams:["#rest3", "#0f6b37"]
    })
})




// REUSABLE FUNCTIONS/CLICKS /////////////////////////////////////

// function for loading internal restaurant section


function loadSection(prevSection, nextSection){
    
    gsap.to(prevSection, {
        opacity:0,
        duration:0.5,
        onComplete:function(){
            $(prevSection).hide().css({opacity:1});
            $(nextSection).show().scrollTop(0);
        }
})
    
}

// set up reservations submit button

