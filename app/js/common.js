$(function() {
    var offset = 220;
    var duration = 500;
    $(window).scroll(function() {
        if (jQuery(this).scrollTop() > offset) {
            jQuery('#myBtn').fadeIn(duration);
        } else {
            jQuery('#myBtn').fadeOut(duration);
        }
    });

    $('#myBtn').click(function(event) {
        event.preventDefault();
        jQuery('html, body').animate({scrollTop: 0}, duration);
        return false;
    })
});


$(document).ready(function(){
    $('#btn').click( function(){ 
	var scroll_el = $(this).attr('href'); // возьмем содержимое атрибута href, должен быть селектором, т.е. например начинаться с # или .
        if ($(scroll_el).length != 0) { // проверим существование элемента чтобы избежать ошибки
	    $('html, body').animate({ scrollTop: $(scroll_el).offset().top }, 500); // анимируем скроолинг к элементу scroll_el
        }
	    return false; // выключаем стандартное действие
    });
});