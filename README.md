# Florá

Loja online de plantas para casa e jardim.

## Sobre

E-commerce funcional feito com HTML, CSS e JavaScript puro, sem frameworks e sem dependências externas. O catálogo fica em um array de objetos no JavaScript e toda a interface é renderizada dinamicamente a partir dele.

## Funcionalidades

- Catálogo com 12 plantas renderizado dinamicamente
- Busca por nome
- Filtro de preço máximo, com o valor máximo calculado a partir do array
- Filtro por tamanho da flor e por categoria
- Ordenação por relevância, menor preço ou maior preço
- Escolha de cor em cada produto, que repinta a ilustração
- Carrinho com controle de quantidade, subtotal por item e total geral
- Checkout simulado com confirmação
- Layout responsivo para desktop, tablet e celular

## Tecnologias

- HTML
- CSS (Flexbox)
- JavaScript
- Git e GitHub
- Vercel

## Estrutura

```
flora/
  index.html    estrutura da página
  style.css     estilos, layout e responsividade
  script.js     dados dos produtos, renderização e carrinho
  README.md
```

## Layout

O projeto utiliza CSS Flexbox para organizar e alinhar os elementos da página. Ele é aplicado na estrutura do catálogo, na disposição dos produtos, nos elementos internos dos cards, no formulário de filtros, nos itens do carrinho e no rodapé, garantindo uma organização flexível e responsiva.

A responsividade usa três breakpoints:

- até 1050px: catálogo em duas colunas
- até 700px: filtros acima do catálogo e catálogo em coluna única
- até 450px: ajustes de espaçamento e largura do carrinho

## Como executar localmente

```
git clone https://github.com/coelhokauap/flora.git
cd flora
```

Abra o arquivo `index.html` no navegador. Não é necessário instalar nada.

## Equipe

| Integrante | Responsabilidade |
| --- | --- |
| Kauã Coelho Pacheco | Estrutura do HTML, estilos, layout e responsividade |
| Vitória Kereski da Rosa | JavaScript: array de produtos, renderização, filtros e carrinho |
| Anita Palhares | Repositório, publicação no Vercel e documentação |

## Versionamento

Cada integrante trabalhou em sua própria branch (`feat/kauã`, `feat/vic`, `feat/anita`). As alterações foram integradas à `main` por Pull Request, com revisão antes do merge. A `main` contém a versão final, estável e publicada.
