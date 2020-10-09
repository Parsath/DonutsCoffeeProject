///////////////////// NAV ///////////////////////////////

$(function(){
    $("input#burger").click(function(){
        $(".navbar-index-container").toggleClass("burger-stuff");
        $(".navbar-index").toggleClass("burger-nav-index");
        $(".navbar-nav").toggleClass("burger-nav-links");
        $(".nav-item").toggleClass("burger-nav-link");
        $(".nav-title").toggleClass("burger-nav-title");
    });

    
    
    $("#home-link").click(function() {
        $('html, body').animate({
            scrollTop: $("#home").offset().top - ($(window).height() * 10 / 100)
        }, 500);
    });

    $("#about-link").click(function() {
        $('html, body').animate({
            scrollTop: $("#about").offset().top - ($(window).height() * 10 / 100)
        }, 500);
    });
    
    $("#findus-link").click(function() {
        $('html, body').animate({
            scrollTop: $("#location").offset().top - ($(window).height() * 10 / 100)
        }, 500);
    });

    $("#contact-link").click(function() {
        $('html, body').animate({
            scrollTop: $("#contact").offset().top - ($(window).height() * 10 / 100)
        }, 500);
    });

    if($(window).width() < 980 )
    {
    
        $("#home-link").click(function() {
            $("input#burger").trigger("click");
        });
    
        $("#about-link").click(function() {
            $("input#burger").trigger("click");
        });
        
        $("#findus-link").click(function() {
            $("input#burger").trigger("click");
        });
    
        $("#contact-link").click(function() {
            $("input#burger").trigger("click");
        });
    }
 });


 ///////////////////// HOME ///////////////////////////////


 $(document).ready(function() {

    var donutWidth = $(".donut").width();
    var donutShadow = donutWidth * 40 /100;

    $(".donut").addClass("donut-animation");
    $(".donut-shadow").addClass("donut-shadow-animation");
    $(".doname-1").addClass("donut-name-animation");
    $(".get-it").addClass("get-it-animation");
    $(".donut-shadow").css({
        "width": " "+ donutShadow +"px"
    });


    $("#carousel-donuts").on('slide.bs.carousel', function(car){

        var thisDonut = car.relatedTarget;

        if(car.direction == 'left')
        { 
             
            $('.donut').removeClass("donut-animation");
            $(".donut-shadow").removeClass("donut-shadow-animation");

            if( $(thisDonut).hasClass("donut-1") )
            {

                $('.doname-1').removeClass("donut-name-animation");

                setTimeout(function(){
                    $('.name2').css({
                        "display" : "none"
                    });
                    $('.name3').css({
                        "display" : "none"
                    });
                    $('.name1').css({
                        "display" : "inline"
                    });
                    $('.doname-1').addClass("donut-name-animation");
                    $(".donut-shadow").addClass("donut-shadow-animation");
                    $(".donut").addClass("donut-animation");
                }, 1000);
            }
            else if( $(thisDonut).hasClass("donut-2") )
            {

                $('.doname-1').removeClass("donut-name-animation");

                setTimeout(function(){
                    $('.name3').css({
                        "display" : "none"
                    });
                    $('.name1').css({
                        "display" : "none"
                    });
                    $('.name2').css({
                        "display" : "inline"
                    });
                    $('.doname-1').addClass("donut-name-animation");
                    $(".donut-shadow").addClass("donut-shadow-animation");
                    $(".donut").addClass("donut-animation");
                }, 1000);
    
            }
            else if( $(thisDonut).hasClass("donut-3") )
            {

                $('.doname-1').removeClass("donut-name-animation");

                setTimeout(function(){
                    $('.name1').css({
                        "display" : "none"
                    });
                    $('.name2').css({
                        "display" : "none"
                    });
                    $('.name3').css({
                        "display" : "inline"
                    });
                    $('.doname-1').addClass("donut-name-animation");
                    $(".donut-shadow").addClass("donut-shadow-animation");
                    $(".donut").addClass("donut-animation");
                }, 1000);
    
            }
        }

        else if(car.direction == 'right')
        { 
             
            $('.donut').removeClass("donut-animation");
            $(".donut-shadow").removeClass("donut-shadow-animation");

            if( $(thisDonut).hasClass("donut-1") )
            {

                $('.doname-1').removeClass("donut-name-animation");

                setTimeout(function(){
                    $('.name3').css({
                        "display" : "none"
                    });
                    $('.name2').css({
                        "display" : "none"
                    });
                    $('.name1').css({
                        "display" : "inline"
                    });
                    $('.doname-1').addClass("donut-name-animation");
                    $(".donut-shadow").addClass("donut-shadow-animation");
                    $(".donut").addClass("donut-animation");
                }, 1000);
            }
            else if( $(thisDonut).hasClass("donut-2") )
            {

                $('.doname-1').removeClass("donut-name-animation");

                setTimeout(function(){
                    $('.name1').css({
                        "display" : "none"
                    });
                    $('.name3').css({
                        "display" : "none"
                    });
                    $('.name2').css({
                        "display" : "inline"
                    });
                    $('.doname-1').addClass("donut-name-animation");
                    $(".donut-shadow").addClass("donut-shadow-animation");
                    $(".donut").addClass("donut-animation");
                }, 1000);
    
            }
            else if( $(thisDonut).hasClass("donut-3") )
            {

                $('.doname-1').removeClass("donut-name-animation");

                setTimeout(function(){
                    $('.name2').css({
                        "display" : "none"
                    });
                    $('.name1').css({
                        "display" : "none"
                    });
                    $('.name3').css({
                        "display" : "inline"
                    });
                    $('.doname-1').addClass("donut-name-animation");
                    $(".donut-shadow").addClass("donut-shadow-animation");
                    $(".donut").addClass("donut-animation");
                }, 1000);
    
            }
        }


    });

    $(function(){
        $('#carousel-donuts').carousel({
            interval: 3000
        });
    });

    $(function(){
        $('.get-it').click(function(){
            window.location.href= home;
        });
    });
});




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
     $('#carousel-about').carousel({
         interval: 5000
     });
 });



 ///////////////////// ORDER-PRODUCT GRID ///////////////////////////////

 


$(".product-grid").ready(function(){
    $(".product-grid .item").each(function(i){

        setTimeout(function(){
            $(".product-grid .item").eq(i).addClass("is-showing");

        },150 * (i+1) );

    });

});



 ///////////////////// ORDER CART ///////////////////////////////

 

 
$(function(){
    $(".shopping-cart-button").click(function(){
        $(".cart").toggleClass("cart-pop-up");
        $(".shopping-cart-icon").toggleClass("cart-button-clicked");
    });
});



///////////////////// ORDER ITEM POPUP ///////////////////////////////




$(function(){
    $(".close-item-chosen").click(function(){
        $(".item-chosen-container").removeClass("item-chosen-popup-container");
        $(".item-chosen").removeClass("item-chosen-popup");
        $(".item-chosen").css({
            "z-index":"-1"
        });
    });
    $(".add-to-cart").click(function(){
        $(".item-chosen-container").addClass("item-chosen-popup-container");
        $(".item-chosen").addClass("item-chosen-popup");
        $(".item-chosen").css({
            "z-index":"9999999"
        });
    });
});