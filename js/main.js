$(document).ready(function () {
    "use strict";
    var $article = $('#gallery'),
        $img = $article.find('img'),
        $lightbox = $('#lightbox'),
        $lightImg = $lightbox.find('img'),
        $up = $lightbox.find('.fa-chevron-up'),
        $down = $lightbox.find('.fa-chevron-down'),
        $li = $('header li:not(:last)'),
        massclass = 'photo',
        counter = 1,
        imgId,
        catPosts = $img.size();
        
    $('#loader').css({'display':'block'});
    
    function getID(massclass, $img) {
        $img.each(function () {
            $(this).attr('id', massclass + counter);
            counter = counter + 1;
        });
        counter = 1;
    }
    
    getID(massclass, $img);
    
    function lightbox() {
        var img = $article.find('.light'),
            imgLink = img.attr('src'),
            fullSize,
            marginTop,
            marginLeft;
        
        $lightImg.attr('src', imgLink);
        
        $lightbox = $('#lightbox');
        fullSize = $lightImg;
        $lightbox.fadeIn(500);
        
//        Отбор размеров изображения для выравнивания
        marginTop = fullSize.height();
        marginTop = marginTop / 2 * (-1);
        marginLeft = fullSize.width();
        marginLeft = marginLeft / 2 * (-1);
        fullSize.css({
            'margin-top':  marginTop,
            'margin-left': marginLeft,
            'position' : 'absolute',
            'top' : '50%',
            'left' : '50%'
        });
        
    }
    $img.click(function () {
        imgId = $(this).attr('id');
        imgId = Number(imgId.replace(/\D+/g, ""));
        
        $(this).addClass('light');
        $down.removeClass('hidden');
        $up.removeClass('hidden');
        if (imgId === 1) {
            $up.addClass('hidden');
        }
        
        if (imgId === catPosts) {
            $down.addClass('hidden');
        }
        lightbox();
    });
    
    
    $lightbox.find('.fa-times').click(function () {
        $lightbox.fadeOut(500);
        $img.removeClass('light');
    });
    
    $(function () {
        var element = $("#up"), display;
        $(window).scroll(function () {
            display = $(this).scrollTop() >= 500;
            display !== element.css('opacity') && element.stop().animate({ 'opacity': display }, 500);
        });
    });

    $up.click(function () {
        imgId = imgId - 1;
        var currentImg = $('.light'),
            prevImg = $('#' + massclass + imgId);
        
        if (imgId  < 2) {
            $(this).addClass('hidden');
        }
        if ($down.hasClass('hidden')) {
            $down.removeClass('hidden');
        }
        currentImg.removeClass('light');
        prevImg.addClass('light');
        lightbox();

    });
   
   
    $down.click(function () {
        imgId = imgId + 1;
        var currentImg = $('.light'),
            nextImg = $('#' + massclass + imgId);
        
        if (imgId === catPosts) {
            $(this).addClass('hidden');
        }
        if ($up.hasClass('hidden')) {
            $up.removeClass('hidden');
        }
        
        currentImg.removeClass('light');
        nextImg.addClass('light');
        lightbox();
    });
    
    $li.click(function () {
        var $class = $(this).attr('id'),
            $needclass = $article.find('.' + $class);
        catPosts = $needclass.size();
        if ($(this).hasClass('active')) {
                
        } else {
            massclass = $class;
            $img.removeAttr('id');
            getID(massclass, $needclass);
            if ($class === 'photo') {
                $li.removeClass('active');
                $(this).addClass('active');
                $img.fadeIn(700);
                getID(massclass, $img);
            } else {
                $li.removeClass('active');
                $(this).addClass('active');
                $img.fadeOut(0);
                if ($img.hasClass($class)) {
                    $needclass.fadeIn(700);
                }
            }
        }
    });
    window.onload = function () {
        var $loader = $('#loader'),
            $main = $('main');
        $main.css({
            'overflow': 'auto',
            'height': 'auto'
        });
        $loader.fadeOut(300);
        
    };
    window.onerror = function () {
        var $loader = $('#loader');
        $loader.fadeOut(300);
    };
});
