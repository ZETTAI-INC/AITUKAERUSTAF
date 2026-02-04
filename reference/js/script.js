
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

    // ナビリンククリックで閉じる（ドロップダウンボタン以外）
    navMenu.find('a').click(function(){
        hamburger.removeClass('active');
        navMenu.removeClass('active');
        navOverlay.removeClass('active');
        hamburger.attr('aria-expanded', 'false');
        hamburger.attr('aria-label', 'メニューを開く');
        $('body').css('overflow', '');
    });

    // ナビゲーションドロップダウン（モバイル）
    $('.nav-dropdown-btn').click(function(e){
        e.preventDefault();
        const parent = $(this).parent('.has-dropdown');
        const isExpanded = parent.hasClass('open');

        // 他のドロップダウンを閉じる
        $('.has-dropdown').not(parent).removeClass('open');
        $('.nav-dropdown-btn').not(this).attr('aria-expanded', 'false');

        // 現在のドロップダウンをトグル
        parent.toggleClass('open');
        $(this).attr('aria-expanded', !isExpanded);
    });

    // トップバードロップダウン
    $('.topbar-dropdown-btn').click(function(e){
        e.preventDefault();
        const isExpanded = $(this).attr('aria-expanded') === 'true';
        $(this).attr('aria-expanded', !isExpanded);
    });

    // ドロップダウン外クリックで閉じる
    $(document).click(function(e){
        if(!$(e.target).closest('.topbar-dropdown').length){
            $('.topbar-dropdown-btn').attr('aria-expanded', 'false');
        }
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


//==================== VOICEセクション タブ切り替え ====================
$(function() {
    const tabs = $('.voice-tab');
    const cards = $('.voice-card');

    tabs.on('click', function() {
        const filter = $(this).data('filter');

        // タブのアクティブ状態を更新
        tabs.removeClass('active');
        $(this).addClass('active');

        // カードのフィルタリング
        cards.each(function() {
            const cardScale = $(this).data('scale');

            if (filter === 'all' || cardScale === filter) {
                $(this).removeClass('hidden');
                $(this).css({
                    'opacity': '1',
                    'transform': 'translateY(0)'
                });
            } else {
                $(this).addClass('hidden');
            }
        });
    });
});
