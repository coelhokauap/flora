const carrinho = [];

const listaProdutos = document.querySelector("#lista-produtos");
const listaCarrinho = document.querySelector("#lista-carrinho");
const totalCarrinho = document.querySelector("#total-carrinho");

function formatarPreco(valor) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function renderizarProdutos() {
  listaProdutos.innerHTML = "";

  produtos.forEach((produto) => {
    const artigo = document.createElement("article");
    artigo.classList.add("glass");

    artigo.innerHTML = `
            <img src="${produto.imagem}" alt="${produto.nome}" width="220" />
            <h3>${produto.nome}</h3>
            <p>${formatarPreco(produto.preco)}</p>
            <button class="button button-primary" type="button" data-id="${produto.id}">
              Adicionar ao carrinho
            </button>
          `;

    listaProdutos.appendChild(artigo);
  });
}

function renderizarCarrinho() {
  listaCarrinho.innerHTML = "";

  carrinho.forEach((produto) => {
    const item = document.createElement("li");
    item.textContent = `${produto.nome} - ${formatarPreco(produto.preco)}`;
    listaCarrinho.appendChild(item);
  });

  const total = carrinho.reduce((soma, produto) => soma + produto.preco, 0);
  totalCarrinho.textContent = formatarPreco(total);
}

function adicionarAoCarrinho(idProduto) {
  const produtoEncontrado = produtos.find(
    (produto) => produto.id === idProduto,
  );

  if (produtoEncontrado) {
    carrinho.push(produtoEncontrado);
    renderizarCarrinho();
  }
}

listaProdutos.addEventListener("click", (evento) => {
  if (evento.target.tagName === "BUTTON") {
    adicionarAoCarrinho(Number(evento.target.dataset.id));
  }
});

renderizarProdutos();
renderizarCarrinho();
