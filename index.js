const express = require('express');
const app = express();
const session = require('express-session');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(session({ secret: 'chave_secreta' }));

// Cadastro de usuários com login/senha
const usuarios = {
    'usuario1': { 'email': 'usuario1@mail.com', 'senha': '123456' },
    'usuario2': { 'email': 'usuario2@mail.com', 'senha': 'abcdef' },
    'usuario3': { 'email': 'usuario3@mail.com', 'senha': 'qwerty' }
};

// Rota para realizar a autenticação de usuários
app.post('/login', urlencodedParser, (req, res) => {
    const email = req.body.email;
    const senha = req.body.senha;
    for (let usuario in usuarios) {
        if (usuarios[usuario].email === email && usuarios[usuario].senha === senha) {
            req.session.usuario_logado = usuario;
            return res.redirect('/clientes');
        }
    }
    return res.json({ 'mensagem': 'E-mail ou senha inválidos' });
});

// Rota para verificar se o usuário está autenticado
app.get('/verificar_autenticacao', (req, res) => {
    if (req.session.usuario_logado) {
        return res.json({ 'autenticado': true });
    } else {
        return res.json({ 'autenticado': false });
    }
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});