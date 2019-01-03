import React, { useContext } from 'react';
import { Button } from 'reactstrap';
import { FormikConsumer } from 'formik';

function useFormik() {
  return useContext(FormikConsumer._context);
}

export default function SubmitButton({
  component: Component = Button,
  ...rest
}) {
  const { isSubmitting, isValid, dirty } = useFormik();
  return (
    <Component
      type="submit"
      disabled={isSubmitting || !isValid || !dirty}
      {...rest}
    />
  );
}
