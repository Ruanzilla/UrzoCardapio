let cart = [];

// Função para adicionar itens ao carrinho
function addToCart(name, price) {
    const item = cart.find(item => item.name === name);
    if (item) {
        item.quantity += 1;
    } else {
        cart.push({ name, price, quantity: 1 });
    }
    updateCartCount();
}

// Atualiza o contador do carrinho
function updateCartCount() {
    const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
    document.getElementById('cart-count').innerText = cartCount;
}

// Função para exibir o carrinho
function showCart() {
    alert('Carrinho: \n' + cart.map(item => `${item.name} - R$${item.price.toFixed(2)} x ${item.quantity}`).join('\n'));
}

// Adiciona um evento de clique no ícone do carrinho
document.querySelector('.cart-icon').addEventListener('click', showCart);

// Atualiza a contagem inicial do carrinho
updateCartCount();