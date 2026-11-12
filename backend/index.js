// const express = require('express')
// const app = express()
// app.use(express.json())

// app.get('/api/health', (req, res) => res.json({ ok: true }))

// app.listen(3000, () => console.log('Back escuchando en el puerto 3000'))

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sequelize from './src/config/database.js';
import apiRoutes from './src/routes/api.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use('/api', apiRoutes);

app.get('/', (req, res) => {
  res.send('¡API de Team App funcionando correctamente!');
});

sequelize.sync({ alter: true })
  .then(() => {
    console.log('Base de datos conectada y modelos sincronizados con éxito.');
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Error al conectar con la base de datos:', err);
  });