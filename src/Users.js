import React, { useContext } from "react";
import { UsersProvider, UsersContext } from "./context/users";
import { ButtonIconAdd, ButtonIconEdit, ButtonIconDelete } from "./Icons";
import { ButtonGroup, Table } from "reactstrap";

function UserRow(id, data) {
  return (
    <tr key={id}>
      <td>{id}</td>
      <td>{data.alias}</td>
      <td>{data.name}</td>
      <td>
        <ButtonGroup size="sm">
          <ButtonIconEdit onClick={() => console.log("edit", id)} />
          <ButtonIconDelete onClick={() => console.log("delete", id)} />
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
      <ButtonIconAdd
        className="mr-2"
        onClick={() => addUser("satyam", { name: "Daniel Barreiro" })}
        label="agregar"
      />
      <ButtonIconDelete onClick={() => deleteUser("satyam")} label="borrar" />
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
