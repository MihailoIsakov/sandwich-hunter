BOT_BACKGROUND = "#ffdddd";
NOT_BACKGROUND = "#ddffdd";

// Get the generated user ID
chrome.runtime.sendMessage({method: "getId"}, function(response) {
    userid = response.status;
});

// Adds a than you message after the bot or not bot button is clicked
thank = function(element) {
    thanks = $(element).closest(".k_nForum_Actions").find(".thanks").css("color", "grey");
};

// Collects the information about the comment 
//   - the authors username, timestamp, votes...
collect_data = function(element) {
    element = element.closest(".k_nForum_ReaderItem").first();
    var id = element.find(".k_commentHolder").attr('id').match(/\d+/g)[0];
    var link = $(location).attr('href');
    var author = element.find(".k_author").text().trim();
    var parent_author = element.find(".k_parentAuthor").text().trim();
    var comment = element.find(".k_content").text().trim();
    var vote_count = element.find(".k_nForum_MarkTipCount span").text().trim();
    var upvotes = element.find(".k_nForum_MarkTipUpPercent").text().trim();
    var downvotes = element.find(".k_nForum_MarkTipDownPercent").text().trim();
    //var timestamp = element.find("k_nForum_CommentInfo span")[0].text().trim();
    // TODO add user id, email, and response

    data = {
        'userid': userid,
        'id': id,
        'link': link,
        'author': author,
        'parent_author': parent_author,
        'comment': comment,
        'vote_count': vote_count,
        'upvotes': upvotes,
        'downvotes': downvotes,
        //'timestamp': timestamp
    };

    console.log(data);
    return data;
};

// Send the collected data to a server


// Once ready, manipulate the DOM
$(document).ready(function() {
    // Delete the timestamp to make some space
    //$(".k_nForum_CommentInfo").first().remove();

    // Add the buttons
    $(".k_nForum_Actions").each(function() {
        $(this).prepend(
            $("<span>", {
                text: "Hvala!",
                class: "thanks",
            })
        );
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
        data = collect_data($(this));
        data['bot'] = true;
    });

    $(".not_button").click(function() {
        // De-bold the other button and bold this one
        $(this).parent().find(".bot_button").css("font-weight", "normal");
        $(this).css("font-weight", "bold");

        // Set the comment background
        $(this).closest(".k_nForum_ReaderContentFrame").css("background", NOT_BACKGROUND);
        thank($(this));
        data = collect_data($(this));
        data['bot'] = false;
    });
});
