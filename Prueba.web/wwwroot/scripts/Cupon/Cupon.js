function ReglasValidacionCupon() {
    $("#FrmCupon").validate({
        rules: {
            TxtNombre: { required: true, minlength: 10 },
            TxtEmail: {
                required: true, minlength: 12, maxlength: 100
            },

        }
    });
}

function DibujarListaPrincipal() {
    $("#ListaCupon").empty();

    var html = "";

    for (var i = 0; i < Lista_Contenido.length; i++) {

        var dato = Lista_Contenido[i];

        if (dato.ListaTab && dato.ListaBusqueda) {
            html += ' <div class="item lista ico2 icolarge borderlink Cupon">';

            html += ' <div>';

            html += ' <h4>' + dato.Nombre + '</h4>';

            html += '<label> Email:' + dato.Email + '  </label> <br>';

            html += '<label> Cod_Cupon:' + dato.Codigo + '  </label>';

            html += '</div>';

            html += ' <span class="ico2"> Estado : ' + (dato.Estado) + '</span>';

            html += '</div>';
        }
    }

    $("#ListaCupon").append(html);

}

function ListarListaPrincipal() {

    Lista_Contenido = [];

    $.ajax({
        type: 'Get',
        url: "/Cupon/ListarCupon",
        data: {},
        success: function (data) {

            for (var i = 0; i < data.length; i++) {
                var dato = data[i];

                dato.ListaBusqueda = true;

                dato.NombreBusqueda = dato.Nombre + ' ' + dato.Email;

                dato.ListaTab = true;

                dato.NombreTab = dato.Estado;

                Lista_Contenido.push(dato);
            }
            DibujarListaPrincipal();


        },
        error: function (jqXHR, textStatus, errorThrown) {

        }
    });
}



function Guardar_Cupon() {
    $("#Cargando").addClass("on");
    var formData = new FormData(document.getElementById("FrmCupon"));

    $.ajax({
        url: "/Cupon/GuardarCupon",
        type: "Post",
        dataType: "html",
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        success: function (data) {

            var resultado = JSON.parse(data);
            if (resultado.Exito) {

                swal({
                    title: "Enhorabuena!!!",
                    text: resultado.Mensaje,
                    icon: "success",
                    closeModal: true,
                    closeOnEsc: false


                }).then((Acepto) => {
                    if (Acepto) {
                        $("#Cargando").addClass("on");

                        $('#ModalCupon').cocomodal('close');

                        ListarListaPrincipal();
                    }
                });

            }
            else {
                swal({
                    title: "Upppsssss.....",
                    text: resultado.Mensaje,
                    icon: "error",
                    closeModal: true,
                    closeOnEsc: false


                }).then((Acepto) => {
                    if (Acepto) {
                        $("#Cargando").addClass("on");
                        $('#ModalCupon').cocomodal('close');
                        ListarListaPrincipal();
                    }
                })
            }
        }
    });
}

$(document).ready(function () {

    ListarListaPrincipal();

    ReglasValidacionCupon();

    $("#AgregarNuevoCupon").on("click", function () {

        $("#TxtAccionCupon").text("Nuevo Cupon");

        $("#TxtIDCupon").val("0");

        $("#TxtNombre").val("");

        $("#TxtEmail").val("");

        $("#ModalCupon").cocomodal('open',
            {
                titulo: "Nuevo Cupon",
            });
    });


    $("#BtnGuardarCupon").on("click", function () {

        var f = $("#FrmCupon");

        var validado = f.valid();
        if (validado) {
            $("#Cargando").addClass("on");

            Guardar_Cupon();
        }
    });
});