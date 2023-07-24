
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
require('dotenv').config();



const server = express();


server.use(cors());
server.use(express.json({ limit: '25mb' }));


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


const port = process.env.PORT || 4500;
server.listen(port, () => {
  console.log(`Ya se ha arrancado nuestro servidor: http://localhost:${port}/`);
});


server.get('/recetas', async (req, res) => {
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

server.get('/recetas/:id', async (req, res) => {
  const recipesId = req.params.id;

  try {
    const selectRecipes = 'SELECT * FROM recetas WHERE id=?';
    const conn = await getConnection();
    const [results] = await conn.query(selectRecipes, recipesId);
    conn.end();
    res.json({
        "id" : recipesId,
        "nombre": results[0].nombre,
        "ingredientes": results[0].ingredientes,
        "instrucciones": results[0].instrucciones
    });
  } catch (error) {
    res.json({
      success: false,
      message: 'No ha sido posible obtener las recetas con el id proporcionado',
    });
  }
});

server.post('/recetas', async (req, res) => {
  const newRecipe = req.body;

  try {
    const insertNewRecipe =
      'INSERT INTO recetas (nombre, ingredientes, instrucciones) VALUES (?,?,?)';
    const conn = await getConnection();
    const [result] = await conn.query(insertNewRecipe, [
      newRecipe.nombre,
      newRecipe.ingredientes,
      newRecipe.instrucciones,
    ]);
    conn.end();
    res.json({
      success: true,
      id: result.insertId,
    });
  } catch (error) {
    res.json({
      success: false,
      message: 'No ha sido posible añadir la receta',
    });
  }
});

server.put('/recetas/:id', async (req, res) => {
  const recipeId = req.params.id;
  const {nombre, ingredientes, instrucciones} = req.body;

  try {
    const updateRecipe = 'UPDATE recetas SET nombre= ?, ingredientes= ?, instrucciones= ? WHERE id = ?';
    const conn = await getConnection();
    const [result] = await conn.query(updateRecipe, [
      nombre,
      ingredientes,
      instrucciones,
      recipeId,
    ]);
    conn.end();
    res.json({
      success: true,
    });
  } catch (error) {
    res.json({
      success: false,
      message: 'No ha sido posible actualizar la receta',
    });
  }
});

server.delete('/recetas/:id', async (req, res) => {
  const recipeId = req.params.id;

  try {
    const deleteRecipe = 'DELETE from recetas WHERE id= ?';
    const conn = await getConnection();
    const [result] = await conn.query(deleteRecipe, recipeId);
    conn.end();
    res.json({
      success: true,
    });
  } catch (error) {
    res.json({
      success: false,
      message: 'No ha sido posible eliminar la receta',
    });
  }
});