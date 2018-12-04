const admin = require('firebase-admin');

const serviceAccount = require('./lacorazon-d66fd-firebase-adminsdk-thy14-92e97d72c9.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://lacorazon-d66fd.firebaseio.com'
});

const db = admin.firestore();

db.settings({
  timestampsInSnapshots: true
});
const data = require('./data.json');

function addUsers() {
  const users = db.collection('users');
  return Promise.all([
    users.doc('ro').set({
      id: 'ro',
      nombre: 'Roxana Cabut',
      email: 'RoxanaCabut@gmail.com'
    }),
    users.doc('ra').set({
      id: 'ra',
      nombre: 'Raed El Younsi',
      email: 'reyezuelo@gmail.com'
    }),
    users.doc('rora').set({
      id: 'rora',
      nombre: 'Roxana & Raed',
      email: 'reyezuelo@gmail.com;RoxanaCabut@gmail.com'
    })
  ]);
}

function addPuntosDeVenta() {
  const pdv = db.collection('distribuidores');
  const campos = [
    'codigo',
    'nombre',
    'localidad',
    'contacto',
    'telefono',
    'email',
    'direccion'
  ];
  return Promise.all(
    data.puntosDeVenta.map(punto =>
      pdv.doc(punto.codigo.toLowerCase()).set(
        campos.reduce((acc, campo) => {
          if (campo === 'codigo') acc.id = punto.codigo.toLowerCase();
          else if (punto[campo]) acc[campo] = punto[campo];
          return acc;
        }, {})
      )
    )
  );
}

function addVentaDirecta() {
  const ventas = db.collection('ventas');
  return Promise.all(
    data.ventaDirecta.map(venta =>
      ventas.add({
        ...venta,
        fecha: new Date(venta.fecha),
        vendedor: venta.vendedor ? venta.vendedor.toLowerCase() : null
      })
    )
  );
}

function addEnConsigna() {
  const consigna = db.collection('consigna');
  return Promise.all(
    data.enConsigna.map(({ codigo, ...venta }) =>
      consigna.add({
        ...venta,
        fecha: new Date(venta.fecha),
        vendedor: venta.vendedor ? venta.vendedor.toLowerCase() : null,
        distribuidor: codigo.toLowerCase()
      })
    )
  );
}

function addSalidas() {
  const salidas = db.collection('salidas');
  return Promise.all(
    data.salidas.map(salida =>
      salidas.add({
        ...salida,
        fecha: new Date(salida.fecha)
      })
    )
  );
}

addUsers()
  .then(addPuntosDeVenta)
  .then(addVentaDirecta)
  .then(addEnConsigna)
  .then(addSalidas);
