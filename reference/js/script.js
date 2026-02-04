
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


//==================== ハンバーガーメニュー ====================
$(function(){
    const hamburger = $('#hamburger');
    const navMenu = $('#nav-menu');
    const navOverlay = $('#nav-overlay');

    // ハンバーガーボタンクリック
    hamburger.click(function(){
        $(this).toggleClass('active');
        navMenu.toggleClass('active');
        navOverlay.toggleClass('active');

        // アクセシビリティ対応
        const isExpanded = $(this).hasClass('active');
        $(this).attr('aria-expanded', isExpanded);
        $(this).attr('aria-label', isExpanded ? 'メニューを閉じる' : 'メニューを開く');

        // スクロール防止
        if(isExpanded) {
            $('body').css('overflow', 'hidden');
        } else {
            $('body').css('overflow', '');
        }
    });

    // オーバーレイクリックで閉じる
    navOverlay.click(function(){
        hamburger.removeClass('active');
        navMenu.removeClass('active');
        navOverlay.removeClass('active');
        hamburger.attr('aria-expanded', 'false');
        hamburger.attr('aria-label', 'メニューを開く');
        $('body').css('overflow', '');
    });

    // ナビリンククリックで閉じる
    navMenu.find('a').click(function(){
        hamburger.removeClass('active');
        navMenu.removeClass('active');
        navOverlay.removeClass('active');
        hamburger.attr('aria-expanded', 'false');
        hamburger.attr('aria-label', 'メニューを開く');
        $('body').css('overflow', '');
    });
});


//==================== フォーカススタイル改善 ====================
// キーボード操作時のみフォーカスリングを表示
document.addEventListener('DOMContentLoaded', function() {
    document.body.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-nav');
        }
    });

    document.body.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-nav');
    });
});
