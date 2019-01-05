import React from 'react';
import { ButtonGroup } from 'reactstrap';
import { ButtonIconEdit, ButtonIconDelete } from '../Icons';

export default function UserRow({ id, data, history, deleteUser }) {
  return (
    <tr key={id} onClick={() => history.push(`/user/${id}`)}>
      <td>{data.email}</td>
      <td>{data.nombre}</td>
      <td>
        <ButtonGroup size="sm">
          <ButtonIconEdit
            outline
            onClick={ev => {
              ev.stopPropagation();
              history.push(`/user/${id}?edit=true`);
            }}
          />
          <ButtonIconDelete
            outline
            onClick={ev => {
              ev.stopPropagation();
              deleteUser(id);
            }}
          />
        </ButtonGroup>
      </td>
    </tr>
  );
}
