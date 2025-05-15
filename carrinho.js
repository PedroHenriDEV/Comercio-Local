// carrinho.js

let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

//referencia para onde vamos colocar os produtos
const listacarrinho = document.querySelector('#lista-carrinho');   
//referencia para o total
const totalSpan = document.querySelector('#total');

// atualiza a lista e o total
function atualizarCarrinho() {
    // Limpa a lista atual
    listacarrinho.innerHTML = '';

    // Calcula o total
    let totalValor = 0;

    // Adiciona cada produto ao carrinho
    carrinho.forEach((produto, index) => {
        // Cria um elemento de lista
        const li = document.createElement('li');
        li.textContent = `${produto.nome} - ${produto.preco}`;

        // Cria um botão para remover o produto
        const botaoRemover = document.createElement('button');
        botaoRemover.textContent = 'Remover';

        // Estilo via JS
    botaoRemover.style.backgroundColor = 'red';
    botaoRemover.style.color = 'white';
    botaoRemover.style.border = 'none';
    botaoRemover.style.borderRadius = '5px';
    botaoRemover.style.padding = '5px 25px';
    botaoRemover.style.cursor = 'pointer';
    botaoRemover.style.marginLeft = '10px';

        botaoRemover.addEventListener('click', () => {
            // Remove o produto do carrinho
            carrinho.splice(index, 1);
            localStorage.setItem('carrinho', JSON.stringify(carrinho));
            atualizarCarrinho();
        });

        // Adiciona o botão ao elemento de lista
        li.appendChild(botaoRemover);

        // Adiciona o elemento de lista à lista
        listacarrinho.appendChild(li);

        // Adiciona o preço ao total
        totalValor += parseFloat(produto.preco.replace('R$', '').replace(',', '.'));
    });

    // Atualiza o total
    totalSpan.textContent = `Total: ${totalValor.toFixed(2).replace('.', ',')}`;
    totalSpan.style.color = 'black'; 
    totalSpan.style.fontSize = '20px';
    totalSpan.style.fontWeight = 'bold';
}
// Atualiza o carrinho ao carregar a página
atualizarCarrinho();

// Atualiza o contador de itens no carrinho ao carregar a página    
const contador = document.querySelector('#contador');
contador.textContent = carrinho.length;
contador.style.display = 'block';
contador.style.color = 'red';

//finaliza o compras
document.getElementById('finalizar-compra').addEventListener('click', (e) => {
    e.preventDefault(); //evita que a pagina recarregue


    //pega o carrinho salvo
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    //verifica se o carrinho esta vazio
    if (carrinho.length === 0) {
        alert('Seu carrinho está vazio!');
        return;
    }

    //monta a mensagem com os produtos
    let mensagem = 'Produtos no carrinho:\n\n';

    carrinho.forEach((produto, i) => {
        mensagem += `${i + 1}. ${produto.nome} - ${produto.preco}\n`;
    });
    
    //pega o total (supondo que o total é o último produto)
    let total = carrinho.reduce((acc, produto) => acc + parseFloat(produto.preco.replace('R$', '').replace(',', '.')), 0);

    mensagem += `\nTotal: R$ ${total.toFixed(2).replace('.', ',')}`;
    mensagem += '\n\nObrigado por comprar conosco!';

    //Dados do comprador
    const nome = prompt('Digite seu nome:');
    if (!nome) {
        alert('Nome não pode ser vazio!');
        return;
    }
    mensagem += `\nNome: ${nome}`;

    const endereço = prompt('Digite seu endereço:');
    if (!endereço) {
        alert('Endereço não pode ser vazio!');
        return;
    }
    mensagem += `\nEndereço: ${endereço}`;

    const telefone = prompt('Digite seu telefone:');
    if (!telefone) {
        alert('Telefone não pode ser vazio!');
        return;
    } 
    
    mensagem += `\nTelefone: ${telefone}`;

    //mensagem codificada com dados do comprador
    const numeroWhatsapp = '5531999999999'; // Substitua pelo número de WhatsApp desejado
    const mensagemCodificada = encodeURIComponent(mensagem);
    const url = `https://api.whatsapp.com/send?phone=${numeroWhatsapp}&text=${mensagemCodificada}`;

    // Abre o WhatsApp com a mensagem
    window.open(url, '_blank');
    // Limpa o carrinho
    carrinho = [];
});
