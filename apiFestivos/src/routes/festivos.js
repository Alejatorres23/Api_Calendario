const express = require('express');
const router = express.Router();
const Festivo = require('../models/Festivo');
const {
  calcularFechaFestivo,
  esMismaFechaUTC,
  formatearFechaISO,
  esFechaValida
} = require('../utils/festivosCalculo');

/**
 * GET /api/festivos/verificar/:anio/:mes/:dia
 * Responde con texto plano: "Es Festivo", "No es festivo" o "Fecha No valida"
 */
router.get('/verificar/:anio/:mes/:dia', async (req, res) => {
  const anio = parseInt(req.params.anio, 10);
  const mes = parseInt(req.params.mes, 10);
  const dia = parseInt(req.params.dia, 10);

  if (!esFechaValida(anio, mes, dia)) {
    return res.status(200).send('Fecha No valida');
  }

  const fechaConsultada = new Date(Date.UTC(anio, mes - 1, dia));

  const festivos = await Festivo.find();
  const esFestivo = festivos.some((f) =>
    esMismaFechaUTC(calcularFechaFestivo(f, anio), fechaConsultada)
  );

  return res.status(200).send(esFestivo ? 'Es Festivo' : 'No es festivo');
});

/**
 * GET /api/festivos/obtener/:anio
 * Responde con un JSON: [{ festivo, fecha }, ...] ordenado por fecha
 */
router.get('/obtener/:anio', async (req, res) => {
  const anio = parseInt(req.params.anio, 10);
  if (!Number.isInteger(anio)) {
    return res.status(400).json({ error: 'Anio no valido' });
  }

  const festivos = await Festivo.find();
  const listado = festivos
    .map((f) => ({
      festivo: f.nombre,
      fecha: formatearFechaISO(calcularFechaFestivo(f, anio))
    }))
    .sort((a, b) => (a.fecha > b.fecha ? 1 : -1));

  return res.status(200).json(listado);
});

module.exports = router;