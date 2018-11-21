import React, { useContext } from "react";
import { ButtonGroup, Table } from "reactstrap";
import { ButtonIconAdd, ButtonIconEdit, ButtonIconDelete } from "./Icons";

import { BookstoresProvider, BookstoresContext } from "./context/bookstores";

function BookstoreRow(id, data) {
  return (
    <tr key={id}>
      <td>{id}</td>
      <td>{data.nombre}</td>
      <td>{data.contacto}</td>
      <td style={{ whiteSpace: "pre-line" }}>{data.direccion}</td>
      <td>{data.localidad}</td>
      <td>{data.telefono}</td>
      <td>{data.email}</td>
      <td>
        <ButtonGroup size="sm">
          <ButtonIconEdit onClick={() => console.log("edit", id)} />
          <ButtonIconDelete onClick={() => console.log("delete", id)} />
        </ButtonGroup>
      </td>
    </tr>
  );
}

function BookstoresTable() {
  const { bookstores, error, addBookstore, deleteBookstore } = useContext(
    BookstoresContext
  );
  if (error) {
    throw new Error(error); // send if to the error boundary
  }

  return (
    <>
      <h1>Puntos de Venta</h1>
      <Table striped hover size="sm" responsive>
        <thead>
          <tr>
            <th>Código</th>
            <th>Nombre</th>
            <th>Contacto</th>
            <th>Dirección</th>
            <th>Localidad</th>
            <th>Teléfono</th>
            <th>e-Mail</th>

            <th />
          </tr>
        </thead>
        <tbody>
          {Object.keys(bookstores).map(id => BookstoreRow(id, bookstores[id]))}
        </tbody>
      </Table>

      <ButtonIconAdd
        className="mr-2"
        onClick={() => addBookstore("Satyam", { nombre: "Daniel Barreiro" })}
        label="agregar"
      />
      <ButtonIconDelete
        onClick={() => deleteBookstore("Satyam")}
        label="borrar"
      />
      <pre>{JSON.stringify(bookstores, null, 2)}</pre>
    </>
  );
}
export default function Bookstores() {
  return (
    <BookstoresProvider>
      <BookstoresTable />
    </BookstoresProvider>
  );
}
