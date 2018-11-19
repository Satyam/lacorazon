import React, { useContext } from "react";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { Button, ButtonGroup, Table } from "reactstrap";

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
          <Button
            outline
            color="primary"
            onClick={() => console.log("add", id)}
          >
            <Icon icon="plus-circle" color="blue" />
          </Button>
          <Button
            outline
            color="danger"
            onClick={() => console.log("delete", id)}
          >
            <Icon icon="trash-alt" color="red" />
          </Button>
        </ButtonGroup>
      </td>
    </tr>
  );
}

function BookstoresTable() {
  const { bookstores, addBookstore, deleteBookstore } = useContext(
    BookstoresContext
  );
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

      <Button
        className="mr-2"
        outline
        color="primary"
        onClick={() => addBookstore("Satyam", { nombre: "Daniel Barreiro" })}
      >
        <Icon icon="plus-circle" color="blue" /> agregar
      </Button>
      <Button outline color="danger" onClick={() => deleteBookstore("Satyam")}>
        <Icon icon="trash-alt" color="red" /> borrar
      </Button>
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
