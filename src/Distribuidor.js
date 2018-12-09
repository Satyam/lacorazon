import React, { useState } from 'react';
import { Form, TextField, SubmitButton } from './Form';
import useReactRouter from 'use-react-router';
import { Alert } from 'reactstrap';

import { isEmpty } from './utils';
import Loading from './Loading';
import {
  getDistribuidor,
  setDistribuidor,
  deleteDistribuidor,
  distribuidorExists
} from './store/actions';

import { selDistribuidor, selDistribuidoresIsLoading } from './store/selectors';

import { useDispatch, useSelector } from './store/hooks';
import distribuidorSchema from './store/distribuidores/schema';
import { ButtonIconAdd, ButtonIconDelete, ButtonSet } from './Icons';

export default function Distribuidor({ match }) {
  const id = match.params.id;
  const { history } = useReactRouter();
  const [distribuidor, isLoading] = useSelector(
    [selDistribuidor, selDistribuidoresIsLoading],
    id
  );
  const [
    doGetDistribuidor,
    doSetDistribuidor,
    doDeleteDistribuidor
  ] = useDispatch([getDistribuidor, setDistribuidor, deleteDistribuidor]);
  const [notFound, setNotFound] = useState(false);
  if (notFound) {
    return (
      <Alert color="danger">El distribuidor no existe o fue borrado</Alert>
    );
  } else if (id) {
    if (!isLoading && isEmpty(distribuidor)) {
      doGetDistribuidor(id).then(action => {
        if (!action.response) setNotFound(true);
      });
      return <Loading title="Distribuidor" />;
    }
  }

  return (
    <>
      <h1>{id ? 'Edit' : 'Add'} Distribuidor</h1>
      <Form
        values={distribuidor}
        onSubmit={(values, { setFieldError }) =>
          doSetDistribuidor(values)
            .then(() => {
              history.replace(`/distribuidor/${values.id}`);
            })
            .catch(err => {
              setFieldError('*', err);
            })
        }
        schema={distribuidorSchema}
      >
        <TextField
          name="id"
          label="Código"
          disabled={!!id}
          validate={value =>
            id
              ? ''
              : distribuidorExists(value).then(exists => {
                  if (exists) {
                    // eslint-disable-next-line no-throw-literal
                    throw `Código de usuario [${value}] ya existe`;
                  }
                })
          }
        />
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
              doDeleteDistribuidor(id).then(() =>
                history.replace('/distribuidores')
              );
            }}
          >
            Borrar
          </ButtonIconDelete>
        </ButtonSet>
      </Form>
    </>
  );
}
