import React, { useContext } from "react";
import { UsersProvider, UsersContext } from "./context/users";
import { ButtonIconAdd, ButtonIconEdit, ButtonIconDelete } from "./Icons";
import { ButtonGroup, Table } from "reactstrap";
import { withRouter } from "react-router-dom";

function UserRow({ id, data, history }) {
  return (
    <tr key={id}>
      <td>{id}</td>
      <td>{data.alias}</td>
      <td>{data.name}</td>
      <td>
        <ButtonGroup size="sm">
          <ButtonIconEdit outline onClick={() => history.push(`/user/${id}`)} />
          <ButtonIconDelete outline onClick={() => console.log("delete", id)} />
        </ButtonGroup>
      </td>
    </tr>
  );
}
const UsersTable = withRouter(({ history }) => {
  const { users, error } = useContext(UsersContext);
  if (error) {
    throw new Error(error); // send if to the error boundary
  }
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
        <tbody>
          {Object.keys(users).map(id =>
            UserRow({ id, data: users[id], history })
          )}
        </tbody>
      </Table>
      <ButtonIconAdd
        className="mr-2"
        outline
        onClick={() => {
          history.push(`/user`);
        }}
        label="agregar"
      />
      <pre>{JSON.stringify(users, null, 2)}</pre>
    </>
  );
});
export default function Users() {
  return (
    <UsersProvider>
      <UsersTable />
    </UsersProvider>
  );
}
