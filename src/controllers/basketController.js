import Basket from "../models/Basket.js";
import Car from "../models/Car.js";

// View basket for a user
exports.getBasket = async (req, res) => {
  try {
    const { userId } = req.params;
    const basket = await Basket.findOne({ userId }).populate('items.car');
    if (!basket) return res.json({ userId, items: [] });
    res.json(basket);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching basket', error: err.message });
  }
};

// Add car to basket (or increase quantity)
exports.addToBasket = async (req, res) => {
  try {
    const { userId, carId, quantity = 1 } = req.body;
    if (!userId || !carId) return res.status(400).json({ message: 'userId and carId required' });

    const car = await Car.findById(carId);
    if (!car) return res.status(404).json({ message: 'Car not found' });

    let basket = await Basket.findOne({ userId });
    if (!basket) {
      basket = await Basket.create({ userId, items: [{ car: carId, quantity }] });
      await basket.populate('items.car');
      return res.status(201).json({ message: 'Added to new basket', basket });
    }

    const existing = basket.items?.find(i => i.car && String(i.car) === String(carId));
    if (existing) {
      existing.quantity = Math.max(1, existing.quantity + quantity);
    } else {
      basket.items.push({ car: carId, quantity });
    }

    await basket.save();
    await basket.populate('items.car');
    res.json({ message: 'Basket updated', basket });
  } catch (err) {
    res.status(500).json({ message: 'Error adding to basket', error: err.message });
  }
};

// Remove car or reduce quantity
exports.removeFromBasket = async (req, res) => {
  try {
    const { userId, carId, removeAll = false } = req.body;
    if (!userId || !carId) return res.status(400).json({ message: 'userId and carId required' });

    const basket = await Basket.findOne({ userId });
    if (!basket) return res.status(404).json({ message: 'Basket not found' });

    const idx = basket.items.findIndex(i => i.car.toString() === carId);
    if (idx === -1) return res.status(404).json({ message: 'car not in basket' });

    if (removeAll) {
      basket.items.splice(idx, 1);
    } else {
      basket.items[idx].quantity = Math.max(0, basket.items[idx].quantity - 1);
      if (basket.items[idx].quantity === 0) basket.items.splice(idx, 1);
    }

    await basket.save();
    await basket.populate('items.car');
    res.json({ message: 'Basket updated', basket });
  } catch (err) {
    res.status(500).json({ message: 'Error removing from basket', error: err.message });
  }
};

// Remove a basket item by its subdocument id (itemId)
exports.removeItem = async (req, res) => {
  try {
    const { userId, itemId } = req.body;
    if (!userId || !itemId) return res.status(400).json({ message: 'userId and itemId required' });

    const basket = await Basket.findOne({ userId });
    if (!basket) return res.status(404).json({ message: 'Basket not found' });

    const idx = basket.items.findIndex(i => i._id.toString() === itemId);
    if (idx === -1) return res.status(404).json({ message: 'Item not found in basket' });

    basket.items.splice(idx, 1);
    await basket.save();
    await basket.populate('items.car');
    res.json({ message: 'Item removed', basket });
  } catch (err) {
    res.status(500).json({ message: 'Error removing item', error: err.message });
  }
};

// Clear all items for a user's basket
exports.clearBasket = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) return res.status(400).json({ message: 'userId required' });

    const basket = await Basket.findOneAndUpdate({ userId }, { items: [] }, { new: true });
    if (!basket) return res.status(404).json({ message: 'Basket not found' });

    await basket.populate('items.car');
    res.json({ message: 'Basket cleared', basket });
  } catch (err) {
    res.status(500).json({ message: 'Error clearing basket', error: err.message });
  }
};
