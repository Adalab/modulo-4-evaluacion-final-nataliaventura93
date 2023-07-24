// Servidor Express

// Para probar los ficheros estáticos del fronend, entrar en <http://localhost:4500/>
// Para probar el API, entrar en <http://localhost:4500/api/items>

// Imports

const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
require('dotenv').config();

// Arracar el servidor

const server = express();

// Configuración del servidor

server.use(cors());
server.use(express.json({ limit: '25mb' }));

// Conexion a la base de datos

async function getConnection() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS,
    database: process.env.DB_NAME || 'Clase',
  });

  connection.connect();

  return connection;
}

// Poner a escuchar el servidor

const port = process.env.PORT || 4500;
server.listen(port, () => {
  console.log(`Ya se ha arrancado nuestro servidor: http://localhost:${port}/`);
});

// Endpoints

server.get('/api/recetas', async (req, res) => {
  try {
    const selectRecipes = 'SELECT * FROM recetas';
    const conn = await getConnection();
    const [results] = await conn.query(selectRecipes);
    conn.end();
    res.json({
      success: true,
      info: { count: results.length },
      results: results,
    });
  } catch (error) {
    res.json({
      success: false,
      message: 'No ha sido posible obtener las recetas',
    });
  }
});

server.get('/api/recetas/:id', async (req, res) => {
  const recipesId = req.params.id;

  try {
    const selectRecipes = 'SELECT * FROM recetas WHERE id=?';
    const conn = await getConnection();
    const [results] = await conn.query(selectRecipes, recipesId);
    conn.end();
    res.json({
      success: true,
      results: results,
    });
  } catch (error) {
    res.json({
      success: false,
      message: 'No ha sido posible obtener las recetas con el id proporcionado',
    });
  }
});
