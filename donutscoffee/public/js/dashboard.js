$(document).ready(function(){

    $(".close-confirm-add-container").click(function(){
        $(".confirm-add-container").removeClass("confirm-add-container-on");
    });

    $(document).on("click","#delete-article", (function(e){
        e.preventDefault();

        var $link = $(e.currentTarget);

        $.ajax({
            method: 'POST',
            url: $link.attr('href')
        }).done(function(data) {
            if(data.name){
                alert(data.name+" has been removed successfully");
            }
            else
                alert(data.notFound);
                history.go(0);
        });
    }));

    // $("#delete-article").click(function(e){
    //    e.preventDefault();
    //
    //     var $link = $(e.currentTarget);
    //
    //     $.ajax({
    //         method: 'POST',
    //         url: $link.attr('href')
    //     }).done(function(data) {
    //         if(data.name)
    //             alert(data.name+" has been removed successfully")
    //         else
    //             alert(data.notFound);
    //     });
    // });

    $("#submit-article").click(function(e){

        e.preventDefault();
        var carousel = $("#add-carousel").checked;

        if(typeof carousel == "undefined")
        {
            carousel = 0;
        }

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
                $(".confirm-add-text").html("Your Article link: "+data.errorLink+" is already taken.");
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

});