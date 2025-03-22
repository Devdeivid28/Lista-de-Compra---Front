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

                //Selecionando a DIV List onde fica os item
                const list = document.querySelector(".list")

                //Parte 01 do item
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

                const imgCateg = document.createElement("img")
                imgCateg.classList.add("categ")
                imgCateg.src = VerificarCategoria(produto.categoria)

                description.appendChild(imgCateg)
                description.appendChild(wrapper)

                //Parte 2 do Item
                const detail = document.createElement("div")
                detail.classList.add("detail")
                detail.appendChild(criarButton(produto.id))
        
                newItem.appendChild(description)
                newItem.appendChild(detail)
        
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
    img.classList.add("lixo")
    img.src = "LixoC.png"
    button.appendChild(img)

    button.addEventListener("click", async() => {

        await api.deletar(id)

        carregarPagina()
    })
    return button;
}

function VerificarCategoria(categoria){
    if (categoria == "Bebida")
        return "/IMG Categorias/Bebida.png"
    else if (categoria == "Fruta")
        return "/IMG Categorias/Fruta.png"
    else if (categoria == "Padaria")
        return "/IMG Categorias/Padaria.png"
    else if (categoria == "Carne")
        return "/IMG Categorias/Carne.png"
    else if (categoria == "Legume")
        return "/IMG Categorias/Legume.png"

}

carregarPagina()

