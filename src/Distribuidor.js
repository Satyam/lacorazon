import React, { useState } from 'react';
import { Form, TextField, SubmitButton } from './Form';
import useReactRouter from 'use-react-router';
import { Alert } from 'reactstrap';

import { isEmpty } from './utils';
import Loading from './Loading';
import {
  acGetDistribuidor,
  acAddDistribuidor,
  acUpdateDistribuidor,
  acDeleteDistribuidor
} from './store/actions';

import { selDistribuidor, selDistribuidoresIsLoading } from './store/selectors';

import { useDispatch, useSelector } from './store/hooks';
import distribuidorSchema from './store/distribuidores/schema';
import { ButtonIconAdd, ButtonIconDelete, ButtonSet } from './Icons';
import Page from './Page';

export default function Distribuidor({ match }) {
  const id = match.params.id;
  const { history } = useReactRouter();
  const [distribuidor, isLoading] = useSelector(
    [selDistribuidor, selDistribuidoresIsLoading],
    id
  );
  const [
    getDistribuidor,
    addDistribuidor,
    updateDistribuidor,
    deleteDistribuidor
  ] = useDispatch([
    acGetDistribuidor,
    acAddDistribuidor,
    acUpdateDistribuidor,
    acDeleteDistribuidor
  ]);
  const [notFound, setNotFound] = useState(false);
  if (notFound) {
    return (
      <Alert color="danger">El distribuidor no existe o fue borrado</Alert>
    );
  } else if (id) {
    if (!isLoading && isEmpty(distribuidor)) {
      getDistribuidor(id).then(action => {
        if (!action.response) setNotFound(true);
      });
      return <Loading title="Distribuidor" />;
    }
  }

  return (
    <Page
      title={`Distribuidor - ${distribuidor ? distribuidor.nombre : 'nuevo'}`}
      heading={`${id ? 'Edit' : 'Add'} Distribuidor`}
    >
      <Form
        values={distribuidor}
        onSubmit={(values, { setFieldError }) =>
          (id ? updateDistribuidor(id, values) : addDistribuidor(values))
            .then(({ response }) => {
              history.replace(`/distribuidor/${response.id}`);
            })
            .catch(err => {
              setFieldError('*', err);
            })
        }
        schema={distribuidorSchema}
      >
        <TextField name="email" label="eMail" />
        <TextField name="nombre" label="Nombre" />
        <TextField name="entregados" label="entregados" />
        <TextField name="existencias" label="existencias" />
        <TextField name="localidad" label="localidad" />
        <TextField name="contacto" label="contacto" />
        <TextField name="telefono" label="telefono" />
        <TextField name="direccion" label="direccion" rows={5} />
        <ButtonSet>
          <SubmitButton component={ButtonIconAdd}>
            {id ? 'Modificar' : 'Agregar'}
          </SubmitButton>
          <ButtonIconDelete
            disabled={!id}
            onClick={() => {
              deleteDistribuidor(id).then(() =>
                history.replace('/distribuidores')
              );
            }}
          >
            Borrar
          </ButtonIconDelete>
        </ButtonSet>
      </Form>
    </Page>
  );
}
