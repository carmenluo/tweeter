/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const escape = function(str) {
    let $div = document.createElement('div');
    console.log(str);
    $div.append(document.createTextNode(str));
    console.log($div.innerHTML);
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
        $('#tweetsection').append($tweet);
    }
}

const loadtweets = function() {
    $.ajax({
        url: "/tweets",
        dataType: "JSON",
        success: function(data) {
            renderTweets(data);
        }
    });
}

const slideSection = function() {
    $('.all-scroll').click(function() {
        console.log($('new-tweet').style);
        if ($('.new-tweet').css('display') == 'none') {
            $('.new-tweet').slideDown('slow', function() {
                $('textArea').focus();
            });
        } else {
            $('.new-tweet').slideUp('slow');
        }
    })

}
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

// Test / driver code (temporary)
$(document).ready(function() {
    slideSection();
    loadtweets();
    $('form').on("submit", (event) => {
        let text = $("#textArea").val();

        event.preventDefault();
        if (text !== null && text.length !== 0 && text.length < 140) {
            $.ajax({
                type: "POST",
                // url: $(this).attr('action'),
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