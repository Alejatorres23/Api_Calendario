/**
 * Calcula la fecha del Domingo de Pascua para un anio dado,
 * usando el algoritmo indicado en el enunciado:
 *
 *   a = anio MOD 19
 *   b = anio MOD 4
 *   c = anio MOD 7
 *   d = (19a + 24) MOD 30
 *   dias = d + (2b + 4c + 6d + 5) MOD 7
 *
 * "dias" son los dias que hay que sumar al 15 de marzo para obtener
 * el Domingo de Ramos. El Domingo de Pascua es 7 dias despues.
 */
function calcularDomingoPascua(anio) {
  const a = anio % 19;
  const b = anio % 4;
  const c = anio % 7;
  const d = (19 * a + 24) % 30;
  const dias = d + (2 * b + 4 * c + 6 * d + 5) % 7;

  const domingoRamos = new Date(Date.UTC(anio, 2, 15));
  domingoRamos.setUTCDate(domingoRamos.getUTCDate() + dias);

  const domingoPascua = new Date(domingoRamos);
  domingoPascua.setUTCDate(domingoPascua.getUTCDate() + 7);

  return domingoPascua;
}

function trasladarASiguienteLunes(fecha) {
  const resultado = new Date(fecha);
  const diaSemana = resultado.getUTCDay();
  if (diaSemana === 1) return resultado;
  const diasHastaLunes = (8 - diaSemana) % 7 || 7;
  resultado.setUTCDate(resultado.getUTCDate() + diasHastaLunes);
  return resultado;
}

function calcularFechaFestivo(festivo, anio) {
  let fecha;

  if (festivo.tipo === 1 || festivo.tipo === 2) {
    fecha = new Date(Date.UTC(anio, festivo.mes - 1, festivo.dia));
  } else {
    const pascua = calcularDomingoPascua(anio);
    fecha = new Date(pascua);
    fecha.setUTCDate(fecha.getUTCDate() + festivo.diasPascua);
  }

  if (festivo.tipo === 2 || festivo.tipo === 4) {
    fecha = trasladarASiguienteLunes(fecha);
  }

  return fecha;
}

function esMismaFechaUTC(f1, f2) {
  return (
    f1.getUTCFullYear() === f2.getUTCFullYear() &&
    f1.getUTCMonth() === f2.getUTCMonth() &&
    f1.getUTCDate() === f2.getUTCDate()
  );
}

function formatearFechaISO(fecha) {
  const y = fecha.getUTCFullYear();
  const m = String(fecha.getUTCMonth() + 1).padStart(2, '0');
  const d = String(fecha.getUTCDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function esFechaValida(anio, mes, dia) {
  if (
    !Number.isInteger(anio) || !Number.isInteger(mes) || !Number.isInteger(dia)
  ) return false;
  if (mes < 1 || mes > 12) return false;
  if (dia < 1) return false;

  const fecha = new Date(Date.UTC(anio, mes - 1, dia));
  return (
    fecha.getUTCFullYear() === anio &&
    fecha.getUTCMonth() === mes - 1 &&
    fecha.getUTCDate() === dia
  );
}

module.exports = {
  calcularDomingoPascua,
  trasladarASiguienteLunes,
  calcularFechaFestivo,
  esMismaFechaUTC,
  formatearFechaISO,
  esFechaValida
};