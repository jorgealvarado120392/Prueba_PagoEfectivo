//----------------------------------------------------//
//---DELAYS --------------------------------------//
//--------------------------------------------------------------//


//-Agregar clase-//

$.fn.addClassDelay = function (className, delay) {
    var $addClassDelayElement = $(this), $addClassName = className;
    setTimeout(function () {
        $addClassDelayElement.addClass($addClassName);
    }, delay);
};
//-Remover clase-//
$.fn.removeClassDelay = function (className, delay) {
    var $removeClassDelayElement = $(this), $removeClassName = className;
    setTimeout(function () {
        $removeClassDelayElement.removeClass($removeClassName);
    }, delay);
};
//-Remover Elemento-//
$.fn.removeDelay = function (delay) {
    var $removeDelayElement = $(this);
    setTimeout(function () {
        $removeDelayElement.remove();
    }, delay);
};
//--------------------------------------------------------------//
//--------------------------------------------------------------//





//--------------------------------------------------------------//
//COCO MODAL--//
//--------------------------------------------------------------//

$.fn.cocomodal = function (valor,
    {
        titulo = "",
        contenido = "",
        success = "",
        successid = "",
        successtype = "button",
        cancel = false,
        crear = false,
        cocoid = "",
        form = false,
        size = "medium",
        bind = false,

    } = {}) {

    if (valor == 'open') {
        //event.preventDefault();
        var TotalModales = $('.cocomodal').length;
        var nuevoIndex = 9990;


        if (crear == true) {

            if (form == true) {
                var divcreado = document.createElement('form');

            } else {

                var divcreado = document.createElement('div');
            }

            document.body.appendChild(divcreado);
            divcreado.id = cocoid;
            var nuevoIndex2 = 9990 + TotalModales;

            divcreado.className = 'cocomodal creaditococo';
            $("<div class='backdropBG'></div>").insertBefore(divcreado);
            if (size == "small") {
                $(divcreado).addClass('mini');
            } else { }

            $(divcreado).prev('.backdropBG').css('z-index', nuevoIndex2);
            $(divcreado).css('z-index', nuevoIndex2);
            $(divcreado).addClassDelay('showing', 100);

            $(divcreado).css('max-height', alto);
            $(divcreado).append("<div class='cocoWrapper'/>");
            $(divcreado).children('.cocoWrapper').css('max-height', scrollheight);
            $(divcreado).children(".cocoWrapper").append('<div class="contenidoCoco">' + contenido + '</div>')

        } else { }


        var h = window.innerHeight;
        var padding = 150;
        var alto = h - padding;
        var scrollheight = alto - 70;
        var scrollheightbtn = alto - 120;
        $("<div class='backdropBG' style='z-index:" + nuevoIndex + "'></div>").insertBefore(this);
        $(this).css('max-height', alto);
        $(this).css('z-index', nuevoIndex);
        $(this).contents().wrapAll("<div class='cocoWrapper'/>");
        $(this).children('.cocoWrapper').css('max-height', scrollheight);
        $(this).children(".cocoWrapper").append('<div class="contenidoCoco">' + contenido + '</div>');

        if (size == "small") {
            $(this).addClass('mini');
        } else { }


        if (titulo == "") {
            $(this).css('padding', '20px 15px 20px');

        } else {
            $(this).append("<h3 class='heading'>" + titulo + "<i></i></h3>");
            $(divcreado).append("<h3 class='heading'>" + titulo + "<i></i></h3>");
        }
        if (bind == true) {
            $(this).prev('.backdropBG').addClass('backdropBG2').removeClass('backdropBG');
            $(this).children('.heading').children("i").remove();
            $(divcreado).prev('.backdropBG').addClass('backdropBG2').removeClass('backdropBG');
            $(divcreado).children('.heading').children("i").remove();
        } else { }
        if (success == "") {

        }
        else {
            $(this).append("<button type='" + successtype + "' id='" + successid + "' class='cocoSuccess createdbtn'>" + success + "</button>");
            $(this).css('padding-bottom', '55px');
            $(this).children('.cocoWrapper').css('max-height', scrollheightbtn);
            $(divcreado).append("<button type='button'id='" + successid + "' class='cocoSuccess createdbtn'>" + success + "</button>");
            $(divcreado).css('padding-bottom', '55px');
            $(divcreado).children('.cocoWrapper').css('max-height', scrollheightbtn);
        }
        if (cancel == true) {
            $(this).append("<button type='' type='button' class='cocoCancel'> Cancelar </button>");
            $(this).css('padding-bottom', '55px');
            $(this).children('.cocoWrapper').css('max-height', scrollheightbtn);
            $(divcreado).append("button type='' type='button' class='cocoCancel'> Cancelar </button>");
            $(divcreado).css('padding-bottom', '55px');
            $(divcreado).children('.cocoWrapper').css('max-height', scrollheightbtn);
            $(this).children('.heading').children("i").remove();
            $(this).prev('.backdropBG').addClass('backdropBG2').removeClass('backdropBG');
        }
        else {

        }

        $(".backdropBG").addClassDelay('showing', 1);
        $(".backdropBG2").addClassDelay('showing', 1);
        $("body").addClass('cocomodal-active');
        $(this).addClassDelay('showing', 100);

    }


    if (valor == 'close') {
        event.preventDefault();
        var elmodalx = $(this).parents('.cocomodal');
        var elmodal = $(this).next('.cocomodal');
        $(this).removeClass("showing");
        $(this).prev('.backdropBG').removeClass("showing");
        elmodalx.prev('.backdropBG').removeClass("showing");
        elmodalx.removeClass("showing");
        elmodal.removeClass("showing");
        $("body").removeClass('cocomodal-active');
        $(this).children('.cocoWrapper').contents().appendTo(this);
        elmodal.children('.cocoWrapper').contents().appendTo(elmodal);
        elmodalx.children('.cocoWrapper').contents().appendTo(elmodalx);
        elmodal.css('max-height', '');
        elmodal.css('padding-bottom', '');
        elmodalx.css('max-height', '');
        elmodalx.css('padding-bottom', '');
        $(this).css('max-height', '');
        $(this).css('padding-bottom', '');
        elmodal.prev('.backdropBG').removeDelay(701);
        elmodalx.prev('.backdropBG').removeDelay(701);
        $(this).prev('.backdropBG').removeDelay(701);
        elmodal.prev('.backdropBG2').removeDelay(701);
        elmodalx.prev('.backdropBG2').removeDelay(701);
        $(this).prev('.backdropBG2').removeDelay(701);
        elmodal.children('.contenidoCoco').removeDelay(701);
        elmodalx.children('.contenidoCoco').removeDelay(701);
        $(this).children('.contenidoCoco').removeDelay(701);
        elmodal.children('.cocoWrapper').removeDelay(701);
        elmodalx.children('.cocoWrapper').removeDelay(701);
        $(this).children('.cocoWrapper').removeDelay(701);
        elmodal.children('.cocomodal .heading').removeDelay(701);
        elmodalx.children('.cocomodal .heading').removeDelay(701);
        $(this).children('.cocomodal .heading').removeDelay(701);
        elmodal.children('.cocomodal .createdbtn').removeDelay(701);
        elmodalx.children('.cocomodal .createdbtn').removeDelay(701);
        $(this).children('.cocomodal .createdbtn').removeDelay(701);
        $('.creaditococo').removeDelay(800);
        setTimeout(resetCSS, 500);
        function resetCSS() {

            elmodal.removeAttr('style');

            elmodalx.removeAttr('style');

            $(this).removeAttr('style');
        }
    }
}

//Modal pequeño sobre modal========================================
//=================================================================
$(document).on('click', '.backdropBG', function (event) {
    $(this).cocomodal('close');
});
$(document).on('click', '.heading i , .cocoCancel', function (event) {
    $(this).cocomodal('close');
});

$(document).on('click', '.card-bg , .close-card', function (event) {
    $(this).cocomodal('close');
    $('.precheckout').slideUp();
});





//SIDES=========================================================
//=========================================================
$.fn.side = function (numero) {
    var contenedor = $(this);
    var papa = contenedor.parent();

    if (numero == 1) {
        contenedor.addClass("on");
        papa.addClass("on");
        $('body').addClass("hideout")
        $('<div class="sidebg"><div class="cerrarsides">x</div></div>').insertBefore(papa);



    }
    else if (numero == 0) {
        papa.removeClass(papa.attr('class').split(/\s+/).pop());
        contenedor.removeClassDelay('on', 500);


    }

    else {
        contenedor.addClass("on");
        contenedor.parent().addClass("side" + numero + "");
    }
};

$(document).on("click", ".cerrarsides", function () {
    $(this).parent().next('.sides').children('.side1').side('0');
    $(this).parent().next('.sides').removeClass('on')
    $('body').removeClass('hideout');
    $(".sidebg").removeDelay(500);
    $(".sides").removeClassDelay("side2", 500);
    $(".sides").removeClassDelay("side3", 500);
    $(".sides").removeClassDelay("side4", 500);
    setTimeout(function () {
        $(".sides > div").scrollTop(0);
    }, 500);
});



//SECTIONGROUP=========================================================
//=========================================================


$(document).on('click', '.secciongroup', function () {

    if ($(this).hasClass("on")) {
        $('.secciongroup').removeClass('on');

        $(".items").slideUp();
    }
    else {
        $('.secciongroup').removeClass('on');

        $(this).toggleClass('on');

        $(".items").slideUp();

        $(this).next('.items').slideToggle();


    }

});



