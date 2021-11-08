$.extend($.validator, {

    messages: {
        required: "Este campo es requerido.",
        remote: "Este campo es repetido.",
        email: "Ingrese un formato email.",
        url: "Ingrese un formato URL.",
        date: "Ingrese un formato de fecha.",
        dateISO: "Ingrese una fecha (ISO).",
        number: "Ingrese solo números.",
        digits: "Ingrese solo dígitos.",
        equalTo: "Ingrese el valor igual.",
        maxlength: $.validator.format("Ingrese mayor o igual que {0} carácteres."),
        minlength: $.validator.format("Ingrese menor o igual que {0} carácteres."),
        rangelength: $.validator.format("Ingrese entre {0} y {1} caracteres."),
        range: $.validator.format("Ingrese entre {0} y {1}."),
        max: $.validator.format("Ingrese un valor máximo o igual que {0} caractéres ."),
        min: $.validator.format("Ingrese un valor menor o igual que {0}."),
        step: $.validator.format("Ingrese un múltiplo de {0}.")
    }

})

var Lista_Contenido = [];

function OrdernarListaNombre(a, b) {
    var Ordenamiento = $("#Ordenar")[0].dataset.orden;

    var NombrePrimero = a.Nombre;

    var NombreSegundo = b.Nombre;

    if (Ordenamiento == 1) {
        if (NombrePrimero > NombreSegundo) {
            return -1;
        }
        if (NombrePrimero < NombreSegundo) {
            return 1;
        }

        return 0;
    }
    else if (Ordenamiento == 0) {
        if (NombrePrimero < NombreSegundo) {
            return -1;
        }
        if (NombrePrimero > NombreSegundo) {
            return 1;
        }

        return 0;
    }
}

function Busquedatabs(BusquedaNombre) {

    var cantidad = Lista_Contenido.length;

    for (var i = 0; i < cantidad; i++) {
        Lista_Contenido[i].ListaTab = true;

        if (Lista_Contenido[i].NombreTab != BusquedaNombre && BusquedaNombre != "Todo") {
            Lista_Contenido[i].ListaTab = false;
        }
    }

    DibujarListaPrincipal();
}

function BusquedaxNombre(BusquedaNombre) {

    BusquedaNombre = BusquedaNombre.trim().toLowerCase();

    var cantidad = Lista_Contenido.length;

    var ArrayBusqueda = BusquedaNombre.split(" ");

    var Cantidad_Busqueda = ArrayBusqueda.length;

    for (var i = 0; i < cantidad; i++) {

        if (!(BusquedaNombre)) {
            Lista_Contenido[i].ListaBusqueda = true;
        }
        else {
            Lista_Contenido[i].ListaBusqueda = false;

            var nombre_busqueda = Lista_Contenido[i].NombreBusqueda.toLowerCase().replace(/á/gi, "a").replace(/é/gi, "e").replace(/í/gi, "i").replace(/ó/gi, "o").replace(/ú/gi, "u");

            var result = true;

            for (var j = 0; j < Cantidad_Busqueda; j++) {

                result = nombre_busqueda.match(ArrayBusqueda[j]);

                if (!result) {
                    j = Cantidad_Busqueda;
                }
                else {
                    nombre_busqueda.replace(ArrayBusqueda[j], "");
                }
            }
            if (result) {
                Lista_Contenido[i].ListaBusqueda = true;
            }
        }
    }

    DibujarListaPrincipal();

}

//Fin de Pendejadas Mías


//--Funcion fast modal (selection)--------------------------------------------------------------
//----------------------------------------------------------------------------


$.fn.selection = function (valor) {
    if (valor == 'on') {
        $("<div class='bgselection'></div>").insertBefore(this);
        $(this).show();

    }

    if (valor == 'off') {
        event.preventDefault();
        window.location.hash = '';
        $('.bgselection').remove();
        $('.selection').hide();

    }
}
$(document).on('click', '.bgselection', function (event) {
    $(this).selection('off');
})

//---FUNCION DEL MODAL (NI A TOQUES :V) --------------------------------------------------------------

$.fn.addClassDelay = function (className, delay) {
    var $addClassDelayElement = $(this), $addClassName = className;
    setTimeout(function () {
        $addClassDelayElement.addClass($addClassName);
    }, delay);
};
$.fn.removeClassDelay = function (className, delay) {
    var $removeClassDelayElement = $(this), $removeClassName = className;
    setTimeout(function () {
        $removeClassDelayElement.removeClass($removeClassName);
    }, delay);
};

$.fn.removeDelay = function (delay) {
    var $removeDelayElement = $(this);
    $removeDelayElement.fadeTo('fast', 0)
    setTimeout(function () {
        $removeDelayElement.remove();
    }, delay);
};


$(document).ready(function () {

    jQuery.validator.addMethod("exactlength", function (value, element, param) {
        return this.optional(element) || value.length == param;
    }, $.validator.format("Por favor, ingrese solo {0} carácteres."));

    $.validator.addMethod("valueNotEquals", function (value, element, arg) {
        return arg != value;
    }, "Este valor no es permitido");

    $.validator.addMethod('menosque', function (value, element, param) {
        if (this.optional(element)) return true;
        var i = parseInt(value);
        var j = parseInt($(param).val());
        return i <= j;
    }, "El valor del precio mínimo debe ser menor al real");

    $.validator.addMethod('masque', function (value, element, param) {
        if (this.optional(element)) return true;
        var i = parseInt(value);
        var j = parseInt($(param).val());
        return i >= j;
    }, "El valor del precio debe ser mayor al mínimo");

   
    $(document).on("click", ".MenusHijos", function (e) {

        e.preventDefault();

        urlmenuhijo = $(this)[0].href;

        $("#Cargando").addClass("on");

        location.href = urlmenuhijo;
    });

    
    $("#Ordenar").on("click", function () {
        Lista_Contenido.sort(OrdernarListaNombre);

        var orden = $(this)[0].dataset.orden;

        if (orden == "0") {
            $(this)[0].dataset.orden = "1";
        }
        else {
            $(this)[0].dataset.orden = "0";
        }

        DibujarListaPrincipal();
    });

    $(".tabestado").on("click", function () {

        $("#HistorialUsuario").removeClass("viendo");

        $("#ListaUsuario").addClass("viendo");

        $(".tabestado").removeClass("on");

        $(".tabhistorial").removeClass("on");

        $(this).addClass("on");

        var Nombre_BusquedaTab = $(this)[0].dataset.nametab;

        Busquedatabs(Nombre_BusquedaTab);

    });

    $("#TxtTextoBusqueda").keyup(function (e) {

        //var code = e.keyCode || e.which;

        var NombreBusqueda = $(this).val();

        //if (code == 13) {
        BusquedaxNombre(NombreBusqueda);
        //}
    });

    $("#VerMasOpciones").on("click", function () {

        $('<div class="opcionesbg"></div>').insertBefore("#ListaOpciones");

        $("#ListaOpciones").addClass('on');

    });

    $(document).on("click", ".opcionesbg", function () {

        $(this).remove();

        $('#ListaOpciones').removeClass('on');

    });

    //Ordenar

    $.fn.modalcoco = function (valor) {
        if (valor == 'open') {

            $("<div class='backdropBG'></div>").insertBefore(this);
            //$(this).append("<i class='closecoco'>x</i>");
            $(".backdropBG").addClassDelay('showing', 1);
            $("body").addClass('cocomodal-active');
            $(this).addClassDelay('showing', 100);

        }

        if (valor == 'close') {
            event.preventDefault();
            window.location.hash = '';
            $('.backdropBG').removeClass("showing");
            $('.cocomodal').removeClass("showing");
            $("body").removeClass('cocomodal-active');
            function chaumodal() {
                $('.backdropBG').remove();
                //$('.closecoco').remove();


            }
            setTimeout(chaumodal, 701);
        }
    }

    //Modal pequeño sobre modal========================================
    //=================================================================
    $.fn.modalcard = function (valor) {
        if (valor == 'open') {

            $("<div class='card-bg'></div>").insertBefore(this);
            $('.cocomodal').addClass('cardmodal-active');
            $(this).append("<i class='close-card'></i>");
            $(this).addClassDelay('ready', 210);

        }

        if (valor == 'close') {
            event.preventDefault();
            window.location.hash = '';
            $('.plato-card').removeClass('ready');
            $('.cocomodal').removeClass('cardmodal-active');
            function fueplato() {
                $('.card-bg').remove();
            }
            setTimeout(fueplato, 201);

        }
    }

    $(document).on('click', '.backdropBG , .closecoco', function (event) {
        $(this).modalcoco('close');
        $("#TxtTextoBusqueda").val("").focus().trigger("keyup");
    });

    $(document).on('click', '.card-bg , .close-card', function (event) {
        $(this).modalcard('close');
        $("#TxtTextoBusqueda").val("").focus().trigger("keyup");
        $('.precheckout').slideUp();
    });

    //---MosTRAR OCULTAR MENU Principal --------------------------------------------------------------

    $(document).on('click', '#vermenuprincipal', function (event) {
        $('nav').toggleClass('viendo');
    });
    $(document).on('click', '#cerrarmenu', function (event) {
        $('nav').removeClass('viendo');
        $('nav').removeClass('on');
    });

    $(document).on('click', '#listamenu div', function (event) {
        $('nav').addClass('on');
        $('.listamenu div').removeClass('on');
        $(this).addClass('on');
    });

    $("#Busqueda").on("click", function () {

        $('#ContenedorBusqueda').addClass('on');

        $('#TxtTextoBusqueda').focus();
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

    //goback atras flechita xD=========================================================

    $("#SalirBuscador, #Iratras , .goback").on("click", function () {

        $("#TxtTextoBusqueda").val("");

        BusquedaxNombre("");

        if ($('#ContenedorBusqueda').hasClass('on')) {
            $('.buscador-header').removeClass('on');
            $('.buscador-header').children('input').val('');
            $(this).children('li').removeAttr('style');
        }
        else if ($(this).parent().parent().hasClass('side1')) {
            $(this).parent().parent().side('0')
            $('body').removeClass('hideout')
            $(".sidebg").remove();
        }
        else {
            $(this).parent().parent().side('0')
        }
    });

  
    $(document).ajaxStop(function (e) {

        $("#Cargando").removeClass("on");
    });

});




