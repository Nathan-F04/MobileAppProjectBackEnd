const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const basketItemSchema = new Schema({
  car: { type: Schema.Types.ObjectId, ref: 'Car', required: true },
  quantity: { type: Number, default: 1, min: 1 }
});

const basketSchema = new Schema({
  userId: { type: String, required: true, index: true },
  items: [basketItemSchema]
}, { timestamps: true });

module.exports = mongoose.model('Basket', basketSchema);
