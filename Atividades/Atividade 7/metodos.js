const url = 'https://8klio9atoh.execute-api.us-west-2.amazonaws.com/default/Contatos';

function cadastraContato() {
    const email = document.cadastro.email.value;
    const name = document.cadastro.nome.value;
    const info = {
        email: email,
        name: name
    };
    const json =  JSON.stringify(info);
    console.log("PUT: " + json);

    axios.put(url, json);
}

function buscaContato() {
    const nome = document.busca.nome.value;
    let resultados = [];

    axios.get(url).then(response => {
        let json = response.data;
        json.contatos.forEach(item => {
            if (item.email.includes(nome) || item.name.includes(nome))
                resultados.push("Email: " + item.email + " nome: " + item.name);
        });

        document.getElementById("resultados").innerText = resultados.join('\n');
    }).catch(reason => console.log(reason));
}