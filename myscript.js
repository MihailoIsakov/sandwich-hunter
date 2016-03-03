
BOT_BACKGROUND = "#ffdddd";
NOT_BACKGROUND = "#ddffdd";

// Adds a than you message after the bot or not bot button is clicked
thank = function(element) {
    //thanks = $(element).closest(".k_nForum_Actions").find(".thanks");
    //if (!thanks) {
        $(element).closest(".k_nForum_Actions").prepend(
            $("<span>", {
                text: "Hvala!",
                class: "thanks"
            })
        );
    //}
};

$(document).ready(function() {
    // Add the buttons
    $(".k_nForum_Actions").each(function() {
        // Add the not bot button
        $(this).prepend(
            $("<a>", {
                text: "nije bot",
                class: "not_button",
            })
        );
        // Add the bot button
        $(this).prepend(
            $("<a>", {
                text: "BOT!",
                class: "bot_button",
            })
        );
    });

    // On click bot button
    $(".bot_button").click(function() {
        // De-bold the other button and bold this one
        $(this).parent().find(".not_button").css("font-weight", "normal");
        $(this).css("font-weight", "bold");

        // Set the comment background
        $(this).closest(".k_nForum_ReaderContentFrame").css("background", BOT_BACKGROUND);
        thank($(this));
    });

    $(".not_button").click(function() {
        // De-bold the other button and bold this one
        $(this).parent().find(".bot_button").css("font-weight", "normal");
        $(this).css("font-weight", "bold");

        // Set the comment background
        $(this).closest(".k_nForum_ReaderContentFrame").css("background", NOT_BACKGROUND);
        thank($(this));
    });

});
