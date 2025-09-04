import Pizza from '../models/Pizza.js';

// GET all pizzas
export const getPizzas = async () => {
  try {
    const pizzas = await Pizza.findAll();
    return pizzas;
  } catch (error) {
    throw new Error('Failed to fetch pizzas');
  }
};

// GET a single pizza by ID
export const getPizzaById = async (id) => {
  try {
    const pizza = await Pizza.findByPk(id);
    if (!pizza) {
      throw new Error('Pizza not found');
    }
    return pizza;
  } catch (error) {
    throw new Error('Error fetching pizza by ID');
  }
};

// POST a new pizza
export const createPizza = async ({ name, price, ingredients }) => {
  if (!name || !price || !ingredients) {
    throw new Error('Missing required fields');
  }

  try {
    const newPizza = await Pizza.create({ name, price, ingredients });
    return newPizza;
  } catch (error) {
    throw new Error('Error creating pizza');
  }
};

// PUT (update) a pizza
export const updatePizza = async (id, { name, price, ingredients }) => {
  if (!name || !price || !ingredients) {
    throw new Error('Missing required fields');
  }

  try {
    const pizza = await Pizza.findByPk(id);
    if (!pizza) {
      throw new Error('Pizza not found');
    }

    pizza.name = name;
    pizza.price = price;
    pizza.ingredients = ingredients;

    await pizza.save();
    return pizza;
  } catch (error) {
    throw new Error('Error updating pizza');
  }
};

// DELETE a pizza
export const deletePizza = async (id) => {
  try {
    const pizza = await Pizza.findByPk(id);
    if (!pizza) {
      throw new Error('Pizza not found');
    }

    await pizza.destroy();
    return { message: 'Pizza deleted successfully' };
  } catch (error) {
    throw new Error('Error deleting pizza');
  }
};
