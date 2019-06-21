import React from 'react';
import { ButtonGroup } from 'reactstrap';
import { ButtonIconEdit, ButtonIconDelete } from 'Components/Icons';
import styles from './styles.module.css';

export default function RowDistr(id, data, history, deleteDistribuidor) {
  return (
    <tr key={id} onClick={() => history.push(`/distribuidor/${id}`)}>
      <td>{data.nombre}</td>
      <td>{data.contacto}</td>
      <td>{data.telefono}</td>
      <td className={styles.small}>{data.direccion}</td>
      <td>{data.localidad}</td>
      <td className={styles.small}>{(data.email || '').replace('@', '\n@')}</td>
      <td>
        <ButtonGroup size="sm">
          <ButtonIconEdit
            onClick={ev => {
              ev.stopPropagation();
              history.push(`/distribuidor/${id}?edit=true`);
            }}
          />
          <ButtonIconDelete
            onClick={ev => {
              ev.stopPropagation();
              deleteDistribuidor(id);
            }}
          />
        </ButtonGroup>
      </td>
    </tr>
  );
}
