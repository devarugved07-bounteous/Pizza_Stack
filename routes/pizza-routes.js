import express from 'express';
import {
  getPizzas,
  getPizzaById,
  createPizza,
  updatePizza,
  deletePizza,
} from '../controllers/piza-controller.js';

import { validate } from '../middleware/auth.js';


const router = express.Router();

router.get('/pizzas', validate, async (req, res) => {
  try {
    const pizzas = await getPizzas();
    res.json(pizzas);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get('/pizzas/:id', validate, async (req, res) => {
  try {
    const pizza = await getPizzaById(req.params.id);
    res.json(pizza);
  } catch (err) {
    res.status(404).send(err.message);
  }
});

router.post('/pizzas', validate, async (req, res) => {
  try {
    const newPizza = await createPizza(req.body);
    res.status(201).json(newPizza);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.put('/pizzas/:id', validate, async (req, res) => {
  try {
    const updatedPizza = await updatePizza(req.params.id, req.body);
    res.json(updatedPizza);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.delete('/pizzas/:id', validate, async (req, res) => {
  try {
    const result = await deletePizza(req.params.id);
    res.json(result);
  } catch (err) {
    res.status(404).send(err.message);
  }
});

export default router;
