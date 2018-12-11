import React from 'react';
import { Table } from 'reactstrap';
import useReactRouter from 'use-react-router';
import { isEmpty } from '../utils';

import { ButtonIconAdd } from '../Icons';
import Loading from '../Loading';
import Page from '../Page';
import UserRow from './UserRow';

import { useDispatch, useSelector } from '../store/hooks';
import { acGetUsers, acDeleteUser } from '../store/actions';
import {
  selUsers,
  selUsersIsLoading,
  selUsersGotAll
} from '../store/selectors';

export default function Users() {
  const [users, isLoading, gotAll] = useSelector([
    selUsers,
    selUsersIsLoading,
    selUsersGotAll
  ]);
  const [getUsers, deleteUser] = useDispatch([acGetUsers, acDeleteUser]);
  if (!isLoading && (isEmpty(users) || !gotAll)) {
    getUsers();
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
            UserRow({ id, data: users[id], history, deleteUser })
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
