/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 * 
 */

const scrollTop = function () {
    let y = window.scrollY;
    if (y > 0) {
        $("main a.toptweet").css('visibility', 'visible');
    } else {
        $("main a.toptweet").css('visibility', 'hidden');
    }
}
//determine coords to scroll to
const scrollTo = function () {
    //set a variable for the number of pixels we are from the top of the document.
    let y = document.documentElement.scrollTop || document.body.scrollTop;
    if (y > 0) {
        //requestAnimationFrame is a call back function
        window.requestAnimationFrame(scrollTo);
        //Get a smoother scroll action
        window.scrollTo(0, y - y / 10);
    }
}
$(document).ready(function () {
    scrollTop();
    window.addEventListener("scroll", scrollTop);
    $('main a.toptweet').on('click', function (e) {
        e.preventDefault();
        scrollTo();
        scrollTop();
    })
})
