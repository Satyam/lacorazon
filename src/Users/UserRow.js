import React from 'react';
import { ButtonGroup } from 'reactstrap';
import { ButtonIconEdit, ButtonIconDelete } from '../Icons';

export default function UserRow({ id, data, history, deleteUser }) {
  return (
    <tr key={id}>
      <td>{data.email}</td>
      <td>{data.nombre}</td>
      <td>
        <ButtonGroup size="sm">
          <ButtonIconEdit outline onClick={() => history.push(`/user/${id}`)} />
          <ButtonIconDelete outline onClick={() => deleteUser(id)} />
        </ButtonGroup>
      </td>
    </tr>
  );
}
