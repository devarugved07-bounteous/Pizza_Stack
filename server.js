// import { json } from 'express';
import express,{json} from 'express';
import pool from './config/dbconnection.js';

// import fs from 'fs';

const app = express();
const port = 3000;

app.use(json());

// Root route
app.get("/", (req, res) => {
  res.send("Welcome to the Pizza API with Database");
});

// Get all pizzas
app.get("/pizzas", async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM pizzas');
    res.json(rows);
  } catch (err) {
    console.error("Error fetching pizzas:", err);
    res.status(500).send("Internal server error");
  }
});

// Get a specific pizza by ID
app.get("/pizzas/:id", async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM pizzas WHERE id = ?', [req.params.id]);

    if (rows.length === 0) {
      return res.status(404).send("Pizza not found");
    }

    res.json(rows[0]);
  } catch (err) {
    console.error("Error fetching pizza by ID:", err);
    res.status(500).send("Internal server error");
  }
});

// Add a new pizza
app.post("/pizzas", async (req, res) => {

  const { name, price, ingredients } = req.body;

  if (!name || !price || !ingredients) {
    return res.status(400).send("Missing required fields: name, price, ingredients");
  }

  try {
    const [result] = await pool.query(
      'INSERT INTO pizzas (name, price, ingredients) VALUES (?, ?, ?)',
      [name, price, ingredients]
    );

    res.status(201).json({
      message: "Pizza added successfully",
      id: result.insertId,
      pizza: { name, price, ingredients }
    });
  } catch (err) {
    console.error("Error inserting pizza:", err);
    res.status(500).send("Internal server error");
  }
});

app.put("/pizzas/:id", async (req, res) => {
  try {
    const { name, price, ingredients } = req.body;

    if (!name || !price || !ingredients) {
      return res.status(400).send("Missing required fields: name, price, ingredients");
    }

    const [result] = await pool.query(
      'UPDATE pizzas SET name = ?, price = ?, ingredients = ? WHERE id = ?',
      [name, price, ingredients, req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).send("Pizza not found");
    }

    res.json({
      message: "Pizza updated successfully",
      pizza: { id: req.params.id, name, price, ingredients }
    });
  } catch (err) {
    console.error("Error updating pizza:", err);
    res.status(500).send("Internal server error");
  }
});


// Delete a pizza by ID
app.delete("/pizzas/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await pool.query('DELETE FROM pizzas WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).send("Pizza not found");
    }

    res.json({
      message: `Pizza with ID ${id} deleted successfully`
    });
  } catch (err) {
    console.error("Error deleting pizza:", err);
    res.status(500).send("Internal server error");
  }
});


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
