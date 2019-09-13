/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
//create escape function to prevent xss
const escape = function(str) {
    let $div = document.createElement('div');
    $div.append(document.createTextNode(str));
    return $div.innerHTML;
}
const createTweetElement = function(tweetData) {

    const $tweet = $("<article>").addClass("tweet");
    //header node
    const $header = $("<div>").addClass("header");
    const $img = $("<img>", { src: tweetData.user.avatars, width: 50, height: 50 });
    const $username = $("<div>").addClass("username").html(`${tweetData.user.name}`);
    const $handle = $("<div>").addClass("handle").html(`${tweetData.user.handle}`);
    $header.append($img).append($username).append($handle);
    //article node
    const $p = $("<p>");
    $p.html(escape(tweetData.content.text));
    //footer node
    const $footer = $("<footer>");
    const days = Math.floor((new Date().getTime() - tweetData.created_at) / 86400 / 1000);
    const $timeStamp = $("<div>").attr("id", "timestamp").html(`${days} days ago`);
    const $div1 = $("<div>").addClass("icon").html("<i class='fab fa-font-awesome-flag'></i>");
    const $div2 = $("<div>").addClass("icon").html("<i class='fas fa-retweet'></i>");
    const $div3 = $("<div>").addClass("icon").html("<i class='fas fa-heart'></i>");
    $footer.append($div1).append($div2).append($div3);
    $footer.append($timeStamp);
    //Append whole things to tweet
    $tweet.append($header).append($p).append($footer);
    return $tweet;
}
const renderTweets = function(tweets) {
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
    $('#tweetsection').empty();
    for (let tweet of tweets) {
        const $tweet = createTweetElement(tweet);
        $('#tweetsection').prepend($tweet);
    }
}
//When ajax get all the tweets, call renderTweets to reload then again
const loadtweets = function() {
    $.ajax({
        url: "/tweets",
        dataType: "JSON",
        success: function(data) {
            renderTweets(data);
        }
    });
}
//Click compose button, when displayed then collapse, vice verse.
const slideSection = function() {
    $('.all-scroll').click(function() {
        if ($('.new-tweet').css('display') == 'none') {
            $('.new-tweet').slideDown('slow', function() {
                $('textArea').focus();
            });
        } else {
            $('.new-tweet').slideUp('slow');
        }
    })
};
//1. show error message when we textarea null or over 140 characters
//2. Collapse error message if submit sucessfully
const slideErrorMessage = function(str) {
    if (!str) {
        $('section div.alert').slideUp('slow', function() {
            $(this).html(``);
        });
    } else {
        $('section div.alert').slideDown('slow', function() {
            $(this).html(`Error: ${str}`);
        });
    }
}

//Every time make requrest, check error message, loadtweets
//TODO: try to make document ready at the top
$(document).ready(function() {
    slideSection();
    loadtweets();
    $('form').on("submit", (event) => {
        let text = $("#textArea").val();
//prevent default submit function and cause we call the ajax
        event.preventDefault();
        if (text !== null && text.length !== 0 && text.length < 140) {
            $.ajax({
                type: "POST",
                url: "/tweets",
                data: $('form').serialize(),
                success: function(data) {
                    $("#textArea").val('');
                    $(".counter").html("140");
                    loadtweets();
                    slideErrorMessage();
                }
            })
        } else if (text.length > 140) {
            slideErrorMessage("Text too long");
        } else {
            slideErrorMessage("Can't be empty");
        }
    })
})