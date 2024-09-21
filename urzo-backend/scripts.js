let cart = [];

// Adiciona item ao carrinho
function addToCart(itemName, itemPrice) {
    const item = cart.find(cartItem => cartItem.name === itemName);

    if (item) {
        item.quantity++;
    } else {
        cart.push({ name: itemName, price: itemPrice, quantity: 1 });
    }

    console.log(`Item adicionado: ${itemName}. Preço: R$${itemPrice.toFixed(2)}. Quantidade: ${cart.find(cartItem => cartItem.name === itemName).quantity}`);
}

// Mostra o conteúdo do carrinho
function showCart() {
    const cartContentDiv = document.getElementById('cartContent');
    if (cart.length === 0) {
        cartContentDiv.innerHTML = '<p>O carrinho está vazio.</p>';
        return;
    }

    let content = '<ul>';
    cart.forEach(item => {
        content += `<li>${item.name} - R$${item.price.toFixed(2)} x ${item.quantity}</li>`;
    });
    content += '</ul>';
    cartContentDiv.innerHTML = content;
}

// Envia o carrinho para o servidor
function sendCart() {
    if (cart.length === 0) {
        alert('O carrinho está vazio.');
        return;
    }

    fetch('/api/sendCart', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(cart),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Sucesso:', data);
        alert('Carrinho enviado com sucesso!');
        cart = []; // Limpa o carrinho após o envio
        showCart(); // Atualiza a visualização do carrinho
    })
    .catch((error) => {
        console.error('Erro:', error);
        alert('Falha ao enviar o carrinho.');
    });
}