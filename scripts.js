let cart = [];
let totalPrice = 0;

function addToCart(item, price) {
    cart.push({ item, price });
    totalPrice += price;
    updateCartDisplay();
}

function updateCartDisplay() {
    const cartElement = document.getElementById('cart');
    const cartItems = document.getElementById('cart-items');
    const totalElement = document.getElementById('total');
    
    cartElement.style.display = 'block';
    cartItems.innerHTML = ''; // Limpa a lista
    
    cart.forEach((cartItem, index) => {
        const li = document.createElement('li');
        li.textContent = `${cartItem.item} - R$${cartItem.price.toFixed(2)}`;
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remover';
        removeButton.onclick = () => removeFromCart(index);
        li.appendChild(removeButton);
        cartItems.appendChild(li);
    });
    
    totalElement.textContent = `Total: R$${totalPrice.toFixed(2)}`;
}

function removeFromCart(index) {
    totalPrice -= cart[index].price;
    cart.splice(index, 1);
    updateCartDisplay();
}

function checkout() {
    alert('Compra finalizada! Total: R$' + totalPrice.toFixed(2));
    cart = [];
    totalPrice = 0;
    updateCartDisplay();
}