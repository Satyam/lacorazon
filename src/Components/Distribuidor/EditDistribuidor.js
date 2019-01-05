import React from 'react';
import { Form, TextField, SubmitButton } from '../Form';
import useReactRouter from 'use-react-router';
import {
  acAddDistribuidor,
  acUpdateDistribuidor,
  acDeleteDistribuidor
} from '../../store/actions';

import { useDispatch } from '../../store/hooks';
import distribuidorSchema from '../../store/distribuidores/schema';
import { ButtonIconAdd, ButtonIconDelete, ButtonSet } from '../Icons';
import Page from '../Page';

export default function EditDistribuidor({ id, distribuidor }) {
  const { history } = useReactRouter();
  const [addDistribuidor, updateDistribuidor, deleteDistribuidor] = useDispatch(
    [acAddDistribuidor, acUpdateDistribuidor, acDeleteDistribuidor]
  );
  return (
    <Page
      title={`Distribuidor - ${distribuidor ? distribuidor.nombre : 'nuevo'}`}
      heading={`${id ? 'Edit' : 'Add'} Distribuidor`}
    >
      <Form
        values={distribuidor}
        onSubmit={(values, { setFieldError }) =>
          (id ? updateDistribuidor(id, values) : addDistribuidor(values)).then(
            ({ response }) => {
              history.replace(`/distribuidor/${response.id}?edit=true`);
            }
          )
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
