
//==================== スクロールテーブル ====================
window.addEventListener('DOMContentLoaded', function () {
    new ScrollHint('.js-scrollable', {
    suggestiveShadow: true,
    i18n: {
        scrollable: "横スクロール"
    }
    });
});




//==================== アコーディオン ====================
$(function(){
        $('.nav-open').click(function(){
            $(this).toggleClass('active_menu');
            $(this).next('div').slideToggle();
        });
    $('.nav-open').click(function(){
        $(this).toggleClass('active');
        $(this).next('p').slideToggle();
    });
});


//==================== アウトプット ポップアップ====================

 $(".modal-btn").modaal({
        hide_close: true,
        overlay_close:true,
        width:1000,
    });
    $('.inline_close').click(function(){
	$('.modal-btn').modaal('close');
  });
  $(".modal01").modaal({
        hide_close: true,
        overlay_close:true,
        width:1000,
    });
    $('.inline_close01').click(function(){
	$('.modal01').modaal('close');
  });
  $(".modal02").modaal({
        hide_close: true,
        overlay_close:true,
        width:1000,
    });
    $('.inline_close02').click(function(){
	$('.modal02').modaal('close02');
  });
  $(".modal03").modaal({
        hide_close: true,
        overlay_close:true,
        width:1000,
    });
    $('.inline_close03').click(function(){
	$('.modal03').modaal('close03');
  });
  $(".modal04").modaal({
        hide_close: true,
        overlay_close:true,
        width:1000,
    });
    $('.inline_close04').click(function(){
	$('.modal04').modaal('close04');
  });




