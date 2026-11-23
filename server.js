// Importando o módulo 'express' e atribuindo-o à constante 'app'
const app = require('express')();
// Importando o módulo 'http' e criando um servidor com ele, atribuindo-o à constante 'http'
const http = require('http').createServer(app);
// Importando o módulo 'socket.io' e passando o servidor 'http' como parâmetro, atribuindo-o à constante 'io'
const io = require('socket.io')(http);

// Rota para a página inicial (chat)
app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'));

// Nova rota adicionada para a tela de entrada do grupo
app.get('/login', (req, res) => res.sendFile(__dirname + '/login.html'));

// Evento para quando o cliente se conecta ao servidor via Socket.io
io.on('connection', (socket) => {
  console.log('Usuário conectado');

  // Evento para quando o cliente envia uma mensagem via Socket.io
  socket.on('chat message', (data) => io.emit('chat message', data));

  // Evento para quando o cliente se desconecta do servidor via Socket.io
  socket.on('disconnect', () => console.log('Usuário desconectado'));
});

// Inicia o servidor na porta 3000
http.listen(3000, () => {
  console.log(`Servidor rodando na porta 3000 - Link http://10.105.204.3:3000`);
});