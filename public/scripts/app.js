/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const createTweetElement = function(tweetData) {
    const $tweet = $("<article>").addClass("tweet");

    const $p = $("<p>");
    $p.html(tweetData.content.text);
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
const renderTweets = function(tweets) {
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
    for (let tweet of tweets) {
        const $tweet = createTweetElement(tweet);
        $('#tweetsection').append($tweet);
    }
}
const data = [{
        "user": {
            "name": "Newton",
            "avatars": "https://i.imgur.com/73hZDYK.png",
            "handle": "@SirIsaac"
        },
        "content": {
            "text": "If I have seen further it is by standing on the shoulders of giants"
        },
        "created_at": 1461116232227
    },
    {
        "user": {
            "name": "Descartes",
            "avatars": "https://i.imgur.com/nlhLi3I.png",
            "handle": "@rd"
        },
        "content": {
            "text": "Je pense , donc je suis"
        },
        "created_at": 1461113959088
    }
]



// Test / driver code (temporary)
$(document).ready(function() {
    renderTweets(data);
})