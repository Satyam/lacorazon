import React from 'react';
import { ButtonGroup, Table } from 'reactstrap';
import useReactRouter from 'use-react-router';
import { isEmpty } from './utils';
import { ButtonIconAdd, ButtonIconEdit, ButtonIconDelete } from './Icons';
import Loading from './Loading';
import Page from './Page';

import { useDispatch, useSelector } from './store/hooks';
import { getUsers, deleteUser } from './store/actions';
import { selUsers, selUsersIsLoading, selUsersGotAll } from './store/selectors';

function UserRow({ id, data, history, doDeleteUser }) {
  return (
    <tr key={id}>
      <td>{data.email}</td>
      <td>{data.nombre}</td>
      <td>
        <ButtonGroup size="sm">
          <ButtonIconEdit outline onClick={() => history.push(`/user/${id}`)} />
          <ButtonIconDelete outline onClick={() => doDeleteUser(id)} />
        </ButtonGroup>
      </td>
    </tr>
  );
}

export default function Users() {
  const [users, isLoading, gotAll] = useSelector([
    selUsers,
    selUsersIsLoading,
    selUsersGotAll
  ]);
  const [doGetUsers, doDeleteUser] = useDispatch([getUsers, deleteUser]);
  if (!isLoading && (isEmpty(users) || !gotAll)) {
    doGetUsers();
    return <Loading title="Usuarios" />;
  }

  const { history } = useReactRouter();
  return (
    <Page title="Vendedores" heading="Vendedores">
      <Table striped hover size="sm" responsive>
        <thead>
          <tr>
            <th>Alias</th>
            <th>Nombre</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {Object.keys(users).map(id =>
            UserRow({ id, data: users[id], history, doDeleteUser })
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
    </Page>
  );
}
