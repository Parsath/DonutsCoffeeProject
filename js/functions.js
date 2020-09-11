///////////////////// NAV ///////////////////////////////

$(function(){
    $("input#burger").click(function(){
        $(".navbar-index-container").toggleClass("burger-stuff");
        $(".navbar-index").toggleClass("burger-nav-index");
        $(".navbar-nav").toggleClass("burger-nav-links");
        $(".nav-item").toggleClass("burger-nav-link");
        $(".nav-title").toggleClass("burger-nav-title");
    });

    $(".donut").click(function(){
    });
 });


 ///////////////////// HOME ///////////////////////////////


 $( document ).ready(function() {

    var donutWidth = $(".donut").width();
    var donutShadow = donutWidth * 60 /100;

    $(".donut").addClass("donut-animation");
    $(".donut-shadow").addClass("donut-shadow-animation");
    $(".doname").addClass("donut-name-animation");
    $(".get-it").addClass("get-it-animation");
    $(".donut-shadow").css({
        "width": " "+ donutShadow +"px"
    });
});


//  $( document ).ready(function() {

//     var donutWidth = $(".donut").width();
//     var donutShadow = donutWidth * 60 /100;

//     $(".donut").addClass("donut-animation");
//     $(".donut-shadow").addClass("donut-shadow-animation");
//     $(".donut-name").addClass("donut-name-animation");
//     $(".get-it").addClass("get-it-animation");
//     $(".donut-shadow").css({
//         "width": " "+ donutShadow +"px"
//     });
// });



 ///////////////////// ABOUT ///////////////////////////////

 $(window).scroll(function(){
  
    var wScroll = $(this).scrollTop();
    var height = $(window).height();
    
    if(wScroll > height /3 ){
        $(".carousel-about-container").addClass("carousel-about-image-animation");
    }; 
    if(wScroll> height / 2.5){
        $(".section1").addClass("section-up-animation");
        $(".section3").addClass("section-up-animation");
        $(".section2").addClass("section-down-animation");
    };
 });

 $(function(){
     $('.carousel').carousel({
         interval: 3000
     });
 });
