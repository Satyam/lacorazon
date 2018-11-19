import React, { useContext } from "react";
import { UsersProvider, UsersContext } from "./context/users";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { Button, ButtonGroup, Table } from "reactstrap";

function UserRow(id, data) {
  return (
    <tr key={id}>
      <td>{id}</td>
      <td>{data.alias}</td>
      <td>{data.name}</td>
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
function UsersTable() {
  const { users, addUser, deleteUser } = useContext(UsersContext);
  return (
    <>
      <h1>Vendedores</h1>
      <Table striped hover size="sm" responsive>
        <thead>
          <tr>
            <th>Código</th>
            <th>Alias</th>
            <th>Nombre</th>
            <th />
          </tr>
        </thead>
        <tbody>{Object.keys(users).map(id => UserRow(id, users[id]))}</tbody>
      </Table>
      <Button
        outline
        color="primary"
        className="mr-2"
        onClick={() => addUser("satyam", { name: "Daniel Barreiro" })}
      >
        <Icon icon="plus-circle" color="blue" /> agregar
      </Button>
      <Button outline color="danger" onClick={() => deleteUser("satyam")}>
        <Icon icon="trash-alt" color="red" /> borrar
      </Button>
      <pre>{JSON.stringify(users, null, 2)}</pre>
    </>
  );
}
export default function Users() {
  return (
    <UsersProvider>
      <UsersTable />
    </UsersProvider>
  );
}
