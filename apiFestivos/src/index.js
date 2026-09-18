require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const festivosRouter = require('./routes/festivos');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 8080;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/festivosdb';

app.use('/api/festivos', festivosRouter);

app.get('/', (req, res) => {
  res.send('API Festivos funcionando. Prueba /api/festivos/verificar/2023/6/12');
});

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('Conectado a MongoDB:', MONGO_URI);
    app.listen(PORT, () => {
      console.log(`API Festivos escuchando en el puerto ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Error conectando a MongoDB:', err.message);
    process.exit(1);
  });