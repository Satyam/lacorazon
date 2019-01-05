import React from 'react';
import { Table } from 'reactstrap';
import useReactRouter from 'use-react-router';
import { ButtonIconAdd } from '../Icons';

import { useDispatch, useSelector } from '../../store/hooks';
import { isEmpty } from '../../utils';
import Loading from '../Loading';
import Page from '../Page';
import RowDistr from './RowDistr';
import { acGetDistribuidores, acDeleteDistribuidor } from '../../store/actions';

import {
  selDistribuidores,
  selDistribuidoresIsLoading,
  selDistribuidoresGotAll
} from '../../store/selectors';

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
            RowDistr(id, distribuidores[id], history, deleteDistribuidor)
          )}
        </tbody>
      </Table>
      <ButtonIconAdd onClick={() => history.push('/distribuidor?edit=true')}>
        Agregar
      </ButtonIconAdd>
    </Page>
  );
}
