import React from 'react';
import { Table } from 'reactstrap';
import useReactRouter from 'use-react-router';
import { isEmpty } from 'Shared/utils';

import { ButtonIconAdd } from 'Components/Icons';
import Loading from 'Components/Loading';
import Page from 'Components/Page';
import UserRow from './UserRow';

import { useDispatch } from 'react-redux';
import { useSel } from 'Store/useSel';
import { acGetUsers, acDeleteUser } from 'Store/actions';
import { selUsers, selUsersIsLoading, selUsersGotAll } from 'Store/selectors';

export default function Users() {
  const users = useSel(selUsers);
  const isLoading = useSel(selUsersIsLoading);
  const gotAll = useSel(selUsersGotAll);
  const dispatch = useDispatch();
  const { history } = useReactRouter();
  if (!isLoading && (isEmpty(users) || !gotAll)) {
    dispatch(acGetUsers());
    return <Loading title="Usuarios" />;
  }
  const deleteUser = id => dispatch(acDeleteUser(id));

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
            UserRow({
              id,
              data: users[id],
              history,
              deleteUser,
            })
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
