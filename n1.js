BOT_BACKGROUND = "#ffdddd";
NOT_BACKGROUND = "#ddffdd";

// Get the generated user ID
chrome.runtime.sendMessage({method: "getId"}, function(response) {
    userid = response.status;
});

// Adds a than you message after the bot or not bot button is clicked
thank = function(element, data) {
    thanks = $(element).closest(".k_nForum_Actions").find(".bot_count").text(data.bot_count);
    thanks = $(element).closest(".k_nForum_Actions").find(".not_count").text(data.not_count);
};

send_data = function(data, thank_button) {
    $.ajax({
        type: "GET",
        url: "http://46.101.172.101/n1",
        //url: "http://0.0.0.0:5000/blic",
        data: data,
        success: function(response) {
            thank(thank_button, response);
        },
    });
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

    return data;
};


// Once ready, manipulate the DOM
$(document).ready(function() {

    // Add the buttons
    $(".comment-likes").each(function() {
        var bot_button = $('<span class="btn btn-grey no-translate-y comment-dislikes js_toggleLike><span class="js_likeNum bot_button" >BOT!</span></span>');
        var not_button = $('<span class="btn btn-grey no-translate-y comment-dislikes js_toggleLike><span class="js_likeNum not_button" >nije bot</span></span>');

        bot_button.insertBefore(this);
        not_button.insertBefore(this);
    });

    // On click bot button
    $(".bot_button").click(function() {
        // De-bold the other button and bold this one
        $(this).parent().find(".not_button").css("font-weight", "normal");
        $(this).css("font-weight", "bold");

        // Set the comment background
        $(this).closest(".k_nForum_ReaderContentFrame").css("background", BOT_BACKGROUND);
        data = collect_data($(this));
        data['bot'] = true;
        send_data(data, $(this));
    });

    $(".not_button").click(function() {
        // De-bold the other button and bold this one
        $(this).parent().find(".bot_button").css("font-weight", "normal");
        $(this).css("font-weight", "bold");

        // Set the comment background
        $(this).closest(".k_nForum_ReaderContentFrame").css("background", NOT_BACKGROUND);
        data = collect_data($(this));
        data['bot'] = false;
        send_data(data, $(this));
    });
});
