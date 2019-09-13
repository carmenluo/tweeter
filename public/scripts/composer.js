/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 * 
 */
const scrollTop = function() {
    let y = window.scrollY;
    if (y > 0) {
       $("main a.toptweet").css('visibility', 'visible');
      } else {
       $("main a.toptweet").css('visibility', 'hidden');
      }
}
//determine coords to scroll to
const scrollTo = function() {
    let y = $('#tweetsection').scrollTop;
    window.requestAnimationFrame($("scrollTo"));
    window.scrollTo(0, y - y / 10);
}
$(document).ready(function(){
    scrollTop();
    window.addEventListener("scroll", scrollTop);
    $('main a.toptweet').on('click', function(){
        scrollTo();
        scrollTop();
    })
})
    