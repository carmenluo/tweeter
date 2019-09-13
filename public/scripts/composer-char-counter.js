/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 * 1. if shiftKey, we won't collect
 */
$(document).ready(function() {
    $('#textArea').on('keydown', function(e) {
        if (!e.shiftKey) {
            let maxlength = 140;
            let val = $(this).val();
            $(this).siblings('span').html(maxlength - val.length);
            if (val.length > 140) {
                $(this).siblings('span').css('color', 'red');
            } else {
                $(this).siblings('span').css('color', 'black');
            }
        }
    })
})