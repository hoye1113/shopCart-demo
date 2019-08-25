$('.choose-item>.dd>a').removeClass('current');
$('.choose-item>.dd>a').on('click', function(e) {
    e.preventDefault();
    $(this).siblings().removeClass('current');
    $(this).addClass('current');
})