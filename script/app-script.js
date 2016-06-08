/**
 * Created by anhtran on 6/4/2016.
 */

function sticky_relocate() {
    var window_top = $(window).scrollTop();
    var div_top = $('#sticky-anchor');//.offset();
    var xy =  $('#sticky-anchor').position();
    if (window_top > div_top) {
        $('#sticky').addClass('stick');
        $('#sticky-anchor').height($('#sticky').outerHeight());
    } else {
        $('#sticky').removeClass('stick');
        $('#sticky-anchor').height(0);
    }
}

$(function() {
    $(window).scroll(sticky_relocate);
    sticky_relocate();
});