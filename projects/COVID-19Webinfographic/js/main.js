/* jslint browser: true */
/* global $, gsap, window */

// set initial screen number
var screenNum = 1;

// total number of screens
var totalScreens = $("section").length;

// transition duration
var duration = 1;

// delay for starting screen animations
// make equal to duration... The time it takes content to transition off screen
// add more time to delay the build on a little more
var delay = duration + 0.5;

// disables nav when transitioning from screen to screen
var navActive = true;

// vars used for nav
var currentScreen,
    prevScreen,
    nextScreen;

// hides all screens except for screen 1
$("section:gt(0)").hide();

// set up main div on paused timeline until begin button clicked
var main = gsap.from("main", {
    duration: duration,
    y: $(window).height(),
    ease:"back.out",
    onComplete:function(){
        //set volume of bg music to zero
        $("#background").prop("volume",0);
        
        //play BG music
        $("#background").trigger("play");
        
        //fade in BG music to volume 20%
        $("#background").animate({volume:0.2},2000);
        
    }



}).pause();

// set up begin button on paused timeline until page load
var begin = gsap.from("#btnContainer", {
    duration: duration,
    y: $(window).height(),
    ease:"back.out",
    onReverseComplete: function() {
        
        // animate on first screen
        loadScreen1();
        
        // show main div
        $("main").show();
        
        // animate on main container
        main.play();
        
    }
}).pause();

// preload all content and then reveal begin button
$(window).on("load", function() {
    
    // fade out preloader GIF
    gsap.to("#loading", {
        duration: duration,
        opacity: 0,
        onComplete: function() {
            
            // when done show begin button
            begin.play();
            
        }
    });
    
});

// begin button click function
$("#begin").click(function() {
    
    // reverse begin button timeline and then play main timeline
    begin.reverse();
    
});

// next and previous navigation functions
function showNextScreen() {
    
    // check if nav is active
    if (navActive) {
        
        // disable nav
        navActive = false;
        
        // targets the current screen
        currentScreen = "#screen" + screenNum;

        // sets next screen number
        screenNum++;

        // show/hide nav
        showHideNav(screenNum);

        // targets the next screen
        nextScreen = "#screen" + screenNum;

        // transitions current screen out
        gsap.fromTo(currentScreen, {
            x: 0
        }, {
            duration: duration,
            delay: 0.5,
            x: -960,
            ease: "power2.inOut"
        });

        // shows next screen
        $(nextScreen).show();

        // transitions next screen in
        gsap.fromTo(nextScreen, {
            x: 960
        }, {
            duration: duration,
            delay: 0.5,
            x: 0,
            ease: "power2.inOut",
            onComplete: function() {

                // hide current screen
                $(currentScreen).hide();
                
                // enable nav
                navActive = true;
            }
        });

        // load function to animate on contents of screen
        window["loadScreen" + screenNum]();
        
        
        //stop voiceover from playing////
        $("#voiceover").trigger("pause");
        
    }
}

function showPrevScreen() {
    
    // check if nav is active
    if (navActive) {
        
        // disable nav
        navActive = false;
        
        // targets the current screen
        currentScreen = "#screen" + screenNum;

        // sets next screen number
        screenNum--;

        // show/hide nav
        showHideNav(screenNum);

        // targets the next screen
        prevScreen = "#screen" + screenNum;

        // transitions current screen out
        gsap.fromTo(currentScreen, {
            x: 0
        }, {
            duration: duration,
            delay: 0.5,
            x: 960,
            ease: "power2.inOut"
        });

        // shows previous screen
        $(prevScreen).show();

        // transitions next screen in
        gsap.fromTo(prevScreen, {
            x: -960
        }, {
            duration: duration,
            delay: 0.5,
            x: 0,
            ease: "power2.inOut",
            onComplete: function() {

                // hide current screen
                $(currentScreen).hide();

                // enable nav
                navActive = true;
            }
        });

        // load function to animate on contents of screen
        window["loadScreen" + screenNum]();
        
        //stop voiceover from playing////
        $("#voiceover").trigger("pause");
        
    }
}

// next and previous button clicks
$("#next").click(showNextScreen);
$("#prev").click(showPrevScreen);

// show/hide next/prev buttons
function showHideNav(currentScreen) {
    
    if (currentScreen == 1) {
        $("#prev").fadeOut(1000);
    } else if (currentScreen == totalScreens) {
        $("#next").fadeOut(1000);
    } else {
        $("#prev").fadeIn(1000);
        $("#next").fadeIn(1000);
    }
    
}

// set up nav on page load
showHideNav(1);

///LOAD SCREEN AUDIO//////////
function loadScreenAudio(){
    $("#voiceover").attr("src", "audio/screen" + screenNum + ".mp3");
    
    $("#voiceover").trigger("play");
}


///CONTROLING BACKGROUND AUDIO /////////
$("#playPause").click(function(){
    
    var symbol = $("#playPause div");
    
    if (symbol.hasClass("fa-microphone")) {
        
        symbol.removeClass("fa-microphone").addClass("fa-microphone-slash");
        
        $("#background").trigger("pause");
        
        $("#voiceover").attr("src", "audio/screen" + screenNum + ".mp3");
        
        $("#voiceover").trigger("pause");
        
    } else {
        
        symbol.removeClass("fa-microphone-slash").addClass("fa-microphone");
        
        $("#background").trigger("play");

        $("#voiceover").attr("src", "audio/screen" + screenNum + ".mp3");
        
        $("#voiceover").trigger("play");
        
    }
        
    
})

// functions for loading on content of each screen
// LOAD SCREEN 1 ///////////////////////////////////////////////
function loadScreen1() {
    
    // animate content on with delays 
    gsap.from("#p1e1", {
        duration: duration,
        delay: delay,
        y:-960,
        ease:"power.out"
    });
    gsap.from("#p1e2", {
        duration: duration,
        delay: delay+0.2,
        x:-960,
        ease:"power.out"
    });
    
    gsap.from("#p1e3", {
        duration: duration+0.5,
        delay: delay,
        y:960,
        ease:"power.out"
    });
    
    gsap.from("#p1e4", {
        duration: duration+0.8,
        delay: delay,
        x:960,
        ease:"power.out"
    });
    
}

// LOAD SCREEN 2 ///////////////////////////////////////////////
function loadScreen2() {
    
    // animate content on with delays
   
    gsap.from("#p2e1", {
        duration: duration,
        delay: delay+1,
        opacity:0,
        ease:"power.out"
    });
    gsap.from("#p2e1a", {
        duration: duration,
        delay: delay+0.5,
        y:180,
        opacity:0,
        ease:"power.out"
    });
    gsap.to("#p2e1a", {
        duration: duration,
        delay: delay+0.5,
        y:180,
        opacity:0,
        ease:"power.out"
    });
    gsap.from("#p2e2", {
        duration: duration,
        delay: delay+1,
        y:960,
        x:400,
        ease:"power.out"
    });
    gsap.from("#p2e3", {
        duration: duration,
        delay: delay+1.5,
        x:-490,
        ease:"ease.out"
    });
    gsap.from("#ele4", {
        duration: duration,
        delay: delay+2,
        scale:0,
        opacity: 0,
        ease:"elastic.out"
    });
    
    ///apply sound effect
    
    
    
    ///start voiceover
    gsap.delayedCall(delay + 2.5,loadScreenAudio);
    
    
    
}

// LOAD SCREEN 3 ///////////////////////////////////////////////
function loadScreen3() {
    
    // animate content on with delays
    gsap.from("#screen3 h1", {
        duration: duration,
        delay: delay,
        opacity: 0
    });
    
    gsap.from("#p3e1", {
        duration: duration,
        delay: delay+1,
        opacity:0,
        ease:"power.out"
    });
    gsap.from("#p3e1a", {
        duration: duration,
        delay: delay+0.5,
        y:180,
        ease:"power.out"
    });
    gsap.from("#p3e2", {
        duration: duration,
        delay: delay+1,
        x:-600,
        ease:"power.out"
    });
    gsap.from("#p3e3", {
        duration: duration,
        delay: delay+1,
        x:600,
        ease:"power.out"
    });
    gsap.from("#p3e4", {
        duration: duration,
        delay: delay+1,
        y:960,
        ease:"power.out"
    });
  
     ///start voiceover
    gsap.delayedCall(delay + 2.5,loadScreenAudio);;
    
    // single-tween hover
    
    
    // multi-tween hover
    
    
}

// LOAD SCREEN 4 ///////////////////////////////////////////////
function loadScreen4() {
    
    // animate content on with delays
    gsap.from("#screen4 h1", {
        duration: duration,
        delay: delay,
        opacity: 0
    });
    gsap.from("#p4e1", {
        duration: duration,
        delay: delay+1,
        opacity:0,
        ease:"power.out"
    });
    gsap.from("#p4e2", {
         duration: duration,
        delay: delay+0.5,
        y:150,
        ease:"power.out"
    });
    gsap.from("#p4e3", {
         duration: duration,
        delay: delay+0.5,
        y:150,
        ease:"power.out"
    });
    gsap.from("#p4e4", {
        duration: duration,
        delay: delay+1.5,
        y:600,
        ease:"power.out"
    });
    gsap.from("#p4e5", {
        duration: duration,
        delay: delay+1.5,
        y:600,
        ease:"power.out"
    });
    
    
     ///start voiceover
    gsap.delayedCall(delay + 2.5,loadScreenAudio);
  
    
    

    // reset bars on graph
    
    
    // click to execute multiple tweens
    
    
}

// LOAD SCREEN 5 ///////////////////////////////////////////////
function loadScreen5() {
    
    // animate content on with delays
    gsap.from("#screen5 h1", {
        duration: duration,
        delay: delay,
        opacity: 0
    });
    gsap.from("#p5e1", {
        duration: duration,
        delay: delay+1,
        opacity:0,
        ease:"power.out"
    });
    gsap.from("#p5e1a", {
        duration: duration,
        delay: delay+0.5,
        y:200,
        ease:"power.out"
    });
    gsap.from("#p5e2", {
        duration: duration,
        delay: delay*2,
        opacity:0,
        scale:0,
        ease:"power.out"
    });
    gsap.from("#p5e3", {
        duration: duration,
        delay: delay*2,
        opacity:0,
        scale:0,
        ease:"power.out"
    });
    
     ///start voiceover
    gsap.delayedCall(delay + 2.5,loadScreenAudio);
    
    
    
    // click to view overlay content
    
    
    // click to view overlay content
    
    
    // close overlay content
    
    
}

// LOAD SCREEN 6 ///////////////////////////////////////////////
function loadScreen6() {
    
    // animate content on with delays
    gsap.from("#screen6 h1", {
        duration: duration,
        delay: delay,
        opacity: 0
    });
    gsap.from("#p6e1", {
        duration: duration,
        delay: delay+0.5,
        opacity:0,
        
        ease:"power.out"
    });
    gsap.from("#p6e1a", {
        duration: duration,
        delay: delay,
        y:200,
        ease:"power.out"
    });
    gsap.from("#p6e2", {
        duration: duration+2,
        delay: delay,
        y:960,
        ease:"power.out"
    });
    
    // looping animation using yoyo & repeat properties
    // start before it animates on
    
    
}