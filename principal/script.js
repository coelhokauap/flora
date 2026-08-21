const produtos = [
    // ---- Flores ----
    {
        id: 1,
        nome: 'Rosa',
        cor: 'vermelha',
        preco: 20.00,
        categoria: 'flores'
    },
    {
        id: 2,
        nome: 'Lírio',
        cor: 'branca',
        preco: 22.00,
        categoria: 'flores'
    },
    {
        id: 3,
        nome: 'Camélia',
        cor: 'rosa',
        preco: 18.50,
        categoria: 'flores'
    },
    {
        id: 4,
        nome: 'Copo de leite',
        cor: 'branca',
        preco: 25.00,
        categoria: 'flores'
    },
    {
        id: 5,
        nome: 'Onze-horas',
        cor: 'variada',
        preco: 15.00,
        categoria: 'flores'
    },

    // ---- Árvores com flores ----
    {
        id: 6,
        nome: 'Ipê',
        cor: 'amarela',
        preco: 120.00,
        categoria: 'arvores com flores'
    },
    {
        id: 7,
        nome: 'Dama da noite',
        cor: 'branca',
        preco: 95.00,
        categoria: 'arvores com flores'
    },
    {
        id: 8,
        nome: 'Buganvília',
        cor: 'magenta',
        preco: 80.00,
        categoria: 'arvores com flores'
    },
    {
        id: 9,
        nome: 'Hibisco',
        cor: 'vermelha',
        preco: 60.00,
        categoria: 'arvores com flores'
    },
    {
        id: 10,
        nome: 'Flamboyant',
        cor: 'laranja',
        preco: 150.00,
        categoria: 'arvores com flores'
    },

    // ---- Árvores sem flores ----
    {
        id: 11,
        nome: 'Araucária',
        cor: 'verde',
        preco: 200.00,
        categoria: 'arvores sem flores'
    },
    {
        id: 12,
        nome: 'Pinheiro',
        cor: 'verde',
        preco: 180.00,
        categoria: 'arvores sem flores'
    },
    {
        id: 13,
        nome: 'Cedro',
        cor: 'verde',
        preco: 220.00,
        categoria: 'arvores sem flores'
    },
    {
        id: 14,
        nome: 'Jequitibá',
        cor: 'verde',
        preco: 250.00,
        categoria: 'arvores sem flores'
    },
    {
        id: 15,
        nome: 'Ficus',
        cor: 'verde',
        preco: 90.00,
        categoria: 'arvores sem flores'
    }
];

const lista_produtos = document.querySelector("#lista-produtos");
const carrinho_aba = document.querySelector("#carrinho-aba");
const lista_carrinho = document.querySelector("#lista-carrinho");
const total_carrinho = document.querySelector("#total-carrinho");
const carrinho = [];

function formatar_preco(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    });
}

function atualizar_carrinho() {
    lista_carrinho.innerHTML = "";

    if (carrinho.length === 0) {
        carrinho_aba.classList.remove("aberto");
        return;
    }

    carrinho.forEach((item) => {
        const li = document.createElement("li");
        li.style.display = "flex";
        li.style.justifyContent = "space-between";
        li.style.alignItems = "center";
        li.style.marginBottom = "8px";

        const info = document.createElement("span");
        info.textContent = `${item.nome} (${formatar_preco(item.preco)})`;

        const controles = document.createElement("div");
        controles.style.display = "flex";
        controles.style.gap = "6px";
        controles.style.alignItems.center;

        const btnMenos = document.createElement("button");
        btnMenos.textContent = "-";
        btnMenos.className = "button";
        btnMenos.style.margin = "0";
        btnMenos.style.padding = "2px 8px";
        // Passa o id específico do item para garantir isolamento
        btnMenos.addEventListener("click", () => alterar_quantidade(item.id, -1));

        const qtd = document.createElement("span");
        qtd.textContent = item.quantidade;
        qtd.style.fontWeight = "bold";

        const btnMais = document.createElement("button");
        btnMais.textContent = "+";
        btnMais.className = "button";
        btnMais.style.margin = "0";
        btnMais.style.padding = "2px 8px";
        // Passa o id específico do item para garantir isolamento
        btnMais.addEventListener("click", () => alterar_quantidade(item.id, 1));

        controles.append(btnMenos, qtd, btnMais);
        li.append(info, controles);
        lista_carrinho.appendChild(li);
    });

    const total = carrinho.reduce(
        (soma, item) => soma + item.preco * item.quantidade,
        0,
    );

    total_carrinho.textContent = formatar_preco(total);
    carrinho_aba.classList.add("aberto");
}

function adicionar_ao_carrinho(produto) {
    const item_existente = carrinho.find((item) => item.id === produto.id);

    if (item_existente) {
        item_existente.quantidade += 1;
    } else {
        carrinho.push({
            ...produto,
            quantidade: 1,
        });
    }

    atualizar_carrinho();
}

function alterar_quantidade(id, delta) {
    // Busca estritamente o item correspondente pelo ID unico
    const item = carrinho.find((i) => i.id === id);
    if (!item) return;

    // Atualiza apenas a quantidade deste item específico
    item.quantidade += delta;

    // Se a quantidade for menor que 1, removemos o item do carrinho
    if (item.quantidade < 1) {
        carrinho = carrinho.filter((i) => i.id !== id);
    }

    atualizar_carrinho();
}

function renderizar_produtos() {
    lista_produtos.innerHTML = "";

    produtos.forEach((produto) => {
        const item_produto = document.createElement("li");
        item_produto.className = "produto";

        const imagem = document.createElement("img");
        imagem.src = produto.imagem;
        imagem.alt = produto.nome;
        imagem.loading = "lazy";

        const nome = document.createElement("h3");
        nome.textContent = produto.nome;

        const detalhes = document.createElement("p");
        detalhes.textContent = `${produto.categoria} - ${produto.cor}`;

        const preco = document.createElement("p");
        preco.innerHTML = `<strong>${formatar_preco(produto.preco)}</strong>`;

        const botao = document.createElement("button");
        botao.className = "button button-primary";
        botao.type = "button";
        botao.textContent = "Adicionar";
        botao.addEventListener("click", () => adicionar_ao_carrinho(produto));

        item_produto.append(imagem, nome, detalhes, preco, botao);
        lista_produtos.appendChild(item_produto);
    });
}

renderizar_produtos();