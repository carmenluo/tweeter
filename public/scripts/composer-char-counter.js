/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {
    $('#textArea').on('keypress', function() {
        let maxlength = parseInt($(this).siblings('span').text());
        let val = $(this).val();
        $(this).siblings('span').html(maxlength - 1);
        if (vallength > maxlength) {
            $(this).siblings('span').css('color', 'red');
        }
    })
})

// $('#textArea').on('keyup', function() {

//     // Store the maxlength and value of the field.
//     var maxlength = $(this).attr('maxlength');
//     var val = $(this).val();

//     var vallength = val.length;
//     $("#counter-div").html(vallength);

//     // red color
//     if (vallength >= 10) {
//         $('#counter-div').css('color', 'red');
//     }
//     if (vallength <= 9) {
//         $('#counter-div').css('color', '');
//     }

//     // Trim the field if it has content over the maxlength.
//     if (vallength > maxlength) {
//         $(this).val(val.slice(0, maxlength));
//     }
// });

// //
// $('textArea').on('blur', function() {
//     $('#counter-div').hide('slow');
// });