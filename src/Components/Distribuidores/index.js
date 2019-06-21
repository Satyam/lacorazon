import React from 'react';
import { Table } from 'reactstrap';
import useReactRouter from 'use-react-router';
import { ButtonIconAdd } from 'Components/Icons';

import { useDispatch } from 'react-redux';
import { useSel } from 'Store/useSel';
import { isEmpty } from 'Shared/utils';
import Loading from 'Components/Loading';
import Page from 'Components/Page';
import RowDistr from './RowDistr';
import { acGetDistribuidores, acDeleteDistribuidor } from 'Store/actions';

import {
  selDistribuidores,
  selDistribuidoresIsLoading,
  selDistribuidoresGotAll,
} from 'Store/selectors';

export default function Distribuidores() {
  const distribuidores = useSel(selDistribuidores);
  const isLoading = useSel(selDistribuidoresIsLoading);
  const gotAll = useSel(selDistribuidoresGotAll);
  const dispatch = useDispatch();
  const { history } = useReactRouter();
  if (!isLoading && (isEmpty(distribuidores) || !gotAll)) {
    dispatch(acGetDistribuidores());
    return <Loading title="Distribuidores" />;
  }
  const deleteDistribuidor = id => dispatch(acDeleteDistribuidor(id));
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
