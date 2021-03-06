import React from 'react';
import { Form, TextField, SubmitButton } from 'Components/Form';
import useReactRouter from 'use-react-router';
import {
  acAddDistribuidor,
  acUpdateDistribuidor,
  acDeleteDistribuidor,
} from 'Store/actions';

import { useDispatch } from 'react-redux';
import distribuidorSchema from 'Store/distribuidores/schema';
import { ButtonIconAdd, ButtonIconDelete, ButtonSet } from 'Components/Icons';
import Page from 'Components/Page';

export default function EditDistribuidor({ id, distribuidor }) {
  const { history } = useReactRouter();
  const dispatch = useDispatch();
  return (
    <Page
      title={`Distribuidor - ${distribuidor ? distribuidor.nombre : 'nuevo'}`}
      heading={`${id ? 'Edit' : 'Add'} Distribuidor`}
    >
      <Form
        values={distribuidor}
        onSubmit={(values, { setFieldError }) =>
          (id
            ? dispatch(acUpdateDistribuidor)(id, values)
            : dispatch(acAddDistribuidor)(values)
          ).then(({ response }) => {
            history.replace(`/distribuidor/${response.id}?edit=true`);
          })
        }
        schema={distribuidorSchema}
      >
        <TextField name="nombre" label="Nombre" />
        <TextField name="email" label="eMail" />
        <TextField name="localidad" label="Localidad" />
        <TextField name="contacto" label="Contacto" />
        <TextField name="telefono" label="Teléfono" />
        <TextField name="direccion" label="Dirección" rows={5} />
        <ButtonSet>
          <SubmitButton component={ButtonIconAdd}>
            {id ? 'Modificar' : 'Agregar'}
          </SubmitButton>
          <ButtonIconDelete
            disabled={!id}
            onClick={() => {
              dispatch(acDeleteDistribuidor(id)).then(() =>
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
