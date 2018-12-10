import React from 'react';
import { ButtonGroup, Table } from 'reactstrap';
import useReactRouter from 'use-react-router';
import {
  ButtonIconAdd,
  ButtonIconEdit,
  ButtonIconDelete,
  ButtonSet
} from './Icons';

import { useDispatch, useSelector } from './store/hooks';
import { isEmpty } from './utils';
import Loading from './Loading';
import Page from './Page';

import { getDistribuidores, deleteDistribuidor } from './store/actions';

import {
  selDistribuidores,
  selDistribuidoresIsLoading,
  selDistribuidoresGotAll
} from './store/selectors';

function Distribuidor(id, data, history, doDeleteDistribuidor) {
  return (
    <tr key={id}>
      <td>{data.nombre}</td>
      <td>{data.contacto}</td>
      <td>{data.telefono}</td>
      <td style={{ whiteSpace: 'pre-line', fontSize: 'small' }}>
        {data.direccion}
      </td>
      <td>{data.localidad}</td>
      <td style={{ whiteSpace: 'pre-line', fontSize: 'small' }}>
        {(data.email || '').replace('@', '\n@')}
      </td>
      <td>
        <ButtonGroup size="sm">
          <ButtonIconEdit onClick={() => history.push(`/distribuidor/${id}`)} />
          <ButtonIconDelete onClick={() => doDeleteDistribuidor(id)} />
        </ButtonGroup>
      </td>
    </tr>
  );
}

export default function Distribuidores() {
  const [distribuidores, isLoading, gotAll] = useSelector([
    selDistribuidores,
    selDistribuidoresIsLoading,
    selDistribuidoresGotAll
  ]);
  const [doGetDistrib, doDeleteDistribuidor] = useDispatch([
    getDistribuidores,
    deleteDistribuidor
  ]);
  if ((!isLoading && isEmpty(distribuidores)) || !gotAll) {
    doGetDistrib();
    return <Loading title="Distribuidores" />;
  }
  const { history } = useReactRouter();
  return (
    <Page wide title="Distribuidores" heading="Distribuidores">
      <Table striped hover size="sm" responsive>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Contacto</th>
            <th>Teléfono</th>
            <th>Dirección</th>
            <th>Localidad</th>
            <th>e-Mail</th>

            <th />
          </tr>
        </thead>
        <tbody>
          {Object.keys(distribuidores).map(id =>
            Distribuidor(id, distribuidores[id], history, doDeleteDistribuidor)
          )}
        </tbody>
      </Table>
      <ButtonSet>
        <ButtonIconAdd onClick={() => history.push('/distribuidor')}>
          Agregar
        </ButtonIconAdd>
      </ButtonSet>
    </Page>
  );
}
