import React from 'react';
import { Form, TextField, SubmitButton } from './Form';
import useReactRouter from 'use-react-router';

import { isEmpty } from './utils';
import Loading from './Loading';
import { getUser, setUser, deleteUser, userExists } from './store/actions';

import { selUser } from './store/selectors';

import { useDispatch, useSelector } from './store/hooks';
import userSchema from './store/users/schema';
import { ButtonIconAdd, ButtonIconDelete, ButtonSet } from './Icons';

export default function User({ match }) {
  const id = match.params.id;
  const user = useSelector(selUser, true)(id);
  const [doGetUser, doSetUser, doDeleteUser] = useDispatch([
    getUser,
    setUser,
    deleteUser
  ]);
  if (id && isEmpty(user)) {
    doGetUser(id);
    return <Loading title="Usuario" />;
  }
  const { history } = useReactRouter();

  return (
    <>
      <h1>{id ? 'Edit' : 'Add'} Vendedor</h1>
      <Form
        values={user}
        onSubmit={(values, { setFieldError }) =>
          doSetUser(values)
            .then(() => {
              history.replace(`/user/${values.id}`);
            })
            .catch(err => {
              setFieldError('*', err);
            })
        }
        schema={userSchema}
      >
        <TextField
          name="id"
          label="Código"
          disabled={!!id}
          validate={value =>
            id
              ? ''
              : userExists(value).then(exists => {
                  if (exists) {
                    // eslint-disable-next-line no-throw-literal
                    throw `Código de usuario [${value}] ya existe`;
                  }
                })
          }
        />
        <TextField name="email" label="eMail" />
        <TextField name="nombre" label="Nombre" />
        <ButtonSet>
          <SubmitButton component={ButtonIconAdd}>
            {id ? 'Modificar' : 'Agregar'}
          </SubmitButton>
          <ButtonIconDelete
            disabled={!id}
            onClick={() => {
              doDeleteUser(id).then(() => history.replace('/users'));
            }}
          >
            Borrar
          </ButtonIconDelete>
        </ButtonSet>
      </Form>
    </>
  );
}
