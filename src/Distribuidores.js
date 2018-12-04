import React from 'react';
import { ButtonGroup, Table } from 'reactstrap';

import {
  ButtonIconAdd,
  ButtonIconEdit,
  ButtonIconDelete,
  ButtonSet
} from './Icons';

import { useDispatch, useSelector } from './store/hooks';
import {
  getDistribuidores,
  deleteDistribuidor,
  setDistribuidor
} from './store/distribuidores/actions';
import { DISTRIBUIDORES } from './store/distribuidores/reducer';

function Distribuidor(id, data, delDistribuidor) {
  return (
    <tr key={id}>
      <td>{id}</td>
      <td>{data.nombre}</td>
      <td>{data.contacto}</td>
      <td style={{ whiteSpace: 'pre-line' }}>{data.direccion}</td>
      <td>{data.localidad}</td>
      <td>{data.telefono}</td>
      <td>{data.email}</td>
      <td>
        <ButtonGroup size="sm">
          <ButtonIconEdit onClick={() => console.log('edit', id)} />
          <ButtonIconDelete onClick={() => console.log('delete', id)} />
        </ButtonGroup>
      </td>
    </tr>
  );
}

export default function Distribuidores() {
  const distribuidores = useSelector(DISTRIBUIDORES);
  useDispatch(getDistribuidores, true);
  const delDistribuidor = useDispatch(deleteDistribuidor);
  // const { history } = useReactRouter();
  return (
    (distribuidores || null) && (
      <>
        <h1>Puntos de Venta</h1>
        <Table striped hover size="sm" responsive>
          <thead>
            <tr>
              <th>Id</th>
              <th>Nombre</th>
              <th>Contacto</th>
              <th>Dirección</th>
              <th>Localidad</th>
              <th>Teléfono</th>
              <th>e-Mail</th>

              <th />
            </tr>
          </thead>
          <tbody>
            {Object.keys(distribuidores).map(id =>
              Distribuidor(id, distribuidores[id])
            )}
          </tbody>
        </Table>
        <ButtonSet>
          <ButtonIconAdd
            onClick={() =>
              setDistribuidor('Satyam', { nombre: 'Daniel Barreiro' })
            }
          >
            Agregar
          </ButtonIconAdd>
          <ButtonIconDelete onClick={() => delDistribuidor('Satyam')}>
            Borrar
          </ButtonIconDelete>
        </ButtonSet>
        <pre>{JSON.stringify(distribuidores, null, 2)}</pre>
      </>
    )
  );
}
