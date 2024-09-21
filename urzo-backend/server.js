const mongoose = require('mongoose');
const express = require('express');
const app = express();
const port = 3000;

// Middleware para parsear JSON
app.use(express.json());

// Conectar ao MongoDB
mongoose.connect('mongodb://localhost:27017/urzo', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Definir o modelo do carrinho
const cartSchema = new mongoose.Schema({
    name: String,
    price: Number,
    quantity: Number
});

const CartItem = mongoose.model('CartItem', cartSchema);

// Endpoint para receber dados do carrinho
app.post('/api/sendCart', async (req, res) => {
    try {
        const cart = req.body;
        // Salvar cada item do carrinho no banco de dados
        await CartItem.insertMany(cart);
        console.log('Carrinho recebido:', cart);
        res.json({ message: 'Carrinho recebido e salvo com sucesso!' });
    } catch (error) {
        console.error('Erro ao salvar o carrinho:', error);
        res.status(500).json({ message: 'Erro ao salvar o carrinho.' });
    }
});

// Endpoint para verificar se o servidor está funcionando
app.get('/', (req, res) => {
    res.send('Servidor está funcionando!');
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});