const admin = require("firebase-admin");

const serviceAccount = require("./lacorazon-d66fd-firebase-adminsdk-thy14-92e97d72c9.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://lacorazon-d66fd.firebaseio.com"
});

const db = admin.firestore();

db.settings({
  timestampsInSnapshots: true
});
const data = require("./data.json");

function addUsers() {
  const users = db.collection("users");
  return Promise.all([
    users.doc("ro").set({
      name: "Roxana Cabut"
    }),
    users.doc("ra").set({
      name: "Raed El Younsi"
    }),
    users.doc("rora").set({
      name: "Roxana & Raed"
    })
  ]);
}

function addPuntosDeVenta() {
  const pdv = db.collection("puntosDeVenta");
  const campos = [
    "codigo",
    "nombre",
    "localidad",
    "contacto",
    "telefono",
    "email",
    "direccion"
  ];
  return Promise.all(
    data.puntosDeVenta.map(punto =>
      pdv.doc(punto.codigo).set(
        campos.reduce((acc, campo) => {
          if (punto[campo]) acc[campo] = punto[campo];
          return acc;
        }, {})
      )
    )
  );
}

function addVentaDirecta() {
  const ventas = db.collection("ventaDirecta");
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
  const consigna = db.collection("enConsigna");
  return Promise.all(
    data.enConsigna.map(venta =>
      consigna.add({
        ...venta,
        fecha: new Date(venta.fecha),
        vendedor: venta.vendedor ? venta.vendedor.toLowerCase() : null
      })
    )
  );
}

function addSalidas() {
  const salidas = db.collection("salidas");
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
