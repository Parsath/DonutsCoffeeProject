var addCartItem = function(i, qte, name, price, instructions){

    while($(".cart-item-"+i).length)
        i++;

    $("<div class=\"cart-item cart-item-"+i+"\"></div>").appendTo(".cart-content-container");

            // Hidden Iterator
    $("<div class=\"cart-iteration cart-iteration-"+i+"\" hidden>"+i+"</div>").appendTo(".cart-content-container");

    $("<div class=\"cart-details cart-details-"+i+"\"></div>").appendTo(".cart-item-"+i);
    $("<div class=\"number-container number-container-"+i+"\"></div>").appendTo(".cart-details-"+i);

    $("<div class=\"cart-instructions cart-instructions-"+i+"\" hidden>"+instructions+"</div>").appendTo(".cart-item-"+i);

    // TODO : Make it an input
    $("<span class=\"dark-bg number number-"+i+"\">"+qte+"</span>").appendTo(".number-container-"+i);
    // TODO : Make it an input
    $("<div class=\"dark-bg name name-"+i+"\">"+name+"</div>").appendTo(".cart-details-"+i);
    
    $("<div class=\"price-container price-container-"+i+"\"></div>").appendTo(".cart-details-"+i);

        // Hidden Initial Price
    $("<span class=\"initial-price-"+i+"\" hidden>"+price+"</span>").appendTo(".cart-details-"+i);

    // TODO : Make it an input
    $("<span class=\"dark-bg price price-"+i+"\">"+price+"</span>").appendTo(".price-container-"+i);

    $("<span class=\"dark-bg price\">dt</span>").appendTo(".price-container-"+i);
    $("<div class=\"cart-buttons-container cart-buttons-container-"+i+"\"></div>").appendTo(".cart-item-"+i);
    $("<div class=\"cart-buttons cart-buttons-"+i+"\"></div>").appendTo(".cart-buttons-container-"+i);
    $("<button class=\"edit-cart btn btn-outline-light edit-cart-"+i+"\">Edit</button>").appendTo(".cart-buttons-"+i);
    $("<button class=\"remove-cart btn btn-outline-light remove-cart-"+i+"\">Remove</button>").appendTo(".cart-buttons-"+i);
    $("<div class=\"cart-plus-minus cart-plus-minus-"+i+"\"></div>").appendTo(".cart-buttons-container-"+i);
    $("<span class=\"cart-plus dark-bg cart-plus-"+i+"\">+</span>").appendTo(".cart-plus-minus-"+i);
    $("<span class=\"cart-minus dark-bg cart-minus-"+i+"\">-</span>").appendTo(".cart-plus-minus-"+i);
}

var checkCartItem = function(i, qte, name, price, instructions){

    var loop = 0;

    $(".cart-item").each(function(){
        let nameHtml = $(".name-"+loop).html();
        if(String(nameHtml) === name )
        {
            loop=-1;
            return false;
        }
        else
            loop++;
    });

    if( loop > -1 )
        addCartItem(i, qte, name, price, instructions);
}

var removeCartItem = function(i){
    $(".cart-item-"+i).remove();
}
var incrementCartItemPrice = function(i){
    let initialPriceHtml = $(".initial-price-"+i).html();
    let priceHtml = $(".price-"+i).html();
    let initialPrice = parseFloat(initialPriceHtml);
    let price = parseFloat(priceHtml);
    price += initialPrice;

    $(".price-"+i).html(price);
}
var incrementCartItemQte = function(i){
    let qte = $(".number-"+i).html();
    qte ++;
    $(".number-"+i).html(qte);
    incrementCartItemPrice(i);
}


var decrementCartItemPrice = function(i){
    let initialPriceHtml = $(".initial-price-"+i).html();
    let priceHtml = $(".price-"+i).html();
    let initialPrice = parseFloat(initialPriceHtml);
    let price = parseFloat(priceHtml);
    price -= initialPrice;

    $(".price-"+i).html(price);
}
var decrementCartItemQte = function(i){
    let qte = $(".number-"+i).html();
    qte --;
    if(qte > 0)
    {
        $(".number-"+i).html(qte);
        decrementCartItemPrice(i);
    }
    else
        removeCartItem(i);
}

// var updateCartItemPrice = function(i, qte){
//     let initialPriceHtml = $(".initial-price-"+i).html();
//     let initialPrice = parseInt(initialPriceHtml, 10);
//     let price = initialPrice * qte;
//     $(".price-"+i).html(price);
// }
// var updateCartItemQte = function(i, qte){
//     $(".number-"+i).html(qte);
//     updateCartItemPrice(i, qte);
// }
// var updateCartItemName = function(i, name){
//     $(".name-"+i).html(name);
// }

var cartItemIterator = function() {
    let i = 0;
    $(".cart-item").each(function(){
        i++;
    })
    return i;
}

$(document).ready(function(){
    // addCartItem(1, 1,"Donut Maftoul", 4);
    // incrementCartItemQte(2);
    // updateCartItemQte(1, 23);
    // removeCartItem(3);


    $(".js-add-to-cart").click(function(e){
        e.preventDefault();

        var $link = $(e.currentTarget);

        $.ajax({
            method: 'POST',
            url: $link.attr('href')
        }).done(function(data) {
            $(".item-add-btn").attr("href", "/order/"+data.slug);
            $(".donut-order-img-chosen").attr("src", data.link);
            $(".donut-chosen-title").html(data.name);
            $(".item-desc-text").html(data.description);
            $(".item-chosen-container").addClass("item-chosen-popup-container");
            $(".item-chosen").addClass("item-chosen-popup");
            $(".item-chosen").css({
                "z-index":"9999999"
            });
        });
    });

    // TODO : Add The Data of the donut put in the ADD TO CART
    $(".js-item-add-btn").click(function(e){
        e.preventDefault();

        var $link = $(e.currentTarget);

        $.ajax({
            method: 'POST',
            url: $link.attr('href')
        }).done(function(data) {
            let instructions = $('#donut-instructions').val()
            console.log(instructions);
            checkCartItem(cartItemIterator(), 1,data.name, data.price, instructions);
        });
    });


    $(document).on("click",".remove-cart", (function(e){
        var removeBtn = $(e.currentTarget);
        $(".cart-iteration").each(function(){
            let cartItemIteratorHtml = $(this).html();
            let cartItemIterator = parseInt(cartItemIteratorHtml, 10);
            if(removeBtn.hasClass("remove-cart-"+cartItemIterator))
            {
                removeCartItem(cartItemIterator);
                return false;
            }
        });
    }));
    $(document).on("click",".cart-plus", (function(e){
        var incrementBtn = $(e.currentTarget);
        $(".cart-iteration").each(function(){
            let cartItemIteratorHtml = $(this).html();
            let cartItemIterator = parseInt(cartItemIteratorHtml, 10);
            if(incrementBtn.hasClass("cart-plus-"+cartItemIterator))
            {
                incrementCartItemQte(cartItemIterator);
                return false;
            }
        });
    }));
    $(document).on("click",".cart-minus", (function(e){
        var decrementBtn = $(e.currentTarget);
        $(".cart-iteration").each(function(){
            let cartItemIteratorHtml = $(this).html();
            let cartItemIterator = parseInt(cartItemIteratorHtml, 10);
            if(decrementBtn.hasClass("cart-minus-"+cartItemIterator))
            {
                decrementCartItemQte(cartItemIterator);
                return false;
            }
        });
    }));
});