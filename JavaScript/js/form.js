var botaoAdicionar = document.querySelector("#adicionar-paciente");

botaoAdicionar.addEventListener("click", function (event) {
    event.preventDefault();
    var form = document.querySelector("#form-adiciona");

    var paciente = obtemPacienteDoFormulario(form);
    var erros = validaPaciente(paciente);
    console.log(erros);

    if (erros.length > 0) {
        exibeMensagensErro(erros);
        return;
    }
    adicionaPacienteNaTabela(paciente);
    var ul = document.querySelector("#mensagens-erro");
    ul.innerHTML = "";
    form.reset();
});

function adicionaPacienteNaTabela(paciente) {
    var pacienteTr = montaTr(paciente);
    var tabela = document.querySelector("#tabela-pacientes");
    var itenstabela = document.querySelectorAll(".paciente");
    var x = 0;
    for (var i = 0; i < itenstabela.length; i++) { //compara se tem paciente repetido
        var item = itenstabela[i];
        var pesquisa = item.textContent;
        console.log(pesquisa);
        console.log(pacienteTr);
        console.log(pacienteTr.textContent);
        if (pacienteTr.textContent == pesquisa) {
            x = 1;
            console.log("Paciente já cadastrado");
        };
    };
    if (x == 0){
        tabela.appendChild(pacienteTr);
    }
}

function obtemPacienteDoFormulario(form) {
    var paciente = {
        nome: form.nome.value,
        peso: form.peso.value,
        altura: form.altura.value,
        gordura: form.gordura.value,
        imc: calculaImc(form.peso.value, form.altura.value)
    }
    return paciente;
}

function montaTr(paciente) {
    var pacienteTr = document.createElement("tr");
    pacienteTr.classList.add("paciente");

    pacienteTr.appendChild(montaTd(paciente.nome, "info-nome"));
    pacienteTr.appendChild(montaTd(paciente.peso, "info-peso"));
    pacienteTr.appendChild(montaTd(paciente.altura, "info-altura"));
    pacienteTr.appendChild(montaTd(paciente.gordura, "info-gordura"));
    pacienteTr.appendChild(montaTd(paciente.imc, "info-imc"));

    return pacienteTr;
}

function montaTd(dado, classe) {
    var td = document.createElement("td");
    td.textContent = dado;
    td.classList.add(classe);

    return td;
}

function validaPaciente(paciente) {
    var erros = [];
    if (paciente.nome.length == 0) erros.push("O nome não pode ficar em branco");
    if (paciente.gordura.length == 0) erros.push("A % de gordura não pode ficar em branco");
    if (paciente.peso.length == 0) {
        erros.push("O peso não pode ficar em branco");
    } else if (!validaPeso(paciente.peso)) {
        erros.push("Peso inválido!");
    }
    if (paciente.altura.length == 0) {
        erros.push("A altura não pode ficar em branco");
    } else if (!validaAltura(paciente.altura)) {
        erros.push("Altura inválida!");
    }

    return erros;
}

function exibeMensagensErro(erros) {
    var ul = document.querySelector("#mensagens-erro");
    ul.innerHTML = "";
    erros.forEach(function (erro) {
        var li = document.createElement("li");
        li.textContent = erro;
        ul.appendChild(li);
    });
}