import React from 'react';
import { ButtonGroup, Table } from 'reactstrap';
import useReactRouter from 'use-react-router';

import { ButtonIconAdd, ButtonIconEdit, ButtonIconDelete } from './Icons';

import { useDispatch, useSelector } from './store/hooks';
import { getUsers, deleteUser } from './store/users/actions';
import { USERS } from './store/users/reducer';

function UserRow({ id, data, history, delUser }) {
  return (
    <tr key={id}>
      <td>{id}</td>
      <td>{data.alias}</td>
      <td>{data.name}</td>
      <td>
        <ButtonGroup size="sm">
          <ButtonIconEdit outline onClick={() => history.push(`/user/${id}`)} />
          <ButtonIconDelete outline onClick={() => delUser(id)} />
        </ButtonGroup>
      </td>
    </tr>
  );
}

export default function Users() {
  const users = useSelector(USERS);
  useDispatch(getUsers, true);
  const delUser = useDispatch(deleteUser);
  const { history } = useReactRouter();
  return (
    (users || null) && (
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
              UserRow({ id, data: users[id], history, delUser })
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
    )
  );
}
