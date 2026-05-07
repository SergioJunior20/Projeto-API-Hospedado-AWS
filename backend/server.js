require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const connectDB = require('./config/db');

const app = express();

connectDB();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use('/usuarios', require('./routes/usuarioRoutes'));

app.get('/', (req, res) => {
  res.send('API organizada funcionando 🚀');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});