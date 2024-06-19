// backend/middleware/authMiddleware.js

const jwt = require('jsonwebtoken');
const { secretKey } = require('../config'); // Asegúrate de tener un archivo de configuración con tu clave secreta

function authMiddleware(req, res, next) {
  // Leer el token del encabezado de autorización
  const token = req.header('Authorization').replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Acceso denegado. Token no proporcionado.' });
  }

  try {
    // Verificar el token
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded.user; // Almacenar datos del usuario en el objeto de solicitud
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token no válido.' });
  }
}

module.exports = authMiddleware;