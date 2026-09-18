const mongoose = require('mongoose');

// Un festivo puede ser:
//  - Tipo 1: fijo, no se puede variar -> usa dia y mes
//  - Tipo 2: fijo pero se traslada al siguiente lunes (Ley de "Puente festivo") -> usa dia y mes
//  - Tipo 3: basado en el domingo de pascua -> usa diasPascua (puede ser negativo)
//  - Tipo 4: basado en el domingo de pascua y se traslada al siguiente lunes -> usa diasPascua
const festivoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  tipo: { type: Number, required: true, enum: [1, 2, 3, 4] },
  dia: { type: Number, default: null },       // solo para tipo 1 y 2
  mes: { type: Number, default: null },       // solo para tipo 1 y 2
  diasPascua: { type: Number, default: null } // solo para tipo 3 y 4
}, { versionKey: false });

module.exports = mongoose.model('Festivo', festivoSchema, 'festivos');