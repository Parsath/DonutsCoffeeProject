$(document).ready(function(){

    $(".close-confirm-add-container").click(function(){
        $(".confirm-add-container").removeClass("confirm-add-container-on");
    });

    // Completely Deleting a Donut from the Menu

    $(document).on("click","#delete-article", (function(e){
        e.preventDefault();

        var $link = $(e.currentTarget);

        $.ajax({
            method: 'POST',
            url: $link.attr('href'),
            success: function (a){
                if(data.name){
                    alert(data.name+" has been deleted successfully");
                }
                else
                    alert(data.notFound);
                history.go(0);
            },
            error: function (jqXhr, textStatus, errorMessage) { // error callback
                alert('Error: Your Item is already linked with other orders.');
            }});
    }));

    // Removing Article from Menu

    $(document).on("click","#remove-article", (function(e){
        e.preventDefault();

        var $link = $(e.currentTarget);

        $.ajax({
            method: 'POST',
            url: $link.attr('href'),
        }).done(function(data) {
            if(data.name){
                alert(data.name+" has been removed successfully");
            }
            else
                alert(data.notFound);
            history.go(0);
        });
    }));

    // Submit control of a new article

    $("#submit-article").click(function(e){

        e.preventDefault();

        var carouselHtml = $("#add-carousel");
        var carousel = carouselHtml.is(":checked");

        console.log(carousel);

        if(typeof carousel == "undefined" || !carousel)
        {
            carousel = 0;
        }
        else
            carousel = 1;

        $.ajax({
            method: 'POST',
            url: "/admin/article/new",
            data: {
                'add-name' : $('#add-name').val(),
                'add-description' : $('#add-description').val(),
                'add-quantity' : $('#add-quantity').val(),
                'add-price' : $('#add-price').val(),
                'add-link' : $('#add-link').val(),
                'add-carousel' : carousel,
            }
        }).done(function(data) {
            if(data.errorName){
                $(".confirm-add-container").addClass("confirm-add-container-on");
                $(".confirm-add-text").html("Your Article name: "+data.errorName+" already exists.");
            }
            else if(data.errorLink){
                $(".confirm-add-container").addClass("confirm-add-container-on");
                $(".confirm-add-text").html("Error : "+data.errorLink+".");
            }
            else{
                $(".confirm-add-container").addClass("confirm-add-container-on");
                $(".confirm-add-text").css({
                    'color' : '#ABD238',
                });
                $(".confirm-add-text").html("Your Article: "+data.name+" has been successfully added.");
            }
        });
    });

    // Edit Submit control of an article

    $("#edit-submit-article").click(function(e){


        var carouselHtml = $("#edit-carousel");
        var carousel = carouselHtml.is(":checked");

        var isDeletedHtml = $("#edit-isdeleted");
        var isDeleted = isDeletedHtml.is(":checked");

        console.log(isDeleted);

        if(typeof isDeleted == "undefined" || !isDeleted)
        {
            isDeleted = 0;
        }
        else
            isDeleted = 1;

        if(typeof carousel == "undefined" || !carousel)
        {
            carousel = 0;
        }
        else
            carousel = 1;


        var $link = $(e.currentTarget);

        $.ajax({
            method: 'POST',
            url: $link.attr('href'),
            data: {
                'edit-id' : $('#edit-id').val(),
                'edit-name' : $('#edit-name').val(),
                'edit-description' : $('#edit-description').val(),
                'edit-quantity' : $('#edit-quantity').val(),
                'edit-price' : $('#edit-price').val(),
                'edit-link' : $('#edit-link').val(),
                'edit-carousel' : carousel,
                'edit-isdeleted' : isDeleted,
            }
        }).done(function(data) {
            if(data.errorName){
                $(".confirm-add-container").addClass("confirm-add-container-on");
                $(".confirm-add-text").html("Your Article name: "+data.errorName+" already exists.");
            }
            else if(data.errorLink){
                $(".confirm-add-container").addClass("confirm-add-container-on");
                $(".confirm-add-text").html("Your Article link: "+data.errorLink+" is already taken.");
            }
            else{
                $(".confirm-add-container").addClass("confirm-add-container-on");
                $(".confirm-add-text").css({
                    'color' : '#ABD238',
                });
                $(".confirm-add-text").html("Your Article: "+data.name+" has been successfully changed.");
                window.location.replace("/admin/menu");
            }
        });
    });

    // Shipping Order in the Pannel

    $(document).on("click","#ship-order", (function(e){
        e.preventDefault();

        var $link = $(e.currentTarget);

        $.ajax({
            method: 'POST',
            url: $link.attr('href'),
        }).done(function(data) {
            if(data.notFound){
                alert(data.notFound);
            }
            else{
                alert("Your Order has been marked as shipped.");
                history.go(0);
            }
        });
    }));

    // Cancelling Order in the Pannel

    $(document).on("click","#cancel-order", (function(e){
        e.preventDefault();

        var $link = $(e.currentTarget);

        $.ajax({
            method: 'POST',
            url: $link.attr('href'),
        }).done(function(data) {
            if(data.notFound){
                alert(data.notFound);
            }
            else{
                alert("Your Order has been marked as cancelled.");
                history.go(0);
            }
        });
    }));

    // Show Order in the Order menu

    $(document).on("click","#show-order", (function(e){

        var $link = $(e.currentTarget);

        $.ajax({
            method: 'POST',
            url: $link.attr('href'),
            error: function (jqXhr, textStatus, errorMessage) { // error callback
                alert('Order Not Found');
            }});
    }));

});