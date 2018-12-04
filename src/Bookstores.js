import React from 'react';
import { ButtonGroup, Table } from 'reactstrap';

import {
  ButtonIconAdd,
  ButtonIconEdit,
  ButtonIconDelete,
  ButtonSet
} from './Icons';

import { useDispatch, useSelector } from './store/hooks';
import { getPdvs, deletePdv, setPdv } from './store/puntosDeVenta/actions';
import { PDVS } from './store/puntosDeVenta/reducer';

function BookstoreRow(codigo, data, delPdv) {
  return (
    <tr key={codigo}>
      <td>{codigo}</td>
      <td>{data.nombre}</td>
      <td>{data.contacto}</td>
      <td style={{ whiteSpace: 'pre-line' }}>{data.direccion}</td>
      <td>{data.localidad}</td>
      <td>{data.telefono}</td>
      <td>{data.email}</td>
      <td>
        <ButtonGroup size="sm">
          <ButtonIconEdit onClick={() => console.log('edit', codigo)} />
          <ButtonIconDelete onClick={() => console.log('delete', codigo)} />
        </ButtonGroup>
      </td>
    </tr>
  );
}

export default function Bookstores() {
  const pdvs = useSelector(PDVS);
  useDispatch(getPdvs, true);
  const delPdv = useDispatch(deletePdv);
  // const { history } = useReactRouter();
  return (
    (pdvs || null) && (
      <>
        <h1>Puntos de Venta</h1>
        <Table striped hover size="sm" responsive>
          <thead>
            <tr>
              <th>Código</th>
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
            {Object.keys(pdvs).map(codigo =>
              BookstoreRow(codigo, pdvs[codigo])
            )}
          </tbody>
        </Table>
        <ButtonSet>
          <ButtonIconAdd
            onClick={() => setPdv('Satyam', { nombre: 'Daniel Barreiro' })}
          >
            Agregar
          </ButtonIconAdd>
          <ButtonIconDelete onClick={() => delPdv('Satyam')}>
            Borrar
          </ButtonIconDelete>
        </ButtonSet>
        <pre>{JSON.stringify(pdvs, null, 2)}</pre>
      </>
    )
  );
}
