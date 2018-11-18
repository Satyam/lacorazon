
function makeHash(codigos, initialObj) {
  var acc = {};

  codigos.map(function (c) {
    return c[0].toLowerCase();
  }).filter(function (c) {
    return c.length;
  }).forEach(function (c) {
    var o = {};
    for (var k in initialObj) {
      o[k] = initialObj[k];
    }
    acc[c] = o
  });
  return acc;
};

function getValues(namedRange) {
  return SpreadsheetApp
    .getActiveSpreadsheet()
    .getRangeByName(namedRange)
    .getValues();
}

function getValuesA1(range) {
  return SpreadsheetApp
    .getActiveSpreadsheet()
    .getRange(range)
    .getValues();
}

function getTable(namedRange, mandatoryField) {
  var data = getValues(namedRange);
  var headers = data.shift();
  var iMandatory = headers.indexOf(mandatoryField);

  var reply = [];

  data.forEach(function (row) {
    if(row[iMandatory]) {
      var acc = {};
      headers.forEach(function (key, i) {
        acc[key] = row[i];
      });
      reply.push(acc);
    }
  });
  return reply;
}

function getTableA1(range, mandatoryField) {
  var data = getValuesA1(range);
  var headers = data.shift();
  var iMandatory = headers.indexOf(mandatoryField);

  var reply = [];

  data.forEach(function (row) {
    if(row[iMandatory]) {
      var acc = {};
      headers.forEach(function (key, i) {
        if (key) acc[key] = row[i];
      });
      reply.push(acc);
    }
  });
  return reply;
}

function getRow(namedRange) {
  return getValues(namedRange)[0];
}

function getValue(namedRange) {
  return getValues(namedRange)[0][0];
}


function clearContents(namedRange) {
  SpreadsheetApp
    .getActiveSpreadsheet()
    .getRangeByName(namedRange)
    .clearContent();
}

function setColorSchema(namedRange, text, background) {
  var range = SpreadsheetApp
    .getActiveSpreadsheet()
    .getRangeByName(namedRange)
    .setFontColor(text);
  if (background) range.setBackground(background);
}

function invalidate(namedRanges) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();

  Array.prototype.slice.call(arguments).forEach(function (n) {
    log(n);
    ss.getRangeByName(n)
      .setBackground('silver')
      .setFontColor('white');
  });
}

function writeValues(namedRange, values) {
  var range = SpreadsheetApp
    .getActiveSpreadsheet()
    .getRangeByName(namedRange);

  range
    .clearContent()
    .setBackground('lightpink')
    .setFontColor('black')
    .getSheet()
    .getRange(range.getRow(), range.getColumn(), values.length, values[0].length)
    .setValues(values);
}

var cache = {};

function clearCache() {
  cache = {};
}

function readVentaDirecta() {
  return cache.ventaDirecta || (cache.ventaDirecta = getTable('VentaDirecta', 'cantidad'));
}

function readEnConsigna() {
  return cache.enConsigna || (cache.enConsigna = getTable('EnConsigna', 'codigo'));
}

function readSalidas() {
  return cache.salidas || (cache.salidas = getTable('Salidas', 'importe'));
}

function log(values) {
  Logger.log(JSON.stringify(values, null, 2));
};

function filterEmpties(data) {
  return data.map(function (row) {
    return Object.keys(row).filter( function (key) {
      return row[key];
    }).reduce(function (acc, key) {
      acc[key] = row[key];
      return acc;
    },{})
  });
};

function exportData() {
  log({
    ventaDirecta: filterEmpties(getTableA1('VentaDirecta!A3:H1000', 'cantidad'))
  });
  log({
    enConsigna: filterEmpties(getTableA1('EnConsigna!A3:J1000','codigo'))
  });
  log({
    salidas: filterEmpties(getTableA1('Salidas!A3:G1000','importe'))
  });
  log({
    puntosDeVenta: filterEmpties(getTableA1('Puntos de Venta!A4:M1000','codigo'))
  });
};

function refreshVentaDirecta() {

  var comisiones = readSalidas()
    .filter(function (row) {
      return row.comision;
    })
  .reduce(function (comisiones, row) {
    var vendedor = row.comision.toLowerCase();
    comisiones[vendedor] = (comisiones[vendedor] || 0) + row.importe;
    return comisiones;
  }, {})
  ;

  var comision = getValue('comisionInterna');

  var data = readVentaDirecta();

  var acc = {};

  data.forEach(function (row) {
    var n = row.vendedor;
    var v = n.toLowerCase();
    var p = Number(row.precioUnitario);
    var c = Number(row.cantidad);

    v = v || '??';

    var tot = acc[v];

    if (!tot) {
      tot = {
        name: n,
        vendido: 0,
        regalado: 0,
        total: 0,
        precio: 0,
        comision: 0
      }
      acc[v] = tot;
    }

    tot.total += c;
    if (p) {
      tot.vendido += c;
      tot.precio += c * p;
      tot.comision += c * p * comision;
    } else {
      tot.regalado += c;
    }
  });

  for (v in acc) {
    var row = acc[v];
    if (row.vendido) {
      row.promedio = row.precio / row.vendido;
    }
    if (comisiones[v]) row.comision -= comisiones[v];
  }


  writeValues("SumarioVentaDirecta", Object.keys(acc).sort().map(function(k) {
    var row = acc[k];
    return [row.name, row.vendido, row.regalado, row.total, row.precio, row.promedio, k ==='rora' ? '': row.comision];
  }));
}

function refreshEnConsigna(data, codigos, columnas, PVP, comision) {
  var PVP = getValue('PVP');
  var comision = getValue('comision');
  var codigos = getValues('CodigosPuntosDeVenta');
  var columnas = getRow('columnasPuntosDeVenta');


  var acc = makeHash(
    codigos,
    {
      entregados: 0,
      vendidos: 0,
      devueltos: 0,
      aCobrar: 0,
      cobrado: 0,
      porcentaje: 0
    }
  );

  var data = readEnConsigna();

  data.forEach(function (row) {
    var codigo = row.codigo.toLowerCase();
    if (!codigo) return;
    var tot = acc[codigo];
    if (!tot) throw new Error('Código de librería `' + row.codigo + '` desconocido');

    var entregados = Number(row.entregados);
    tot.entregados += entregados;

    var porcentaje = Number(row.porcentaje);
    if (porcentaje === 0) porcentaje = tot.porcentaje || comision;
    else tot.porcentaje = porcentaje;

    tot.vendidos += Number(row.vendidos);

    tot.devueltos += Number(row.devueltos);

    var cobrado = Number(row.cobrado);
    tot.cobrado += cobrado;

    tot.aCobrar = PVP * tot.vendidos * (1 - porcentaje) - cobrado;

    tot.existencias = tot.entregados - tot.vendidos - tot.devueltos;

  });


  var cant = Object.keys(acc).length;

  var reply = [];

  codigos.some(function (codigo) {
    codigo = codigo[0];

    if (!codigo) {
      reply.push([]);
    } else {
      var tot = acc[codigo.toLowerCase()];

      reply.push(columnas.map(function (columna) {
        return tot[columna];
      }));
      cant--;
    }

    return !cant;
  });


  writeValues('SumarioPuntosDeVenta', reply);
}

function acumVentaDirecta() {
  var data = readVentaDirecta();

  var factorPrecioSinIva = 1 + getValue('IVALibros');
  var acc = [];

  data.forEach(function (row) {
    var precio = Number(row.precioUnitario) * Number(row.cantidad);
    if (!precio) return;
    var precioSinIVA = row.iva ? precio / factorPrecioSinIva : precio;

    acc.push([
      row.fecha, // fecha
      'VD: ' + row.vendedor, // origen
      row.concepto, // concepto
      precio, // precio:
      (precio - precioSinIVA) || '', // IVA:
      precioSinIVA // importe:
    ]);
  });
  return acc;
}

function acumSalidas() {

  var acc = [];

  var data = readSalidas();

  data.forEach( function (row) {
    var importe = Number(row.importe);

    var iva = Number(row.iva);
    var isReintegro = row.reintegro;
    var isPagoIVA = row.pagoiva;
    var comision = row.comision.toLowerCase();

    if (
      (iva ? 1 : 0) +
      (isReintegro ? 1 : 0) +
      (isPagoIVA ? 1 : 0) +
      (comision ? 1 : 0) > 1) {
        throw new Error('En Salidas para la fecha ' + row.fecha.toDateString() +
          ' no puede haber más de uno: IVA, Reintegro, Pago IVA o Comision en una misma entrada');
      }


    var importeSinIVA = importe / (1 + iva);
    acc.push([
      row.fecha,
      (isReintegro ? 'Reintegro': ( isPagoIVA ? 'Pago IVA' : (comision ? 'Comisión ' + comision : 'Gasto'))),
      row.concepto,
      -importe,
      isPagoIVA ? -importe : -(importe - importeSinIVA)  || '',
      isPagoIVA ? 0: -importeSinIVA
     ]);
  });
  return acc;
 }

function acumConsigna() {
  var data = readEnConsigna();

  var acc = [];

  var factorPrecioSinIva = 1 + getValue('IVALibros');

  data.forEach(function (row) {
    var cobrado = Number(row.cobrado);
    if (!cobrado) return;

    var cobradoSinIVA = row.iva ? cobrado / factorPrecioSinIva : cobrado;

    acc.push([
      row.fecha,
      'Dist: ' + row.vendedor,
      row.codigo,
      cobrado,
      (cobrado - cobradoSinIVA) || '',
      cobradoSinIVA
    ]);
  });

  return acc;

}


function refreshCaja() {

  var saldo = 0;
  var acumIVA = 0;

  var reply = acumSalidas().concat(acumVentaDirecta(), acumConsigna())
    .sort(function (a, b) {
      return a[0] - b[0];
    })
    .map(function (row) {
      saldo += row[5];
      acumIVA += row[4] || 0;
      row.push(saldo, acumIVA);
      return row;
    });


  writeValues('Caja', reply);
  writeValues('AcumCaja',[[saldo, acumIVA]]);

}

function refreshIngresos() {
  var data = readSalidas();

  var reintegros = 0;
  var comisiones = {
    ro: 0,
    ra: 0
  }

  data.forEach(function (row) {
    if (row.reintegro) {
      reintegros += row.importe;
    }
    if (row.comision) {
      comisiones[row.comision.toLowerCase()] += row.importe;
    }
  });
  writeValues('Ingresos', [
    [reintegros / 2, comisiones.ro, reintegros / 2 + comisiones.ro ],
    [reintegros / 2, comisiones.ra, reintegros / 2 + comisiones.ra],
    [reintegros, comisiones.ro + comisiones.ra, reintegros + comisiones.ro + comisiones.ra]
  ]);
}


function refresh() {
  SpreadsheetApp.getActiveSpreadsheet().toast("La hoja se está recalculando", "Paciencia ....", -1);
  clearCache();
  refreshCaja();
  refreshVentaDirecta();
  refreshEnConsigna();
  refreshIngresos();
  SpreadsheetApp.getActiveSpreadsheet().toast("¡Hecho!", "fin", 1);
}

function onOpen() {
  refresh();
}

function onEdit() {
  invalidate("SumarioVentaDirecta","SumarioPuntosDeVenta","Caja", 'AcumCaja', 'Ingresos');
}

  
