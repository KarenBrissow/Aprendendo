var botaoAdd = document.querySelector("#buscar-pacientes");
botaoAdd.addEventListener("click", function () {
    console.log("Buscando pacientes...");
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://api-pacientes.herokuapp.com/pacientes");
    xhr.addEventListener("load", function () {
        var erroAjax = document.querySelector("#erro-ajax");
        if (xhr.status == 200) {
            erroAjax.classList.add("invisivel");
            var resposta = xhr.responseText;
            var pacientes = JSON.parse(resposta);
            var itenstabela = document.querySelectorAll(".paciente");
            var x = 0;
            pacientes.forEach(function (paciente) {
                for (var i = 0; i < itenstabela.length; i++) {
                    var item = itenstabela[i];
                    var pesquisa = item.textContent;
                    if (!paciente.test(pesquisa)) {
                        x = 0
                    } else {
                        x = 1
                    };
                };
                if (x == 0){
                    adicionaPacienteNaTabela(paciente);
                }
            });
        } else {
            console.log(xhr.status);
            console.log(xhr.responseText);
            erroAjax.classList.remove("invisivel");
        };
    });
    xhr.send();
});