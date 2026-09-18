require('dotenv').config();
const mongoose = require('mongoose');
const Festivo = require('../models/Festivo');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/festivosdb';

const festivos = [
  { nombre: 'Año nuevo', tipo: 1, dia: 1, mes: 1 },
  { nombre: 'Día del Trabajo', tipo: 1, dia: 1, mes: 5 },
  { nombre: 'Independencia Colombia', tipo: 1, dia: 20, mes: 7 },
  { nombre: 'Batalla de Boyacá', tipo: 1, dia: 7, mes: 8 },
  { nombre: 'Inmaculada Concepción', tipo: 1, dia: 8, mes: 12 },
  { nombre: 'Navidad', tipo: 1, dia: 25, mes: 12 },

  { nombre: 'Santos Reyes', tipo: 2, dia: 6, mes: 1 },
  { nombre: 'San José', tipo: 2, dia: 19, mes: 3 },
  { nombre: 'San Pedro y San Pablo', tipo: 2, dia: 29, mes: 6 },
  { nombre: 'Asunción de la Virgen', tipo: 2, dia: 15, mes: 8 },
  { nombre: 'Día de la Raza', tipo: 2, dia: 12, mes: 10 },
  { nombre: 'Todos los santos', tipo: 2, dia: 1, mes: 11 },
  { nombre: 'Independencia de Cartagena', tipo: 2, dia: 11, mes: 11 },

  { nombre: 'Jueves Santo', tipo: 3, diasPascua: -3 },
  { nombre: 'Viernes Santo', tipo: 3, diasPascua: -2 },
  { nombre: 'Domingo de Pascua', tipo: 3, diasPascua: 0 },

  { nombre: 'Ascensión del Señor', tipo: 4, diasPascua: 40 },
  { nombre: 'Corpus Christi', tipo: 4, diasPascua: 61 },
  { nombre: 'Sagrado Corazón de Jesús', tipo: 4, diasPascua: 68 }
];

async function seed() {
  await mongoose.connect(MONGO_URI);
  console.log('Conectado a MongoDB:', MONGO_URI);

  await Festivo.deleteMany({});
  await Festivo.insertMany(festivos);

  console.log(`Se insertaron ${festivos.length} festivos.`);
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error('Error al cargar los festivos:', err);
  process.exit(1);
});