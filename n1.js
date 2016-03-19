BOT_BACKGROUND = "#ffdddd";
NOT_BACKGROUND = "#ddffdd";

// Get the generated user ID
chrome.runtime.sendMessage({method: "getId"}, function(response) {
    userid = response.status;
});

// Adds a than you message after the bot or not bot button is clicked
thank = function(element, data) {
    thanks = $(element).closest(".comment-unit").find(".bot_count").text(' ' + data.bot_count);
    thanks = $(element).closest(".comment-unit").find(".bot_count").text(' ' + data.bot_count);
    thanks = $(element).closest(".comment-unit").find(".bot_count").css('padding-left', '4px');
    thanks = $(element).closest(".comment-unit").find(".bot_count").css('padding-left', '4px');
    //thanks = $(element).closest(".not_count").find(".not_count").text(data.not_count);
    //thanks = $(element).closest(".not_count").find(".not_count").text(data.not_count);
};

send_data = function(data, thank_button) {
    $.ajax({
        type: "GET",
        url: "http://46.101.172.101/n1",
        //url: "http://0.0.0.0:5000/n1",
        data: data,
        success: function(response) {
            thank(thank_button, response);
        },
    });
};

// Collects the information about the comment 
//   - the authors username, timestamp, votes...
collect_data = function(element) {
    element = element.closest(".comment-unit").first();
    id = '';
    if(element.find(".js_replyComment").length) {
        id = element.find(".js_replyComment").attr('data-comm-id');
    } else { 
        id = element.find(".js_toggleLike").attr('id');
    }
    var link = $(location).attr('href');
    var author = element.find(".comment-author").text().trim();
    //var parent_author = element.find(".k_parentAuthor").text().trim();
    var parent_author = '';
    var comment = element.find(".comment-text").text().trim();
    var vote_count = '';
    var upvotes = element.find(".comment-likes .js_likeNum").text().trim();
    var downvotes = element.find(".comment-dislikes .js_likeNum").text().trim();
    //var timestamp = element.find("k_nForum_CommentInfo span")[0].text().trim();
    // TODO add user id, email, and response

    data = {
        'userid': userid,
        'id': id,
        'link': link,
        'author': author,
        'comment': comment,
        'upvotes': upvotes,
        'downvotes': downvotes,
        //'timestamp': timestamp
    };

    return data;
};


// Once ready, manipulate the DOM
$(document).ready(function() {

    // Add the buttons
    $(".comment-likes").each(function() {
        var bot_button = $('<span class="btn btn-grey no-translate-y bot_button"><span class="js_likeNum" >BOT! <span class="bot_count"></span></span></span>');
        var not_button = $('<span class="btn btn-grey no-translate-y not_button"><span class="js_likeNum" >nije bot <span class="bot_count"></span></span></span>');

        bot_button.insertBefore(this);
        not_button.insertBefore(this);
    });

    // On click bot button
    $(".bot_button").click(function() {
        // De-bold the other button and bold this one
        $(this).parent().find(".not_button span").css("font-weight", "normal");
        $(this).find("span").css("font-weight", "bold");

        // Set the comment background
        $(this).closest(".comment-unit").css("background", BOT_BACKGROUND);

        data = collect_data($(this));
        data['bot'] = true;
        send_data(data, $(this));
    });

    $(".not_button").click(function() {
        // De-bold the other button and bold this one
        $(this).parent().find(".bot_button span").css("font-weight", "normal");
        $(this).find("span").css("font-weight", "bold");

        // Set the comment background
        $(this).closest(".comment-unit").css("background", NOT_BACKGROUND);

        data = collect_data($(this));
        data['bot'] = false;
        send_data(data, $(this));
    });
});
