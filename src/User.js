import React, { useContext } from 'react';
import { Form, FormGroup, Label, Input, FormFeedback, Alert } from 'reactstrap';
import { Formik, Form as KForm, Field as KField, ErrorMessage } from 'formik';
import useReactRouter from 'use-react-router';

import {
  UserProvider,
  UserContext,
  addUser,
  deleteUser,
  userExists,
  userSchema
} from './context/users';
import { ButtonIconAdd, ButtonIconDelete } from './Icons';

function UserForm({ id }) {
  const { user, error } = useContext(UserContext);
  const { history } = useReactRouter();
  if (error) {
    throw new Error(error); // send if to the error boundary
  }

  return (
    <>
      <h1>Add/Edit Vendedor</h1>
      <Formik
        initialValues={Object.assign(userSchema.default(), user)}
        enableReinitialize={true}
        isInitialValid={true}
        onSubmit={(values, { setFieldError }) => {
          const castValues = userSchema.cast(values);
          addUser(castValues)
            .then(() => {
              history.replace(`/user/${castValues.id}`);
            })
            .catch(err => {
              setFieldError('*', err);
            });
        }}
        validationSchema={userSchema}
      >
        {({ isSubmitting, isValid, errors, touched }) => (
          <Form tag={KForm}>
            {errors['*'] && <Alert color="danger">{errors['*']}</Alert>}
            <FormGroup>
              <Label for="id">Código</Label>
              <Input
                tag={KField}
                type="text"
                name="id"
                id="id"
                invalid={errors.id && touched.id}
                disabled={!!id}
                validate={value => (id ? '' : userExists(value))}
              />

              <FormFeedback>
                {(errors.id && errors.id.message) || errors.id}
              </FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label for="alias">Alias</Label>
              <Input
                tag={KField}
                type="text"
                name="alias"
                id="alias"
                invalid={errors.alias && touched.alias}
              />
              <ErrorMessage name="alias" component={FormFeedback} />
            </FormGroup>
            <FormGroup>
              <Label for="name">Nombre</Label>
              <Input
                tag={KField}
                type="text"
                name="name"
                id="name"
                invalid={errors.name && touched.name}
              />
              <ErrorMessage name="name" component={FormFeedback} />
            </FormGroup>
            <ButtonIconAdd
              type="submit"
              disabled={isSubmitting || !isValid}
              className="mr-2"
              label={id ? 'Modificar' : 'Agregar'}
            />
            <ButtonIconDelete
              disabled={!id}
              onClick={() => {
                deleteUser(id).then(() => history.replace('/users'));
              }}
              label="borrar"
            />
          </Form>
        )}
      </Formik>
    </>
  );
}

export default function User({ match }) {
  return (
    <UserProvider id={match.params.id}>
      <UserForm id={match.params.id} />
    </UserProvider>
  );
}
