class Post{
    constructor(baseUrl){
        this.baseUrl = baseUrl;
    }

    get(endpoint){
        return fetch(this.baseUrl + endpoint)
                    .then(response => response.json());
    }

    put(endpoint, body){
        return this._send("PUT", endpoint, body);
    }

    post(endpoint, body){
        return this._send("POST", endpoint, body);
    }

    delete(endpoint, body){
        return this._send("DELETE", endpoint, body);
    }


    _send(method, endpoint, body){
        return fetch(this.baseUrl + endpoint, {
            method,
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify(body)
        })
            .then(responde  => responde.json());
    }
}

const API = new Post("https://jsonplaceholder.typicode.com/");
const form = document.querySelector("#form-area");
const titulo = document.querySelector("#titulo");
const texto = document.querySelector("#post-body");

const tituloRender = document.querySelector("#reenderizador-titulo");
const textoRender = document.querySelector("#reenderizador-post");



form.addEventListener("submit", event => {
    event.preventDefault();

    const dados = {
        title: titulo.value,
        body: texto.value, 
        userId:1
    }

    API.post("posts", dados)
        .then(data => {
            tituloRender.innerHTML = data.title;
            textoRender.innerHTML = data.body;

            titulo.value = "";
            texto.value = "";
        })
        .catch(error => {
            console.error("Error posting data:", error);
            // Handle the error, e.g., display an error message to the user.
            tituloRender.innerHTML = "Error posting data. Please try again.";
            textoRender.innerHTML = "";

        });

});

