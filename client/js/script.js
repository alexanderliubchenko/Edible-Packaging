$(document).ready(function() {
    'use strict';
    
    // меню для мобильной версии
    
    $(".page-header__mobile").on("click", function() {
        $(".page-header__nav").toggleClass("popup-nav");
        $("#page-header__icon").toggleClass("fa-bars fa-times");
        $("body").toggleClass("overflow-hidden");
    });
    
    $(".anchor").on("click", function() {
        var $resultChecking = $("#page-header__icon").hasClass("fa-times");
        if ($resultChecking) {
            $(".page-header__nav").removeClass("popup-nav");
            $("#page-header__icon").toggleClass("fa-times fa-bars");
            $("body").removeClass("overflow-hidden");
        }
    });
    
    $(window).resize(function() {
        var $windowWidth = $(window).width();
        
        if ($windowWidth > 767) {
            $(".page-header__nav").removeClass("popup-nav");
            $("#page-header__icon").removeClass("fa-times").addClass("fa-bars");
            $("body").removeClass("overflow-hidden");
        }
    });
    
    /* анимация для раздела technology на desktop. В массивы помещаем координаты смещения блоков с картинками, функция animationImages сбрасывает значение transform: translate на (0,0), перебирает элементы и устанавливает для них смещение заново через transform: translate. При на ведении курсора на один из блоков с классом technology__mask, определяем на каком именно блоке произошло событие hover и запускаем для него функцию animationImages с нужными координатами из конкретного массива. Так мы приводим в движение блоки с картинками и всплывающий текст. Блок с центральной картинкой остается неподвижен с помощью класса static и не принимает участие в анимации. В каждом из массивов $arr(n) координаты смещения 4 картинок.*/
    
    var $technologyImages = $(".technology__image:not(.static)"),
        $technologyLists = $(".technology__list"),
        $arr1 = [ [-60, 40], [-100, 0], [-80, 30], [-20, 5] ],
        $arr2 = [ [0, -40], [0, 0], [0, 40], [300, 0] ],
        $arr3 = [ [0, 80], [0, 30], [0, 30], [250, 0] ],
        $arr4 = [ [0, 0], [0, 0], [0, 150], [0, 0] ],
        $technologyMasks = $(".technology__mask"),
        groupArr = [$arr1, $arr2, $arr3, $arr4],
        queueNumber = [2, 3, 0, 1],
        coordinatesArr = [ [0, -40], [0, -40], [0, 40], [0, 40] ];
    
    function animationImages(element, arrNumber, list) {
        $(element).css({"transform": "translate(0, 0)"});
        
        for (var j = 0; j < arrNumber.length; j++) {
            $(element).eq(j).css({"transform": "translate(" + arrNumber[j][0] + "px, " + arrNumber[j][1] + "px)"});
        }
        $(list).children().css({"opacity": 0, "transform": "translate(0, 0)"});
    }
    
    $($technologyMasks).hover(function() {
        for (var i = 0, j = 0, k = 0, l = 0; i < groupArr.length, j < queueNumber.length, k < coordinatesArr.length, l < $technologyMasks.length; i++, j++, k++, l++) {
            
            if ($technologyMasks[l] == this) {
                animationImages($technologyImages, groupArr[i], $technologyLists);
                
                $($technologyLists).eq(queueNumber[j]).children().css({"opacity": 1, "transform": "translate(" + coordinatesArr[k][0] + "px, " + coordinatesArr[k][1] + "px)"});
            }
        }
    });
    
    // плагин слайдер для technology на устройства с max-width: 1199px.
    
    $('.slider').slick({
        dots: true,
        arrows: false,
        autoplay: true
    });
    
    // анимация по скролу для раздела technology
    
    var $animImages = $(".technology__scroll img"),
        $indexImg = 1,
        $indexImgMax = $animImages.length;
    
    $(window).scroll(function() {
        var $halfWindowHeight = $(window).height() / 2,
            $blockTechnology = document.getElementById("tech"),
            $blockTechnologyPosition = $blockTechnology.getBoundingClientRect();
        
        if ($blockTechnologyPosition.top < $halfWindowHeight) {
            $indexImg++;
            if ($indexImg > $indexImgMax) {
                $indexImg = $indexImgMax;
            }
            $animImages.css({"display": "none"});
            $animImages.filter(':nth-child('+$indexImg+')').css({"display": "block"});
        } else {
            $indexImg--;
            if ($indexImg < 1) {
                $indexImg = 1;
            }
            $animImages.css({"display": "none"});
            $animImages.filter(':nth-child('+$indexImg+')').css({"display": "block"});
        }
        
    });
    
    // видео в открывающемся блоке
    
    var video = document.getElementById("video"),
        $closeVideo = $("#closeVideo");
    
    function play() {
        video.play();
    }
    
    function pause() {
        video.pause();
    }

    function stop() {
        video.pause();
        video.currentTime = 0;
    }
    
    $("#videoButton").on("click", function(e) {
        e.preventDefault();
        var $currentClass = $(video).hasClass("page-video__pause");
        if ($currentClass) {
            $(video).removeClass("page-video__pause").addClass("page-video__play");
        }
        
        $("#videoBlock").css({"display": "flex"});
        play();
    });
    
    $(video).on("click", function() {
        $(this).toggleClass("page-video__play page-video__pause");
        var $currentClass = $(this).hasClass("page-video__pause");
        if ($currentClass) {
            pause();
        } else {
            play();
        }
    });
    
    $($closeVideo).on("click", function() {
        $("#videoBlock").css({"display": "none"});
        stop();
    });
    
});