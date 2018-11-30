import React, { useContext } from 'react';
import { ButtonGroup, Table } from 'reactstrap';
import useReactRouter from 'use-react-router';

import { UsersProvider, UsersContext, deleteUser } from './context/users';
import { ButtonIconAdd, ButtonIconEdit, ButtonIconDelete } from './Icons';

function UserRow({ id, data, history }) {
  return (
    <tr key={id}>
      <td>{id}</td>
      <td>{data.alias}</td>
      <td>{data.name}</td>
      <td>
        <ButtonGroup size="sm">
          <ButtonIconEdit outline onClick={() => history.push(`/user/${id}`)} />
          <ButtonIconDelete outline onClick={() => deleteUser(id)} />
        </ButtonGroup>
      </td>
    </tr>
  );
}

function UsersTable() {
  const { users, error } = useContext(UsersContext);
  const { history } = useReactRouter();
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
        outline
        onClick={() => {
          history.push(`/user`);
        }}
        label="Agregar"
      >
        Agregar
      </ButtonIconAdd>
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
