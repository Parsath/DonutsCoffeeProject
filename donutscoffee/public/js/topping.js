$(document).ready(function() {

    $(".close-confirm-add-topping-container").click(function () {
        $(".confirm-add-topping-container").removeClass("confirm-add-topping-container-on");
    });

    // Completely Deleting a Topping from the Menu

    $(document).on("click", "#delete-topping", (function (e) {
        e.preventDefault();

        var $link = $(e.currentTarget);

        $.ajax({
            method: 'POST',
            url: $link.attr('href'),
            success: function (a) {
                if (data.name) {
                    alert(data.name + " has been deleted successfully");
                } else
                    alert(data.notFound);
                history.go(0);
            },
            error: function (jqXhr, textStatus, errorMessage) { // error callback
                alert('Error: Your Item is already linked with other orders.');
            }
        });
    }));

    // Removing Article from Menu

    $(document).on("click", "#remove-topping", (function (e) {
        e.preventDefault();

        var $link = $(e.currentTarget);

        $.ajax({
            method: 'POST',
            url: $link.attr('href'),
        }).done(function (data) {
            if (data.name) {
                alert(data.name + " has been removed successfully");
            } else
                alert(data.notFound);
            history.go(0);
        });
    }));

    // Submit control of a new article

    $("#submit-topping").click(function (e) {

        e.preventDefault();

        var availableHtml = $("#add-topping-available");
        var available = availableHtml.is(":checked");

        console.log(available);

        if (typeof available == "undefined" || !available) {
            available = 0;
        } else
            available = 1;

        $.ajax({
            method: 'POST',
            url: "/admin/topping/new",
            data: {
                'add-name': $('#add-topping-name').val(),
                'add-price': $('#add-topping-price').val(),
                'add-availability': available,
            }
        }).done(function (data) {
            if (data.errorName) {
                $(".confirm-add-topping-container").addClass("confirm-add-topping-container-on");
                $(".confirm-add-topping-text").html("Your Topping name: " + data.errorName + " already exists.");
            } else {
                $(".confirm-add-topping-container").addClass("confirm-add-topping-container-on");
                $(".confirm-add-topping-text").css({
                    'color': '#abd238',
                });
                $(".confirm-add-topping-text").html("Your Topping: " + data.name + " has been successfully added.");
            }
        });
    });

    // Edit Submit control of an article

    $("#edit-submit-topping").click(function (e) {


        var availableHtml = $("#edit-topping-availability");
        var available = availableHtml.is(":checked");

        var isDeletedHtml = $("#edit-topping-isdeleted");
        var isDeleted = isDeletedHtml.is(":checked");

        console.log(isDeleted);

        if (typeof isDeleted == "undefined" || !isDeleted) {
            isDeleted = 0;
        } else
            isDeleted = 1;

        if (typeof available == "undefined" || !available) {
            available = 0;
        } else
            available = 1;


        var $link = $(e.currentTarget);

        $.ajax({
            method: 'POST',
            url: $link.attr('href'),
            data: {
                'edit-id': $('#edit-topping-id').val(),
                'edit-name': $('#edit-topping-name').val(),
                'edit-price': $('#edit-topping-price').val(),
                'edit-availability': available,
                'edit-isdeleted': isDeleted,
            }
        }).done(function (data) {
            if (data.errorName) {
                $(".confirm-add-topping-container").addClass("confirm-add-topping-container-on");
                $(".confirm-add-topping-text").html("Your Topping name: " + data.errorName + " already exists.");
            } else if (data.errorLink) {
                $(".confirm-add-topping-container").addClass("confirm-add-topping-container-on");
                $(".confirm-add-topping-text").html("Your Topping link: " + data.errorLink + " is already taken.");
            } else {
                $(".confirm-add-topping-container").addClass("confirm-add-topping-container-on");
                $(".confirm-add-topping-text").css({
                    'color': '#ABD238',
                });
                $(".confirm-add-topping-text").html("Your Topping: " + data.name + " has been successfully changed.");
                window.location.replace("/admin/toppings");
            }
        });
    });
});