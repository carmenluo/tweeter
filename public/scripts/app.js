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
    const submitTweet = (event)
    const $tweet = $("<article>").addClass("tweet");

    const $p = $("<p>");
    $p.html(escape(tweetData.content.text));
    const $footer = $("<footer>");

    const days = Math.floor((new Date().getTime() - tweetData.created_at) / 86400 / 1000);
    const $timeStamp = $("<div>").attr("id", "timestamp").html(`${days} days ago`);
    const $div1 = $("<div>").addClass("icon1").html("icon1");
    const $div2 = $("<div>").addClass("icon2").html("icon2");
    const $div3 = $("<div>").addClass("icon3").html("icon3");
    const $img = $("<img>", { src: tweetData.user.avatars, width: 50, height: 50 });
    $footer.append($div1).append($div2).append($div3);
    $footer.append($img).append($timeStamp);
    $tweet.append($p).append($footer);
    console.log($tweet);
    return $tweet;
}
const renderTweets = function(tweet) {
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container

    const $tweet = createTweetElement(tweet);
    $('#tweetsection').append($tweet);

}

const alldata = [{
    "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png",
        "handle": "@SirIsaac"
    },
    "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
}]
const loadtweets = async function() {
    let res = await $.ajax({
        url: "/tweets",
        dataType: "JSON"
    });
    for (let tweet of res) {
        console.log(tweet);
        alldata.push(tweet);
    }
}

const slideSection = function() {
    $('.all-scroll').click(function() {
        $('.new-tweet').slideDown('slow', function() {
            $('textArea').focus();
        });
    })

}
const slideErrorMessage = function(str) {

    $('section div.alert').slideDown('slow', function() {
        $(this).html(`Error: ${str}`);
    });
}

// Test / driver code (temporary)
$(document).ready(function() {
    slideSection();
    //    renderTweets(alldata);
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
                    renderTweets(data);
                }
            })
        } else if (text.length > 140) {
            //alert();
            slideErrorMessage("Text too long");
        } else {
            // alert("Can't be empty");
            slideErrorMessage("Can't be empty");
        }
    })
})