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

import { acGetDistribuidores, acDeleteDistribuidor } from './store/actions';

import {
  selDistribuidores,
  selDistribuidoresIsLoading,
  selDistribuidoresGotAll
} from './store/selectors';

function Distribuidor(id, data, history, deleteDistribuidor) {
  return (
    <tr key={id} onClick={() => history.push(`/distribuidor/${id}`)}>
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

export default function Distribuidores() {
  const [distribuidores, isLoading, gotAll] = useSelector([
    selDistribuidores,
    selDistribuidoresIsLoading,
    selDistribuidoresGotAll
  ]);
  const [getDistrib, deleteDistribuidor] = useDispatch([
    acGetDistribuidores,
    acDeleteDistribuidor
  ]);
  if ((!isLoading && isEmpty(distribuidores)) || !gotAll) {
    getDistrib();
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
            Distribuidor(id, distribuidores[id], history, deleteDistribuidor)
          )}
        </tbody>
      </Table>
      <ButtonSet>
        <ButtonIconAdd onClick={() => history.push('/distribuidor?edit=true')}>
          Agregar
        </ButtonIconAdd>
      </ButtonSet>
    </Page>
  );
}
