$( document ).ready(function() {
    $(".donut").addClass("donut-animation");
    $(".donut-shadow").addClass("donut-shadow-animation");
    $(".donut-name").addClass("donut-name-animation");
    $(".get-it").addClass("get-it-animation");
});

$(function(){
    $("input#burger").click(function(){
        $(".navbar-index-container").toggleClass("burger-stuff");
        $(".navbar-index").toggleClass("burger-nav-index");
        $(".navbar-nav").toggleClass("burger-nav-links");
        $(".nav-item").toggleClass("burger-nav-link");
        $(".nav-title").toggleClass("burger-nav-title");
    });

    $(".donut").click(function(){
        console.log("yo");
    });
 });

