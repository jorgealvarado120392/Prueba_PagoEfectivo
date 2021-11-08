function ReglasValidacionCupon() {
    $("#FrmCupon").validate({
        rules: {
            TxtCodcupon: { required: true, exactlength: 5 },
        }
    });
}


function ValidarCupon() {
    $("#Cargando").addClass("on");
    var formData = new FormData(document.getElementById("FrmCupon"));

    $.ajax({
        url: "/Cupon/ValidarCupon",
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
                        $("#TxtCodcupon").val("");
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
                        $("#TxtCodcupon").val("");

                    }
                })
            }
        }
    });
}

$(document).ready(function () {

    ReglasValidacionCupon();

    $("#BtnGuardarCupon").on("click", function () {

        var f = $("#FrmCupon");

        var validado = f.valid();
        if (validado) {
            $("#Cargando").addClass("on");

            ValidarCupon();
        }
    });
});