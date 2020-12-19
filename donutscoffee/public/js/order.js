
// The Creation of each Cart Item the client adds through the menu in the Cart.

var addCartItem = function(i, qte, name, price, instructions, quantity, toppings){

    while($(".cart-item-"+i).length)
        i++;

    $("<div class=\"cart-item cart-item-"+i+"\"></div>").appendTo(".cart-content-container");

            // Hidden Iterator
    $("<div class=\"cart-iteration cart-iteration-"+i+"\" hidden>"+i+"</div>").appendTo(".cart-content-container");

    //NEW ADDITION
    $("<div class=\"cart-details-container cart-details-container-"+i+"\"></div>").appendTo(".cart-item-"+i);
    //END NEW ADDITION

    $("<div class=\"cart-details cart-details-"+i+"\"></div>").appendTo(".cart-details-container-"+i);
    $("<div class=\"number-container number-container-"+i+"\"></div>").appendTo(".cart-details-"+i);

    $("<span class=\"dark-bg number number-"+i+"\">"+qte+"</span>").appendTo(".number-container-"+i);
    $("<div class=\"dark-bg name name-"+i+"\">"+name+"</div>").appendTo(".cart-details-"+i);

    // NEW ADDITION
    if(toppings !== 0)
    {
        $("<div class=\"cart-toppings-container cart-toppings-container-"+i+"\"></div>").appendTo(".cart-details-container-"+i);
        let toppingNameArray = [];
        let t = 0;
        $.each(toppings,function(i,v){
            console.log(v);
            toppingNameArray[t] = v.name;
            t++;
        });
        console.log("Topping array: " + toppingNameArray);
        $("<span class=\"dark-bg choices-title choices-title-"+i+"\">Toppings: </span>").appendTo(".cart-toppings-container-"+i);
        $("<div class=\"dark-bg choices-container choices-container-"+i+"\"></div>").appendTo(".cart-toppings-container-"+i);
        let arrayLength = toppingNameArray.length;
        $.each(toppingNameArray, function(key,v){
            if(key === arrayLength - 1)
                $("<span class=\"dark-bg choices choices-"+i+"\"> "+v+" </span>").appendTo(".choices-container-"+i);
            else
                $("<span class=\"dark-bg choices choices-"+i+"\"> "+v+" ,</span>").appendTo(".choices-container-"+i);
            console.log("this is a toppingnamearray span element: "+v);
        });
    }
    // END NEW ADDITION

    $("<div class=\"price-container price-container-"+i+"\"></div>").appendTo(".cart-details-"+i);

        // Hidden Initial Price
    $("<span class=\"initial-price-"+i+"\" hidden>"+price+"</span>").appendTo(".cart-details-"+i);
    $("<span class=\"initial-quantity-"+i+"\" hidden>"+quantity+"</span>").appendTo(".cart-details-"+i);

    $("<span class=\"dark-bg price price-"+i+"\">"+price+"</span>").appendTo(".price-container-"+i);

    $("<span class=\"dark-bg price\">dt</span>").appendTo(".price-container-"+i);
    $("<div class=\"cart-buttons-container cart-buttons-container-"+i+"\"></div>").appendTo(".cart-item-"+i);
    $("<div class=\"cart-buttons cart-buttons-"+i+"\"></div>").appendTo(".cart-buttons-container-"+i);
    // $("<button class=\"edit-cart btn btn-outline-light edit-cart-"+i+"\">Edit</button>").appendTo(".cart-buttons-"+i);
    $("<button class=\"edit-cart btn btn-outline-light edit-cart-"+i+"\" data-toggle='modal' data-target='#editInstructions' \">Edit</button>").appendTo(".cart-buttons-"+i);
    $("<button class=\"remove-cart btn btn-outline-light remove-cart-"+i+"\">Remove</button>").appendTo(".cart-buttons-"+i);
    // TODO : Make it a modal to edit Topping choices made by user ( like Edit )
    // $("<button class=\"toppings-cart btn btn-outline-light toppings-cart-"+i+"\">Toppings</button>").appendTo(".cart-buttons-"+i);
    $("<div class=\"cart-plus-minus cart-plus-minus-"+i+"\"></div>").appendTo(".cart-buttons-container-"+i);
    $("<span class=\"cart-plus dark-bg cart-plus-"+i+"\">+</span>").appendTo(".cart-plus-minus-"+i);
    $("<span class=\"cart-minus dark-bg cart-minus-"+i+"\">-</span>").appendTo(".cart-plus-minus-"+i);

    // TODO : Make it an input Qte
    $("<input type=\"hidden\" class=\"quant-"+i+"\" name=\"quant-"+i+"\" id=\"quant-"+i+"\" value=\""+qte+"\">").appendTo(".cart-item-"+i);
    // TODO : Make it an input Name
    $("<input type=\"hidden\" class=\"name-input-"+i+"\" name=\"name-input-"+i+"\" id=\"name-input-"+i+"\" value='"+name+"'>").appendTo(".cart-item-"+i);
    // TODO : Make it an input Price
    $("<input type=\"hidden\" class=\"price-input-"+i+"\" name='price-input"+i+"' id=\"price-input-"+i+"\" value=\""+price+"\">").appendTo(".cart-item-"+i);
    // TODO : Make it an input Toppings Array
    $("<input type=\"hidden\" class=\"topping-input-"+i+"\" name='topping-input-"+i+"' id=\"topping-input-"+i+"\" value=\"\">").appendTo(".cart-item-"+i);

    if(toppings !== 0)
        $("#topping-input-"+i).attr("data-assessments", JSON.stringify(toppings));

    // TODO : Make it an input Instructions
    $("<input type='hidden' class=\"cart-instructions cart-instructions-"+i+"\" id='cart-instructions-"+i+"' name=\"cart-instructions-"+i+"\" value=\""+instructions+"\">").appendTo(".cart-item-"+i);
    // $("<textarea class=\"cart-instructions cart-instructions-"+i+"\" name=\"cart-instructions-"+i+"\" hidden>"+instructions+"</textarea>").appendTo(".cart-item-"+i);
}

// Checks if the Donut already exists in the Cart before adding it

var checkCartItem = function(i, qte, name, price, instructions, quantity, toppings){

    var loop = 0;
    var validation = 1;

    $(".cart-item").each(function(){
        let nameHtml = $(".name-"+loop).html();


        if(String(nameHtml) === name )
        {
            let attr = $("#topping-input-"+loop).attr("data-assessments");

            if (typeof attr !== typeof undefined && attr !== false) {
                if(toppings !== 0){

                    let toppingArray = JSON.parse(attr);
                    let toppingArrayLength = toppingArray.length;
                    let toppingMatches = 0;

                    if(toppingArrayLength !== toppings.length)
                    {
                        validation = 1;
                    }
                    else
                    {
                        $.each(toppingArray, function(key, v){
                            $.each(toppings,function(key2, v2){
                                if(v.name === v2.name)
                                    toppingMatches++;
                            });
                        });
                        if(toppingMatches === toppingArrayLength)
                            validation = 0;
                    }

                    if( validation === 0 )
                    {
                        loop=-1;
                        return false;
                    }
                    else
                        loop++;
                }
                else
                    loop++;
            }
            else if(toppings !== 0){
                loop++;
            }
            else{
                loop=-1;
                return false;
            }
        }
        else
            loop++;

    //     let nameHtml = $(".name-"+loop).html();
    //         if(String(nameHtml) === name )
    //         {
    //             loop=-1;
    //             return false;
    //         }
    //         else
    //             loop++;


    });

    if( loop > -1 )
        addCartItem(i, qte, name, price, instructions, quantity, toppings);
}

// Removes the donut from the cart ( in the cart )

var removeCartItem = function(i){
    $(".cart-item-"+i).remove();
    $(".cart-iteration-"+i).remove();
}

// Increment the donut Price  ( in the cart )

var incrementCartItemPrice = function(i){
    let initialPriceHtml = $(".initial-price-"+i).html();
    let priceHtml = $(".price-"+i).html();
    let initialPrice = parseFloat(initialPriceHtml);
    let price = parseFloat(priceHtml);
    price += initialPrice;

    $("#price-input-"+i).val(price);
    $(".price-"+i).html(price);
}

// Increments the donut Quantity ( and thus its price ) ( in the cart )

var incrementCartItemQte = function(i){
    let qte = $(".number-"+i).html();
    qte ++;
    $(".number-"+i).html(qte);
    $("#quant-"+i).val(qte);
    incrementCartItemPrice(i);
}

// Decrements a Donut price ( in the cart )

var decrementCartItemPrice = function(i){
    let initialPriceHtml = $(".initial-price-"+i).html();
    let priceHtml = $(".price-"+i).html();
    let initialPrice = parseFloat(initialPriceHtml);
    let price = parseFloat(priceHtml);
    price -= initialPrice;

    $("#price-input-"+i).val(price);
    $(".price-"+i).html(price);
}

// Decrements a donuts' quantity and thus the total price ( in the cart )

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

// Checks how many Donuts there is

var cartItemIterator = function() {
    let i = 0;
    $(".cart-item").each(function(){
        i++;
    })
    return i;
}

// Pass Donuts instructions to Modal ( on Edit )

var cartItemEditInstructions = function(iterator) {
    let i = 0;
    $(".cart-item").each(function(){
        i++;
    })
    return i;
}

// Topping Class

class Topping {
    constructor(slug, price, name) {
        this.slug = slug;
        this.price = price;
        this.name = name;
    }
}

// Donut displayed in the Cart Class

class Donuts {
    constructor(quantity, price, name, instructions,toppings) {
        this.quantity = quantity;
        this.price = price;
        this.name = name;
        this.toppings = toppings;

        if(typeof instructions !== 'undefined')
        {
            this.instructions = instructions;
        }
        else
            this.instructions = "";
    }
}

$(document).ready(function(){

    // Close the Confirm popup modal of the Pickup confirmation

    $(".close-cart-confirm").click(function(){
        $(".cart-confirm-container").removeClass("cart-confirm-container-on");
    });

    // Confirming the pickup ( #delivery-confirm is a hidden input value which stocks if the pickup has already been confirmed or not)

    $("#pickup-confirm-btn").click(function(e){
        e.preventDefault();

        $("#delivery-confirm").val(1);
        $("#pickup").trigger("click");
        $(".cart-confirm-container").removeClass("cart-confirm-container-on");
    });

    // The function that validates the pickup

    $("#pickup").click(function(a){
        a.preventDefault();

        let confirmHtml = $("#delivery-confirm").val();
        let confirm = parseInt(confirmHtml, 10);

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
            let attr = $("input#topping-input-"+i).attr("data-assessments");
            let toppingArray = [];
            if (typeof attr !== typeof undefined && attr !== false) {
                toppingArray = JSON.parse(attr);
                donutsArray[i] = new Donuts(cartQte, cartPrice, cartName, cartInstruct,toppingArray);
                console.log(toppingArray);
            }
            else
                donutsArray[i] = new Donuts(cartQte, cartPrice, cartName, cartInstruct);
            i++;
        });
        clientName = $("input#client-name").val();
        clientPhone = $("input#client-phone").val();
        intRegex = /\(?([0-9]{2})\)?([ .-]?)([0-9]{3})\2([0-9]{3})/;
        nameRegex = /^[a-zA-Z ]{3,30}$/;



        console.log(clientPhone);
        console.log(clientName);
        console.log(donutsArray);
        if( typeof clientName === "undefined" || (!nameRegex.test(clientName)))
        {
            alert('Please enter a valid name, Young Padawan.');
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
        else if( confirm !== 1 )
        {
            $(".cart-confirm-container").addClass("cart-confirm-container-on");
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

    // Close delivery confirm modal 

    $(".close-cart-address").click(function(){
        $(".cart-address-container").removeClass("cart-address-container-on");
    });

    // Confirm delivery modal ( + input address )

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

    // Delivery function 

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
            let cartName = $("input#name-input-"+cartItemIterator).val();
            let cartQte = $("input#quant-"+cartItemIterator).val();
            let cartPrice = $("input#price-input-"+cartItemIterator).val();
            let cartInstruct = $("input#cart-instructions-"+i).val();
            let attr = $("input#topping-input-"+i).attr("data-assessments");
            let toppingArray = [];
            if (typeof attr !== typeof undefined && attr !== false) {
                toppingArray = JSON.parse(attr);
                donutsArray[i] = new Donuts(cartQte, cartPrice, cartName, cartInstruct,toppingArray);
                console.log(toppingArray);
            }
            else
                donutsArray[i] = new Donuts(cartQte, cartPrice, cartName, cartInstruct);
            i++;
        });
        clientName = $("input#client-name").val();
        clientPhone = $("input#client-phone").val();
        clientAddress = $("input#client-address").val();
        intRegex = /\(?([0-9]{2})\)?([ .-]?)([0-9]{3})\2([0-9]{3})/;
        nameRegex = /^[a-zA-Z ]{3,30}$/;



        console.log(clientPhone);
        console.log(clientName);
        console.log(clientAddress);
        console.log(donutsArray);
        if( typeof clientName === "undefined" || (!nameRegex.test(clientName)) )
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
        else if( $link.attr('id') === "delivery-done")
        {
            alert("Your order is ongoing!");
        }
        else if( $(".order-pickup").is("#pickup-done"))
        {
            alert("Your order is ongoing!");
        }
        else if( confirm !== 1 )
        {
            $(".cart-address-container").addClass("cart-address-container-on");
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

    // Displaying a donut found in the menu ( process goes in the DB to seek its information)

    $(".js-add-to-cart").click(function(e){
        e.preventDefault();

        var $link = $(e.currentTarget);

        $.ajax({
            method: 'POST',
            url: $link.attr('href')
        }).done(function(data) {
            $(".item-add-btn").attr("href", "/order/donut/"+data.slug);
            $(".donut-order-img-chosen").attr("src", "images\\"+data.link);
            $(".donut-chosen-title").html(data.name);
            $(".item-desc-text").html(data.description);
            $(".item-chosen-container").addClass("item-chosen-popup-container");
            $(".item-chosen").addClass("item-chosen-popup");
            $(".item-chosen").css({
                "z-index":"9999999"
            });
        });
    });

    // Displaying the topping menu

    $(".js-show-topping-menu").click(function(e){
        e.preventDefault();

        let toppingNumber = $("#total-topping-iterations").val();

        for( let i = 0; i<toppingNumber ; i++)
        {
            $("#topping-"+i).prop("checked",false);
        }



        $(".topping-menu-container").addClass("topping-menu-container-show");
        $(".topping-menu-container").css({
            "z-index":"99999999"
        });
        $(".topping-menu").addClass("topping-menu-show");
        $(".topping-menu").css({
            "z-index":"999999999"
        });
    });

    // Button confirming the Topping Choices of the user

    $(".js-confirm-toppings").click(function(e){
       e.preventDefault();

       let toppingNumber = $("#total-topping-iterations").val();
       let t = 0;
       var toppingsArray = [];

       for( let i = 0; i<toppingNumber ; i++)
       {
           let toppingChecked = $("#topping-"+i).is(":checked");
           if(toppingChecked)
           {
               let slug = $("#topping-slug-"+i).val();
               let name = $("#topping-name-"+i) .val();
               let price = $("#topping-price-"+i).val();

               toppingsArray[t] = new Topping(slug,price,name);
               t++;
           }
       }
       console.log(toppingsArray);
        $("#topping-array").attr("data-assessments", JSON.stringify(toppingsArray));

       $(".close-topping-menu").trigger("click");
    });

    // Adds a donut from the menu to the cart

    $(".js-item-add-btn").click(function(e){
        e.preventDefault();

        var $link = $(e.currentTarget);

        $.ajax({
            method: 'POST',
            url: $link.attr('href')
        }).done(function(data) {
            let instructions = $('#donut-instructions').val();
            let attr = $("#topping-array").attr("data-assessments");

            if (typeof attr !== typeof undefined && attr !== false) {
                let toppingArray = JSON.parse(attr);
                let toppingPriceAdded = 0;
                // console.log(toppingArray);
                $.each(toppingArray,function(price,v){
                    toppingPriceAdded += parseFloat(v.price);
                });
                // console.log(toppingPriceAdded);
                checkCartItem(cartItemIterator(), 1,data.name, data.price+toppingPriceAdded, instructions, data.quantity, toppingArray);
                // console.log(instructions);
                $("#topping-array").removeAttr('data-assessments');
            }
            else{
                let toppingArray = 0;
                checkCartItem(cartItemIterator(), 1,data.name, data.price, instructions, data.quantity, toppingArray);
            }
            $(".close-item-chosen").trigger("click");
        });
    });

    // Removes a donut item from the cart

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

    // Edit an article instructions in the cart

    $(document).on("click",".edit-cart", (function(e){
        e.preventDefault();
        var editBtn = $(e.currentTarget);

        $(".cart-iteration").each(function(){
            let cartItemIteratorHtml = $(this).html();
            let cartItemIterator = parseInt(cartItemIteratorHtml, 10);
            let cartItemName = $(".name-"+cartItemIterator).html();
            let cartItemInstructions = $(".cart-instructions-"+cartItemIterator).val();

            console.log(cartItemName);
            console.log(cartItemInstructions);

            if(editBtn.hasClass("edit-cart-"+cartItemIterator))
            {
                $("#edit-article-instructions-iterator").val(cartItemIterator);
                $("#article-name-on-edit").html(cartItemName);
                $("#edit-article-instructions").html(cartItemInstructions);
                $("#editInstructions").modal("toggle");
                return false;
            }
        });
    }));

    // Submit edited article instructions in the cart

    $(document).on("click","#submit-article-instructions", (function(e){
        e.preventDefault();
        var submitEditBtn = $(e.currentTarget);

        let cartItemToSubmitHtml = $("#edit-article-instructions-iterator").val();
        let cartItemToSubmit = parseInt(cartItemToSubmitHtml, 10);
        let cartItemInsctructionsToSubmit = $("#edit-article-instructions").val();

        $(".cart-iteration").each(function(){
            let cartItemIteratorHtml = $(this).html();
            let cartItemIterator = parseInt(cartItemIteratorHtml, 10);

            if(cartItemIterator === cartItemToSubmit)
            {
                $(".cart-instructions-"+cartItemIterator).val(cartItemInsctructionsToSubmit);
                $("#editInstructions").modal("hide");
                return false;
            }
        });
    }));


    // Increments a Donut quantity ( while incrementing its price ) in the cart

    $(document).on("click",".cart-plus", (function(e){
        var incrementBtn = $(e.currentTarget);
        $(".cart-iteration").each(function(){
            let cartItemIteratorHtml = $(this).html();
            let cartItemIterator = parseInt(cartItemIteratorHtml, 10);
            let quantityHtml = $(".initial-quantity-"+cartItemIterator).html();
            let quantity = parseInt(quantityHtml, 10);


            if(incrementBtn.hasClass("cart-plus-"+cartItemIterator))
            {
                if($("#quant-"+cartItemIterator).val() >= quantity){
                    alert("No more of this Article are available.");
                    return false;
                }
                else{
                    incrementCartItemQte(cartItemIterator);
                    return false;
                }
            }
        });
    }));

    // Decrements a Donut quantity ( while decrementing its price ) in the cart

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