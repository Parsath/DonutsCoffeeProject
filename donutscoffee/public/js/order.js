$(document).ready(function(){
    $(".js-add-to-cart").click(function(e){
        e.preventDefault();

        var $link = $(e.currentTarget);

        $.ajax({
            method: 'POST',
            url: $link.attr('href')
        }).done(function(data) {
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
});