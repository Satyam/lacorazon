import React from 'react';
import { ButtonGroup, Table } from 'reactstrap';
import useReactRouter from 'use-react-router';
import { isEmpty } from './utils';
import { ButtonIconAdd, ButtonIconEdit, ButtonIconDelete } from './Icons';
import Loading from './Loading';
import { useDispatch, useSelector } from './store/hooks';
import { getUsers, deleteUser } from './store/actions';
import { NAME as USERS } from './store/users/constants';

function UserRow({ id, data, history, doDeleteUser }) {
  return (
    <tr key={id}>
      <td>{id}</td>
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
  const users = useSelector(USERS, true)();
  const [doGetUsers, doDeleteUser] = useDispatch([getUsers, deleteUser]);
  if (isEmpty(users) || !users.$$gotAll) {
    doGetUsers();
    return <Loading title="Usuarios" />;
  }

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
            id.startsWith('$$')
              ? null
              : UserRow({ id, data: users[id], history, doDeleteUser })
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
