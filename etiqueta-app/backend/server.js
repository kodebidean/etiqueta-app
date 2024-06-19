// Express y Mongoose
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

// Middlewares
app.use(bodyParser.json());
app.use(cors());

// Conexión a MongoDB
mongoose.connect('mongodb://localhost:27017/etiqueta-app')
  .then(() => console.log('MongoDB conectado'))
  .catch(err => console.log(err));

// Rutas
app.get('/', (req, res) => {
    res.send('Bienvenido a la API de Etiqueta App');
});

// Puerto del servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));

// Routes
const authRoutes = require('./routes/auth');
const tagRoutes = require('./routes/tags');
// Routes Uses
app.use('/api/auth', authRoutes);
app.use('/api/tags', tagRoutes);