
// The Creation of each Cart Item the client adds through the menu in the Cart.
var addCartItem = function(i, qte, name, price, instructions){

    while($(".cart-item-"+i).length)
        i++;

    $("<div class=\"cart-item cart-item-"+i+"\"></div>").appendTo(".cart-content-container");

            // Hidden Iterator
    $("<div class=\"cart-iteration cart-iteration-"+i+"\" hidden>"+i+"</div>").appendTo(".cart-content-container");

    $("<div class=\"cart-details cart-details-"+i+"\"></div>").appendTo(".cart-item-"+i);
    $("<div class=\"number-container number-container-"+i+"\"></div>").appendTo(".cart-details-"+i);

    $("<span class=\"dark-bg number number-"+i+"\">"+qte+"</span>").appendTo(".number-container-"+i);
    $("<div class=\"dark-bg name name-"+i+"\">"+name+"</div>").appendTo(".cart-details-"+i);

    $("<div class=\"price-container price-container-"+i+"\"></div>").appendTo(".cart-details-"+i);

        // Hidden Initial Price
    $("<span class=\"initial-price-"+i+"\" hidden>"+price+"</span>").appendTo(".cart-details-"+i);

    $("<span class=\"dark-bg price price-"+i+"\">"+price+"</span>").appendTo(".price-container-"+i);

    $("<span class=\"dark-bg price\">dt</span>").appendTo(".price-container-"+i);
    $("<div class=\"cart-buttons-container cart-buttons-container-"+i+"\"></div>").appendTo(".cart-item-"+i);
    $("<div class=\"cart-buttons cart-buttons-"+i+"\"></div>").appendTo(".cart-buttons-container-"+i);
    $("<button class=\"edit-cart btn btn-outline-light edit-cart-"+i+"\">Edit</button>").appendTo(".cart-buttons-"+i);
    $("<button class=\"remove-cart btn btn-outline-light remove-cart-"+i+"\">Remove</button>").appendTo(".cart-buttons-"+i);
    $("<div class=\"cart-plus-minus cart-plus-minus-"+i+"\"></div>").appendTo(".cart-buttons-container-"+i);
    $("<span class=\"cart-plus dark-bg cart-plus-"+i+"\">+</span>").appendTo(".cart-plus-minus-"+i);
    $("<span class=\"cart-minus dark-bg cart-minus-"+i+"\">-</span>").appendTo(".cart-plus-minus-"+i);

    // TODO : Make it an input Qte
    $("<input type=\"hidden\" class=\"quant-"+i+"\" name=\"quant-"+i+"\" id=\"quant-"+i+"\" value=\""+qte+"\">").appendTo(".cart-item-"+i);
    // TODO : Make it an input Name
    $("<input type=\"hidden\" class=\"name-input-"+i+"\" name=\"name-input-"+i+"\" id=\"name-input-"+i+"\" value='"+name+"'>").appendTo(".cart-item-"+i);
    // TODO : Make it an input Price
    $("<input type=\"hidden\" class=\"price-input-"+i+"\" name='price-input"+i+"' id=\"price-input-"+i+"\" value=\""+price+"\">").appendTo(".cart-item-"+i);
    // TODO : Make it an input Instructions
    $("<input type='hidden' class=\"cart-instructions cart-instructions-"+i+"\" id='cart-instructions-"+i+"' name=\"cart-instructions-"+i+"\" value='"+instructions+"'>").appendTo(".cart-item-"+i);
    // $("<textarea class=\"cart-instructions cart-instructions-"+i+"\" name=\"cart-instructions-"+i+"\" hidden>"+instructions+"</textarea>").appendTo(".cart-item-"+i);
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

    $("#price-input-"+i).val(price);
    $(".price-"+i).html(price);
}
var incrementCartItemQte = function(i){
    let qte = $(".number-"+i).html();
    qte ++;
    $(".number-"+i).html(qte);
    $("#quant-"+i).val(qte);
    incrementCartItemPrice(i);
}


var decrementCartItemPrice = function(i){
    let initialPriceHtml = $(".initial-price-"+i).html();
    let priceHtml = $(".price-"+i).html();
    let initialPrice = parseFloat(initialPriceHtml);
    let price = parseFloat(priceHtml);
    price -= initialPrice;

    $("#price-input-"+i).val(price);
    $(".price-"+i).html(price);
}
var decrementCartItemQte = function(i){
    let qte = $(".number-"+i).html();
    qte --;
    if(qte > 0)
    {
        $(".number-"+i).html(qte);
        $("#quant-"+i).val(qte);
        decrementCartItemPrice(i);
    }
    else
        removeCartItem(i);
}

var cartItemIterator = function() {
    let i = 0;
    $(".cart-item").each(function(){
        i++;
    })
    return i;
}

class Donuts {
    constructor(quantity, price, name, instructions) {
        this.quantity = quantity;
        this.price = price;
        this.name = name;

        if(typeof instructions !== 'undefined')
        {
            this.instructions = instructions;
        }
        else
            this.instructions = "";
    }
}

$(document).ready(function(){

    $("#pickup").click(function(a){
        a.preventDefault();
        var $link = $(a.currentTarget);


        let i = 0;
        var donutsArray = [];

        $(".cart-iteration").each(function(){
            let cartItemIteratorHtml = $(this).html();
            let cartItemIterator = parseInt(cartItemIteratorHtml, 10);
            console.log(cartItemIterator);
            let cartName = $("input#name-input-"+cartItemIterator).val();
            console.log($("#name-input-"+cartItemIterator));
            console.log(cartName);
            let cartQte = $("input#quant-"+cartItemIterator).val();
            console.log(cartQte);
            let cartPrice = $("input#price-input-"+cartItemIterator).val();
            console.log(cartPrice);
            let cartInstruct = $("input#cart-instructions-"+i).val();
            console.log(cartInstruct);
            donutsArray[i] = new Donuts(cartQte, cartPrice, cartName, cartInstruct);
            i++;
        });
        clientName = $("input#client-name").val();
        clientPhone = $("input#client-phone").val();
        intRegex = /\(?([0-9]{2})\)?([ .-]?)([0-9]{3})\2([0-9]{3})/;



        console.log(clientPhone);
        console.log(clientName);
        console.log(donutsArray);
        if( typeof clientName === "undefined" || clientName.length < 3 )
        {
            alert('Please enter a name 3 characters or more, Young Padawan.');
            return false;
        }
        else if( donutsArray.length === 0 )
        {
            alert("Please order something!");
        }
        else if(clientPhone.length !== 8 || (!intRegex.test(clientPhone)))
        {
            alert('Please enter a valid phone number.');
        }
        else if( $link.attr('id') === "pickup-done")
        {
            alert("Your order is ongoing!");
        }
        else if( $(".order-delivery").is("#delivery-done"))
        {
            alert("Your order is ongoing!");
        }
        else
        {
            $.ajax( {
                method: "POST",
                dataType: "json",
                url: $link.attr('href'),
                data :{
                    'donutArray' : donutsArray,
                    'name' : clientName,
                    'phone' : clientPhone
                },
                success: function (a){
                    alert("Order passed");
                    // $("#pickup").prop('disabled', true);
                    $("#pickup").attr("id","pickup-done");
                    $("#delivery").attr("id","delivery-done");
                    $link.html("Ongoing");
                    $("#delivery-done").html("Ongoing");
                },
                error: function (jqXhr, textStatus, errorMessage) { // error callback
                    console.log('Error: ' + errorMessage);
                    console.log(JSON.stringify(donutsArray));
                }
            });
        }
    });


    $(".close-cart-address").click(function(){
        $(".cart-address-container").removeClass("cart-address-container-on");
    });

    $("#delivery-confirm-btn").click(function(e){
        e.preventDefault();

       let address = $("#client-address").val();
       if( address.length < 3)
       {
           alert("Please enter a valid address")
       }
       else
       {
           $("#delivery-confirm").val(1);
           $("#delivery").trigger("click");
           $(".cart-address-container").removeClass("cart-address-container-on");
       }
    });

    $("#delivery").click(function(a){
        a.preventDefault();
        var $link = $(a.currentTarget);

        let confirmHtml = $("#delivery-confirm").val();
        let confirm = parseInt(confirmHtml, 10);

        let i = 0;
        var donutsArray = [];

        $(".cart-iteration").each(function(){
            let cartItemIteratorHtml = $(this).html();
            let cartItemIterator = parseInt(cartItemIteratorHtml, 10);
            console.log(cartItemIterator);
            let cartName = $("input#name-input-"+cartItemIterator).val();
            console.log($("#name-input-"+cartItemIterator));
            console.log(cartName);
            let cartQte = $("input#quant-"+cartItemIterator).val();
            console.log(cartQte);
            let cartPrice = $("input#price-input-"+cartItemIterator).val();
            console.log(cartPrice);
            let cartInstruct = $("input#cart-instructions-"+i).val();
            console.log(cartInstruct);
            donutsArray[i] = new Donuts(cartQte, cartPrice, cartName, cartInstruct);
            i++;
        });
        clientName = $("input#client-name").val();
        clientPhone = $("input#client-phone").val();
        clientAddress = $("input#client-address").val();
        intRegex = /\(?([0-9]{2})\)?([ .-]?)([0-9]{3})\2([0-9]{3})/;



        console.log(clientPhone);
        console.log(clientName);
        console.log(clientAddress);
        console.log(donutsArray);
        if( typeof clientName === "undefined" || clientName.length < 3 )
        {
            alert('Please enter a name 3 characters or more, Young Padawan.');
            return false;
        }
        else if( confirm !== 1 )
        {
            $(".cart-address-container").addClass("cart-address-container-on");
        }
        else if( donutsArray.length === 0 )
        {
            alert("Please order something!");
        }
        else if(clientPhone.length !== 8 || (!intRegex.test(clientPhone)))
        {
            alert('Please enter a valid phone number.');
        }
        else if( $link.attr('id') === "delivery-done")
        {
            alert("Your order is ongoing!");
        }
        else if( $(".order-pickup").is("#pickup-done"))
        {
            alert("Your order is ongoing!");
        }
        else
        {
            $.ajax( {
                method: "POST",
                dataType: "json",
                url: $link.attr('href'),
                data :{
                    'donutArray' : donutsArray,
                    'name' : clientName,
                    'phone' : clientPhone,
                    'address' : clientAddress
                },
                success: function (a){
                    alert("Order passed");
                    $link.attr('id',"delivery-done");
                    $("#pickup").attr("id","pickup-done");
                    $link.html("Ongoing");
                    $("#pickup-done").html("Ongoing");
                },
                error: function (jqXhr, textStatus, errorMessage) { // error callback
                    console.log('Error: ' + errorMessage);
                    console.log(JSON.stringify(donutsArray));
                }
            });
        }
    });


    $(".js-add-to-cart").click(function(e){
        e.preventDefault();

        var $link = $(e.currentTarget);

        $.ajax({
            method: 'POST',
            url: $link.attr('href')
        }).done(function(data) {
            $(".item-add-btn").attr("href", "/order/donut/"+data.slug);
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
            let instructions = $('#donut-instructions').val();
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