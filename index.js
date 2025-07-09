// Cargar variables de entorno desde .env
require('dotenv').config();

// Importar dependencias
const express = require('express');
const axios = require('axios');

// Inicializar la aplicación de Express
const app = express();

// Puerto que usará Render (asignado automáticamente)
const PORT = process.env.PORT || 3000;

// Obtener la API Key de SparkPost desde las variables de entorno
const SPARKPOST_API_KEY = process.env.SPARKPOST_API_KEY;

// Ruta raíz (opcional)
app.get('/', (req, res) => {
  res.json({ mensaje: '¡TESTER API en Render!' });
});

// Ruta para consultar eventos de SparkPost
app.get('/spark-events', async (req, res) => {
  try {
    // Llamada a la API de SparkPost para obtener eventos
    const response = await axios.get('https://api.sparkpost.com/api/v1/message-events', {
      headers: {
        Authorization: SPARKPOST_API_KEY // Autorización con la API Key
      },
      params: {
        limit: 10 // Limitar a 10 eventos (ajustar según sea necesario)
        // Puedes agregar más filtros como 'event', 'from', 'to', etc.
      }
    });

    // Responder con los eventos obtenidos de SparkPost
    res.json(response.data);
  } catch (error) {
    // Manejo de errores
    console.error('Error al obtener los eventos de SparkPost:', error.message);
    res.status(500).json({ error: 'No se pudieron obtener los eventos de SparkPost.' });
  }
});

// Iniciar servidor en el puerto especificado
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
