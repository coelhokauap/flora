const produtos = [
  // ---- Flores ----
    {
        id: 1,
        nome: "Rosa",
        cor: "vermelha",
        preco: 20.0,
        categoria: "flores",
        imagem: "https://loremflickr.com/500/380/red-rose,flower?lock=101",
    },
    {
        id: 2,
        nome: "Lírio",
        cor: "branca",
        preco: 22.0,
        categoria: "flores",
        imagem: "https://loremflickr.com/500/380/white-lily,flower?lock=102",
    },
    {
        id: 3,
        nome: "Camélia",
        cor: "rosa",
        preco: 18.5,
        categoria: "flores",
        imagem: "https://loremflickr.com/500/380/camellia,flower?lock=103",
    },
    {
        id: 4,
        nome: "Copo de leite",
        cor: "branca",
        preco: 25.0,
        categoria: "flores",
        imagem: "https://loremflickr.com/500/380/calla-lily,flower?lock=104",
    },
    {
        id: 5,
        nome: "Onze-horas",
        cor: "variada",
        preco: 15.0,
        categoria: "flores",
        imagem: "https://loremflickr.com/500/380/portulaca,flower?lock=105",
    },

    // ---- Árvores com flores ----
    {
        id: 6,
        nome: "Ipê",
        cor: "amarela",
        preco: 120.0,
        categoria: "arvores com flores",
        imagem: "https://loremflickr.com/500/380/ipe-tree,yellow-flowers?lock=106",
    },
    {
        id: 7,
        nome: "Dama da noite",
        cor: "branca",
        preco: 95.0,
        categoria: "arvores com flores",
        imagem:
        "https://loremflickr.com/500/380/night-blooming-jasmine,flower?lock=107",
    },
    {
        id: 8,
        nome: "Buganvília",
        cor: "magenta",
        preco: 80.0,
        categoria: "arvores com flores",
        imagem: "https://loremflickr.com/500/380/bougainvillea,flower?lock=108",
    },
    {
        id: 9,
        nome: "Hibisco",
        cor: "vermelha",
        preco: 60.0,
        categoria: "arvores com flores",
        imagem: "https://loremflickr.com/500/380/red-hibiscus,flower?lock=109",
    },
    {
        id: 10,
        nome: "Flamboyant",
        cor: "laranja",
        preco: 150.0,
        categoria: "arvores com flores",
        imagem:
        "https://loremflickr.com/500/380/flamboyant-tree,orange-flowers?lock=110",
    },

    // ---- Árvores sem flores ----
    {
        id: 11,
        nome: "Araucária",
        cor: "verde",
        preco: 200.0,
        categoria: "arvores sem flores",
        imagem: "https://loremflickr.com/500/380/araucaria,tree?lock=111",
    },
    {
        id: 12,
        nome: "Pinheiro",
        cor: "verde",
        preco: 180.0,
        categoria: "arvores sem flores",
        imagem: "https://loremflickr.com/500/380/pine-tree?lock=112",
    },
    {
        id: 13,
        nome: "Cedro",
        cor: "verde",
        preco: 220.0,
        categoria: "arvores sem flores",
        imagem: "https://loremflickr.com/500/380/cedar-tree?lock=113",
    },
    {
        id: 14,
        nome: "Jequitibá",
        cor: "verde",
        preco: 250.0,
        categoria: "arvores sem flores",
        imagem: "https://loremflickr.com/500/380/brazilian-tree,forest?lock=114",
    },
    {
        id: 15,
        nome: "Ficus",
        cor: "verde",
        preco: 90.0,
        categoria: "arvores sem flores",
        imagem: "https://loremflickr.com/500/380/ficus,plant?lock=115",
    },
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

  carrinho.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.nome} x ${item.quantidade}`;
    lista_carrinho.appendChild(li);
  });

  const total = carrinho.reduce(
    (soma, item) => soma + item.preco * item.quantidade,
    0,
  );

  total_carrinho.textContent = formatar_preco(total);
  carrinho_aba.classList.toggle("aberto", carrinho.length > 0);
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
