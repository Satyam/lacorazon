import React, { useEffect, useState } from 'react';
import { ButtonGroup, Table } from 'reactstrap';
import useReactRouter from 'use-react-router';

import { ButtonIconAdd, ButtonIconEdit, ButtonIconDelete } from './Icons';

import { useDispatch, useSelector } from './store/hooks';
import { getUsers, deleteUser } from './store/users/actions';

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

export default function Users() {
  const doGetThem = useDispatch(getUsers);
  const selUsers = useSelector('users');
  const [users, setUsers] = useState(selUsers());
  useEffect(() => {
    doGetThem().then(() => setUsers(selUsers()));
  }, []);
  const { history } = useReactRouter();
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
