const produtos = [
  {
    nome: "Rosa",
    cores: ["Vermelha", "Rosa", "Branca"],
    preco: 30,
    categoria: "Românticas",
    tamanho: "Médio",
    rega: 2,
    forma: "rosa",
  },
  {
    nome: "Lírio",
    cores: ["Branca", "Amarela", "Rosa"],
    preco: 35,
    categoria: "Elegantes",
    tamanho: "Grande",
    rega: 2,
    forma: "estrela",
  },
  {
    nome: "Girassol",
    cores: ["Amarela", "Laranja"],
    preco: 50,
    categoria: "Alegres",
    tamanho: "Grande",
    rega: 3,
    forma: "girassol",
  },
  {
    nome: "Tulipa",
    cores: ["Rosa", "Vermelha", "Amarela", "Roxa"],
    preco: 25,
    categoria: "Românticas",
    tamanho: "Médio",
    rega: 2,
    forma: "tulipa",
  },
  {
    nome: "Orquídea",
    cores: ["Roxa", "Branca", "Rosa"],
    preco: 50,
    categoria: "Elegantes",
    tamanho: "Grande",
    rega: 2,
    forma: "orquidea",
  },
  {
    nome: "Margarida",
    cores: ["Branca", "Amarela"],
    preco: 15,
    categoria: "Alegres",
    tamanho: "Pequeno",
    rega: 1,
    forma: "margarida",
  },
  {
    nome: "Lavanda",
    cores: ["Roxa", "Lilás"],
    preco: 50,
    categoria: "Aromáticas",
    tamanho: "Médio",
    rega: 1,
    forma: "espiga",
  },
  {
    nome: "Peônia",
    cores: ["Rosa", "Branca", "Vermelha"],
    preco: 70,
    categoria: "Românticas",
    tamanho: "Grande",
    rega: 2,
    forma: "rosa",
  },
  {
    nome: "Hortênsia",
    cores: ["Azul", "Rosa", "Branca"],
    preco: 30,
    categoria: "Elegantes",
    tamanho: "Grande",
    rega: 2,
    forma: "cacho",
  },
  {
    nome: "Cravo",
    cores: ["Vermelha", "Rosa", "Branca"],
    preco: 10,
    categoria: "Românticas",
    tamanho: "Pequeno",
    rega: 1,
    forma: "cravo",
  },
  {
    nome: "Jasmim",
    cores: ["Branca", "Creme"],
    preco: 25,
    categoria: "Aromáticas",
    tamanho: "Médio",
    rega: 2,
    forma: "estrela",
  },
  {
    nome: "Azaleia",
    cores: ["Rosa", "Vermelha", "Roxa"],
    preco: 30,
    categoria: "Alegres",
    tamanho: "Médio",
    rega: 3,
    forma: "orquidea",
  },
];

const cores_hex = {
  Vermelha: "#d94a4a",
  Rosa: "#e889a8",
  Branca: "#ffffff",
  Amarela: "#f4d35e",
  Laranja: "#e8944a",
  Roxa: "#8c68bd",
  Lilás: "#b9a3e3",
  Azul: "#5b9bd5",
  Creme: "#f2e3c2",
};

let carrinho = [];
let categoria = null;
let cores_escolhidas = {};

const lista_produtos = document.querySelector("#lista-produtos");
const lista_carrinho = document.querySelector("#lista-carrinho");
const total_carrinho = document.querySelector("#total-carrinho");
const busca = document.querySelector("#busca");
const preco = document.querySelector("#preco");
const preco_valor = document.querySelector("#preco-valor");
const tamanho = document.querySelector("#tamanho");
const ordenacao = document.querySelector("#ordenacao");
const botoes_categoria = document.querySelectorAll(".filtro");

const preco_maximo = Math.max(...produtos.map((p) => p.preco));

preco.max = preco_maximo;
preco.value = preco_maximo;

function tom(hex, fator) {
  let n = parseInt(hex.slice(1), 16);

  return `rgb(${Math.round(((n >> 16) & 255) * fator)} ${Math.round(
    ((n >> 8) & 255) * fator,
  )} ${Math.round((n & 255) * fator)})`;
}

function anel(quantidade, conteudo) {
  let partes = "";

  for (let i = 0; i < quantidade; i++) {
    partes += conteudo(i, (360 / quantidade) * i);
  }

  return partes;
}

const formas = {
  margarida: function (c) {
    return (
      anel(12, function (i, giro) {
        return `<ellipse cx="250" cy="136" rx="15" ry="57" fill="${c}" stroke="${tom(c, 0.84)}" stroke-width="2" transform="rotate(${giro} 250 196)"/>`;
      }) +
      `<circle cx="250" cy="196" r="28" fill="#f4c95d"/><circle cx="250" cy="196" r="16" fill="#dfa63a"/>`
    );
  },

  girassol: function (c) {
    return (
      anel(18, function (i, giro) {
        return `<ellipse cx="250" cy="124" rx="13" ry="64" fill="${i % 2 ? tom(c, 0.88) : c}" transform="rotate(${giro} 250 196)"/>`;
      }) +
      `<circle cx="250" cy="196" r="46" fill="#7a5230"/><circle cx="250" cy="196" r="34" fill="#5e3d22"/>`
    );
  },

  estrela: function (c) {
    return (
      anel(6, function (i, giro) {
        return `<path d="M250 196 C 226 152 226 108 250 88 C 274 108 274 152 250 196 Z" fill="${c}" stroke="${tom(c, 0.84)}" stroke-width="2" transform="rotate(${giro} 250 196)"/>`;
      }) + `<circle cx="250" cy="196" r="18" fill="${tom(c, 0.7)}"/>`
    );
  },

  orquidea: function (c) {
    return (
      anel(5, function (i, giro) {
        return `<ellipse cx="250" cy="146" rx="36" ry="50" fill="${c}" stroke="${tom(c, 0.84)}" stroke-width="2" transform="rotate(${giro} 250 196)"/>`;
      }) +
      `<circle cx="250" cy="196" r="30" fill="${tom(c, 0.75)}"/><circle cx="250" cy="196" r="14" fill="#f4c95d"/>`
    );
  },

  rosa: function (c) {
    return (
      anel(10, function (i, giro) {
        return `<circle cx="250" cy="128" r="26" fill="${c}" transform="rotate(${giro} 250 196)"/>`;
      }) +
      `<circle cx="250" cy="196" r="66" fill="${tom(c, 0.93)}"/>` +
      `<circle cx="250" cy="196" r="48" fill="${tom(c, 0.84)}"/>` +
      `<circle cx="250" cy="196" r="31" fill="${tom(c, 0.75)}"/>` +
      `<circle cx="250" cy="196" r="14" fill="${tom(c, 0.66)}"/>`
    );
  },

  cravo: function (c) {
    return (
      anel(14, function (i, giro) {
        return `<ellipse cx="250" cy="146" rx="14" ry="50" fill="${c}" transform="rotate(${giro} 250 196)"/>`;
      }) +
      anel(12, function (i, giro) {
        return `<ellipse cx="250" cy="168" rx="12" ry="34" fill="${tom(c, 0.86)}" transform="rotate(${giro + 15} 250 196)"/>`;
      }) +
      `<circle cx="250" cy="196" r="14" fill="${tom(c, 0.74)}"/>`
    );
  },

  tulipa: function (c) {
    return (
      `<path d="M250 262 C 208 240 198 176 204 126 C 224 156 240 198 250 262 Z" fill="${tom(c, 0.86)}"/>` +
      `<path d="M250 262 C 292 240 302 176 296 126 C 276 156 260 198 250 262 Z" fill="${tom(c, 0.86)}"/>` +
      `<path d="M250 264 C 228 222 224 168 230 124 C 240 150 260 150 270 124 C 276 168 272 222 250 264 Z" fill="${c}" stroke="${tom(c, 0.78)}" stroke-width="2"/>`
    );
  },

  espiga: function (c) {
    return anel(3, function (i) {
      let x = 250 + (i - 1) * 42;
      let botoes = "";

      for (let j = 0; j < 7; j++) {
        botoes += `<ellipse cx="${x}" cy="${132 + j * 24}" rx="${13 - j * 0.6}" ry="14" fill="${j % 2 ? tom(c, 0.85) : c}"/>`;
      }

      return `<path d="M${x} 300 L ${x} 140" stroke="#5f9c6a" stroke-width="6" stroke-linecap="round"/>${botoes}`;
    });
  },

  cacho: function (c) {
    let pontos = [
      [250, 196],
      [206, 174],
      [294, 174],
      [214, 224],
      [286, 224],
      [250, 138],
      [250, 254],
      [180, 214],
      [320, 214],
    ];

    return pontos
      .map(function (ponto, i) {
        return (
          anel(4, function (j, giro) {
            return `<ellipse cx="${ponto[0]}" cy="${ponto[1] - 17}" rx="12" ry="16" fill="${i % 2 ? tom(c, 0.88) : c}" stroke="${tom(c, 0.8)}" stroke-width="1.5" transform="rotate(${giro} ${ponto[0]} ${ponto[1]})"/>`;
          }) +
          `<circle cx="${ponto[0]}" cy="${ponto[1]}" r="5" fill="#f4c95d"/>`
        );
      })
      .join("");
  },
};

function imagem_flor(produto, nome_cor) {
  let svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500">
    <defs>
      <radialGradient id="fundo" cx="28%" cy="20%" r="92%">
        <stop offset="0" stop-color="#ffffff"/>
        <stop offset="52%" stop-color="#f6efe1"/>
        <stop offset="100%" stop-color="#dcefd4"/>
      </radialGradient>
    </defs>

    <rect width="500" height="500" fill="url(#fundo)"/>
    <circle cx="250" cy="212" r="158" fill="#ffffff" opacity="0.5"/>

    <path d="M250 470 C 243 384 246 300 250 236" stroke="#5f9c6a" stroke-width="9" fill="none" stroke-linecap="round"/>
    <path d="M247 392 C 198 382 172 348 170 312 C 214 314 242 348 247 392 Z" fill="#6ba676"/>
    <path d="M253 352 C 302 342 328 308 330 272 C 286 274 258 308 253 352 Z" fill="#84bd8d"/>

    ${formas[produto.forma](cores_hex[nome_cor])}
  </svg>`;

  return "data:image/svg+xml;utf8," + encodeURIComponent(svg);
}

function formatar_preco(preco) {
  return "R$ " + preco.toFixed(2).replace(".", ",");
}

function render_produtos() {
  let texto = busca.value.toLowerCase();

  let lista = produtos.filter(function (produto) {
    return (
      produto.nome.toLowerCase().includes(texto) &&
      produto.preco <= Number(preco.value) &&
      (tamanho.value === "todos" || produto.tamanho === tamanho.value) &&
      (!categoria || produto.categoria === categoria)
    );
  });

  if (ordenacao.value === "menor-preco") {
    lista.sort(function (a, b) {
      return a.preco - b.preco;
    });
  }

  if (ordenacao.value === "maior-preco") {
    lista.sort(function (a, b) {
      return b.preco - a.preco;
    });
  }

  if (lista.length === 0) {
    lista_produtos.innerHTML = "<li>Nenhum produto encontrado.</li>";
    return;
  }

  lista_produtos.innerHTML = lista
    .map(function (produto) {
      let indice = produtos.indexOf(produto);
      let escolhida = cores_escolhidas[indice] || 0;

      return `
      <li>
        <img src="${imagem_flor(produto, produto.cores[escolhida])}" alt="${produto.nome}">

        <h3>${produto.nome}</h3>

        <p>${produto.tamanho} · ${produto.categoria}</p>
        <p>${produto.cores[escolhida]}</p>

        <div class="cores-produto" role="group" aria-label="Escolha a cor">
          ${produto.cores
            .map(function (nome_cor, i) {
              return `
              <button
                type="button"
                class="cor ${i === escolhida ? "selecionado" : ""}"
                style="background: ${cores_hex[nome_cor]}"
                title="${nome_cor}"
                aria-label="${nome_cor}"
                onclick="escolher_cor(${indice}, ${i})"
              ></button>`;
            })
            .join("")}
        </div>

        <strong>${formatar_preco(produto.preco)}</strong>

        <button
          class="button button-primary"
          onclick="adicionar_carrinho(${indice})"
        >
          Adicionar ao carrinho
        </button>
      </li>
    `;
    })
    .join("");
}

function escolher_cor(indice, posicao) {
  cores_escolhidas[indice] = posicao;
  render_produtos();
}

function adicionar_carrinho(indice) {
  let produto = produtos[indice];
  let cor = produto.cores[cores_escolhidas[indice] || 0];

  let item = carrinho.find(function (item) {
    return item.nome === produto.nome && item.cor === cor;
  });

  if (item) {
    item.quantidade++;
  } else {
    carrinho.push({
      ...produto,
      cor: cor,
      quantidade: 1,
    });
  }

  render_carrinho();
}

function alterar_quantidade(indice, valor) {
  carrinho[indice].quantidade += valor;

  if (carrinho[indice].quantidade <= 0) {
    carrinho.splice(indice, 1);
  }

  render_carrinho();
}

function render_carrinho() {
  let total = 0;

  if (carrinho.length === 0) {
    lista_carrinho.innerHTML = "<li>Seu carrinho está vazio.</li>";

    total_carrinho.textContent = "R$ 0,00";
    return;
  }

  lista_carrinho.innerHTML = carrinho
    .map(function (produto, indice) {
      total += produto.preco * produto.quantidade;

      return `
      <li>
        <div>
          <strong>${produto.nome}</strong>
          <span
            class="etiqueta-cor"
            style="background: ${cores_hex[produto.cor]}"
          ></span>
          <span class="nome-cor">${produto.cor}</span>
          <br>
          ${formatar_preco(produto.preco)} x ${produto.quantidade} =
          <span class="item-total">
            ${formatar_preco(produto.preco * produto.quantidade)}
          </span>
        </div>

        <div class="quantidade">
          <button
            class="quantidade_botao"
            onclick="alterar_quantidade(${indice}, -1)"
          >
            −
          </button>

          <span>${produto.quantidade}</span>

          <button
            class="quantidade_botao"
            onclick="alterar_quantidade(${indice}, 1)"
          >
            +
          </button>
        </div>
      </li>
    `;
    })
    .join("");

  total_carrinho.textContent = formatar_preco(total);
}

botoes_categoria.forEach(function (botao) {
  botao.onclick = function () {
    let nova_categoria = botao.textContent.trim();

    if (categoria === nova_categoria) {
      categoria = null;
      botao.classList.remove("selecionado");
    } else {
      categoria = nova_categoria;

      botoes_categoria.forEach(function (botao) {
        botao.classList.remove("selecionado");
      });

      botao.classList.add("selecionado");
    }

    render_produtos();
  };
});

busca.oninput = render_produtos;

preco.oninput = function () {
  preco_valor.textContent = formatar_preco(Number(preco.value));
  render_produtos();
};

ordenacao.onchange = render_produtos;

tamanho.onchange = render_produtos;

document.querySelector("#filtrar").onclick = render_produtos;

document.querySelector("#limpar").onclick = function () {
  categoria = null;

  busca.value = "";
  preco.value = preco_maximo;
  preco_valor.textContent = formatar_preco(Number(preco.value));
  tamanho.value = "todos";
  ordenacao.value = "relevancia";

  botoes_categoria.forEach(function (botao) {
    botao.classList.remove("selecionado");
  });

  render_produtos();
};

document.querySelector("#finalizar-compra").onclick = function () {
  if (carrinho.length === 0) {
    alert("Seu carrinho está vazio.");
    return;
  }

  alert("Compra finalizada com sucesso!");

  carrinho = [];

  render_carrinho();
};

preco_valor.textContent = formatar_preco(Number(preco.value));

render_produtos();
render_carrinho();
