//index.js 
// Seleciona todos os botões com o id adcionar
const botoes = document.querySelectorAll('#adcionar');

// Criar ou recuperar o carrinho do localStorage
let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

// Para cada botao, adciona um "ouvinte de clique"
botoes.forEach((botao) => {
    botao.addEventListener('click', (event) => {
        // Pega o card pai do botão ( a caixinha do produto)
        const card = event.target.closest('.card')

        //pega as informaçoes do produto
        const nome = card.querySelector('.card-title').textContent;
        const preco = card.querySelector('.preco').textContent;

        // cria um objeto com o nome e o preco
        const produto = {
            nome: nome,
            preco: preco
        };

        // Adiciona o produto ao carrinho
        carrinho.push(produto);

        // Salva o carrinho no localStorage
        localStorage.setItem('carrinho', JSON.stringify(carrinho));

        // Atualiza o contador de itens no carrinho
        const contador = document.querySelector('#contador');
        contador.textContent = carrinho.length;
        contador.style.display = 'block';
        contador.style.color = 'red'; 
    });
});

// Atualiza o contador de itens no carrinho ao carregar a página    
const contador = document.querySelector('#contador');
contador.textContent = carrinho.length;
contador.style.display = 'block';
contador.style.color = 'red';

// Adiciona um ouvinte de clique ao botão de limpar o carrinho
const limparCarrinho = document.querySelector('#limpar-carrinho');
limparCarrinho.addEventListener('click', () => {
    // Limpa o carrinho
    carrinho = [];
    localStorage.removeItem('carrinho');

    // Atualiza o contador de itens no carrinho
    const contador = document.querySelector('#contador');
    contador.textContent = carrinho.length;
    contador.style.display = 'none';
});


