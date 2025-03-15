import ApiConetion from "./api.js"

const api = new ApiConetion()

const btnCadastrar = document.querySelector("#btAdd")

btnCadastrar.addEventListener("click", async () => {
    const inputItem = document.querySelector("#input-Item")
    const inputQtd = document.querySelector("#input-Qtd")
    const inputCategoria = document.querySelector("#input-Category")
    const list = document.querySelector(".list")

    const item = inputItem.value
    const quantidade = inputQtd.value
    const categoria = inputCategoria.value

    if (item !== "" && quantidade !== "" && categoria !== "") {
        const produto = {
            item,
            quantidade,
            categoria
        }

        console.log(produto)
        await api.cadastra(produto)

        carregarPagina()

        // Limpando os inputs
        inputItem.value = ""
        inputQtd.value = ""
        inputCategoria.value = ""

    } else {
        alert("Preencha todos os campos!!")
    }
});

async function carregarPagina(){

    limpar()

    const dados = await api.listar()
    
    dados.forEach(produto => {

                const list = document.querySelector(".list")
                const newItem = document.createElement("div")
                newItem.classList.add("item")
        
                const description = document.createElement("div")
                description.classList.add("description")
        
                const wrapper = document.createElement("div")
                wrapper.classList.add("wrapper")
                const p = document.createElement("p")
                p.textContent = produto.itens
                const span = document.createElement("span")
                span.textContent = produto.quantidade
        
                wrapper.appendChild(p)
                wrapper.appendChild(span)
        
                //description.appendChild(button);
                description.appendChild(criarButton(produto.id))
                description.appendChild(wrapper)
        
                newItem.appendChild(description)
        
                // Adicionando o novo item à lista
                list.appendChild(newItem)

    });

}

function limpar() {
    const lista = document.querySelector(".list");
    lista.innerHTML = "";
}

function criarButton(id){
    
    const button = document.createElement("button")
    button.classList.add("lixeiro")
    const img = document.createElement("img")
    img.src = "Lixeiro.png"
    button.appendChild(img)

    button.addEventListener("click", async() => {

        await api.deletar(id)

        carregarPagina()
    })
    return button;
}

carregarPagina()

