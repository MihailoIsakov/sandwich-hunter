BOT_BACKGROUND = "#ffdddd";
NOT_BACKGROUND = "#ddffdd";

// Get the generated user ID
chrome.runtime.sendMessage({method: "getId"}, function(response) {
    userid = response.status;
});

// Adds a than you message after the bot or not bot button is clicked
thank = function(element, data) {
    thanks = $(element).closest("li").find(".bot_count").text(data.bot_count);
    thanks = $(element).closest("li").find(".not_count").text(data.not_count);
};

send_data = function(data, thank_button) {
    $.ajax({
        type: "GET",
        //url: "http://0.0.0.0:5000/b92",
        url: "http://46.101.172.101/b92",
        data: data,
        success: function(response) {
            thank(thank_button, response);
        },
    });
};

// Collects the information about the comment 
//   - the authors username, timestamp, votes...
collect_data = function(element) {
    var id = element.attr('id');
    var link = $(location).attr('href');
    var author = element.find(".comment-author").text().trim();
    var parent_author = "";
    var comment = element.text().trim();
    var vote_count = element.find(".k_nForum_MarkTipCount span").text().trim();
    var upvotes = element.find(".rate-up span").text().trim();
    var downvotes = element.find(".rate-dn span").text().trim();
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
    // Delete the timestamp to make some space
    //$(".k_nForum_CommentInfo").first().remove();

    // Add the buttons
    //$(".rate-comment-container").each(function() {
    $(".rate-comment-row").each(function() {
        holder = $("<div>", {class: "holder rc-item"});
        $(this).prepend(holder);

        holder.prepend(
            $("<span>", {
                text: "",
                class: "not_count rc-item",
            })
        );
        // Add the not bot button
        holder.prepend(
            $("<a>", {
                text: "nije bot",
                class: "not_button",
            })
        );
        //Add the bot button
        holder.prepend(
            $("<a>", {
                text: "BOT!",
                class: "bot_button",
            })
        );
        holder.prepend(
            $("<span>", {
                text: "",
                class: "bot_count",
            })
        );
    });

    // On click bot button
    $(".bot_button").click(function() {
        // De-bold the other button and bold this one
        $(this).parent().find(".not_button").css("font-weight", "normal");
        $(this).css("font-weight", "bold");

        // Set the comment background
        comment = $(this).closest("li");
        comment.css("background", BOT_BACKGROUND);
        data = collect_data(comment);
        data['bot'] = true;
        send_data(data, $(this));
    });

    $(".not_button").click(function() {
        // De-bold the other button and bold this one
        $(this).parent().find(".bot_button").css("font-weight", "normal");
        $(this).css("font-weight", "bold");

        // Set the comment background
        comment = $(this).closest("li");
        comment.css("background", NOT_BACKGROUND);
        data = collect_data(comment);
        data['bot'] = false;
        send_data(data, $(this));
    });
});
