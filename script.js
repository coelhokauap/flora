const produtos = [
  // ---- Flores ----
  {
    id: 1,
    nome: "Rosa",
    cor: "vermelha",
    preco: 20.0,
    categoria: "flores",
  },
  {
    id: 2,
    nome: "Lírio",
    cor: "branca",
    preco: 22.0,
    categoria: "flores",
  },
  {
    id: 3,
    nome: "Camélia",
    cor: "rosa",
    preco: 18.5,
    categoria: "flores",
  },
  {
    id: 4,
    nome: "Copo de leite",
    cor: "branca",
    preco: 25.0,
    categoria: "flores",
  },
  {
    id: 5,
    nome: "Onze-horas",
    cor: "variada",
    preco: 15.0,
    categoria: "flores",
  },

  // ---- Árvores com flores ----
  {
    id: 6,
    nome: "Ipê",
    cor: "amarela",
    preco: 120.0,
    categoria: "arvores com flores",
  },
  {
    id: 7,
    nome: "Dama da noite",
    cor: "branca",
    preco: 95.0,
    categoria: "arvores com flores",
  },
  {
    id: 8,
    nome: "Buganvília",
    cor: "magenta",
    preco: 80.0,
    categoria: "arvores com flores",
  },
  {
    id: 9,
    nome: "Hibisco",
    cor: "vermelha",
    preco: 60.0,
    categoria: "arvores com flores",
  },
  {
    id: 10,
    nome: "Flamboyant",
    cor: "laranja",
    preco: 150.0,
    categoria: "arvores com flores",
  },

  // ---- Árvores sem flores ----
  {
    id: 11,
    nome: "Araucária",
    cor: "verde",
    preco: 200.0,
    categoria: "arvores sem flores",
  },
  {
    id: 12,
    nome: "Pinheiro",
    cor: "verde",
    preco: 180.0,
    categoria: "arvores sem flores",
  },
  {
    id: 13,
    nome: "Cedro",
    cor: "verde",
    preco: 220.0,
    categoria: "arvores sem flores",
  },
  {
    id: 14,
    nome: "Jequitibá",
    cor: "verde",
    preco: 250.0,
    categoria: "arvores sem flores",
  },
  {
    id: 15,
    nome: "Ficus",
    cor: "verde",
    preco: 90.0,
    categoria: "arvores sem flores",
  },
];

const listaProdutos = document.querySelector("#lista-produtos");
const carrinhoAba = document.querySelector("#carrinho-aba");
const listaCarrinho = document.querySelector("#lista-carrinho");
const totalCarrinho = document.querySelector("#total-carrinho");
const carrinho = [];

function formatarPreco(valor) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function atualizarCarrinho() {
  listaCarrinho.innerHTML = "";

  carrinho.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.nome} x ${item.quantidade}`;
    listaCarrinho.appendChild(li);
  });

  const total = carrinho.reduce((soma, item) => {
    return soma + item.preco * item.quantidade;
  }, 0);

  totalCarrinho.textContent = formatarPreco(total);
  carrinhoAba.classList.toggle("aberto", carrinho.length > 0);
}

function adicionarAoCarrinho(produto) {
  const itemExistente = carrinho.find((item) => item.id === produto.id);

  if (itemExistente) {
    itemExistente.quantidade += 1;
  } else {
    carrinho.push({
      ...produto,
      quantidade: 1,
    });
  }

  atualizarCarrinho();
}

function renderizarProdutos() {
  listaProdutos.innerHTML = "";

  produtos.forEach((produto) => {
    const itemProduto = document.createElement("li");
    itemProduto.className = "produto";

    const nome = document.createElement("h3");
    nome.textContent = produto.nome;

    const detalhes = document.createElement("p");
    detalhes.textContent = `${produto.categoria} - ${produto.cor}`;

    const preco = document.createElement("p");
    preco.innerHTML = `<strong>${formatarPreco(produto.preco)}</strong>`;

    const botao = document.createElement("button");
    botao.className = "button button-primary";
    botao.type = "button";
    botao.textContent = "Adicionar";
    botao.addEventListener("click", () => adicionarAoCarrinho(produto));

    itemProduto.append(nome, detalhes, preco, botao);
    listaProdutos.appendChild(itemProduto);
  });
}

renderizarProdutos();
