// index.js
const express = require('express');
const app = express();
//const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.json({ mensaje: '¡TESTER en Render!' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});


const express = require('express');
const axios = require('axios');
const app = express();

// Puerto que usará Render (usa el que Render le asigna automáticamente)
const PORT = process.env.PORT || 3000;

// ?? Reemplaza esto con tu API KEY real de SparkPost
const SPARKPOST_API_KEY = '9ed4337ce18fded1109cf26f055b1ca8ff358a34';

// Ruta raíz (opcional)
app.get('/', (req, res) => {
  res.json({ mensaje: '¡TESTER_ API_GO_Render!' });
});

// Ruta para consultar eventos de SparkPost
app.get('/spark-events', async (req, res) => {
  try {
    const response = await axios.get('https://api.sparkpost.com/api/v1/message-events', {
      headers: {
        Authorization: SPARKPOST_API_KEY
      },
      params: {
        limit: 10 // Puedes cambiar este número o agregar filtros como "event"
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error al obtener eventos:', error.response?.data || error.message);
    res.status(500).json({ error: 'No se pudieron obtener los eventos de SparkPost.' });
  }
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});
