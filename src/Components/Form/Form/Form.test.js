import React from 'react';
import * as Yup from 'yup';
import { render, fireEvent, cleanup } from 'react-testing-library';

import Form from '.';
import TextField from '../TextField';
import SubmitButton from '../SubmitButton';

afterEach(cleanup);

function TestForm(props) {
  return (
    <Form values={{ one: 1 }} isInitialValid={true} {...props}>
      <TextField label="one" name="one" />
      <SubmitButton>Submit</SubmitButton>
    </Form>
  );
}
describe('Form / Form', () => {
  describe('with no validationSchema', () => {
    it('should submit form', done => {
      const submitHandler = jest.fn();
      const validate = jest.fn(() => ({}));
      const { getByText, getByLabelText } = render(
        <TestForm onSubmit={submitHandler} validate={validate} />
      );
      expect(getByText('Submit')).toBeDisabled();

      fireEvent.change(getByLabelText('one'), {
        target: { name: 'one', value: '2' },
      });
      expect(getByText('Submit')).not.toBeDisabled();
      jest.clearAllMocks();
      fireEvent.click(getByText('Submit'));

      expect(validate).toBeCalledWith({ one: '2' });
      expect(validate.mock.calls).toEqual([[{ one: '2' }]]);
      expect(validate.mock.results[0].value).toEqual({});
      // validation is always async, so we have to wait for it
      setImmediate(() => {
        expect(submitHandler).toBeCalled();
        expect(submitHandler.mock.calls[0][0]).toEqual({ one: '2' });
        done();
      });
    });

    it('should not submit form on validation error', done => {
      const submitHandler = jest.fn();
      const validate = jest.fn(() => ({ one: 'some error' }));
      const { getByText, getByLabelText } = render(
        <TestForm onSubmit={submitHandler} validate={validate} />
      );

      expect(getByText('Submit')).toBeDisabled();

      fireEvent.change(getByLabelText('one'), {
        target: { name: 'one', value: '2' },
      });
      expect(getByText('Submit')).not.toBeDisabled();

      jest.clearAllMocks();
      fireEvent.click(getByText('Submit'));

      expect(validate).toBeCalledWith({ one: '2' });
      expect(validate.mock.calls).toEqual([[{ one: '2' }]]);
      expect(validate.mock.results[0].value).toEqual({ one: 'some error' });
      // validation is always async, so we have to wait for it
      // however, since it fails, it is not going to happen
      setImmediate(() => {
        expect(getByText('Submit')).toBeDisabled();
        expect(submitHandler).not.toBeCalled();
        done();
      });
    });
    it('should submit form asynchronously (with Promise)', done => {
      const submitHandler = jest.fn(() => Promise.resolve());
      const validate = jest.fn(() => ({}));
      const { getByText, getByLabelText } = render(
        <TestForm onSubmit={submitHandler} validate={validate} />
      );

      expect(getByText('Submit')).toBeDisabled();
      fireEvent.change(getByLabelText('one'), {
        target: { name: 'one', value: '2' },
      });
      expect(getByText('Submit')).not.toBeDisabled();
      jest.clearAllMocks();
      fireEvent.click(getByText('Submit'));

      expect(validate).toBeCalledWith({ one: '2' });
      expect(validate.mock.calls).toEqual([[{ one: '2' }]]);
      expect(validate.mock.results[0].value).toEqual({});
      // validation is always async, so we have to wait for it
      setImmediate(() => {
        expect(submitHandler).toBeCalled();
        expect(submitHandler.mock.calls[0][0]).toEqual({ one: '2' });
        done();
      });
    });
  });
  describe('with validation schema', () => {
    const schema = Yup.object().shape({
      one: Yup.number()
        .integer()
        .truncate()
        .default(99),
    });
    it('should submit form', done => {
      const submitHandler = jest.fn();
      const { getByText, getByLabelText } = render(
        <TestForm onSubmit={submitHandler} schema={schema} />
      );
      expect(getByText('Submit')).toBeDisabled();
      fireEvent.change(getByLabelText('one'), {
        target: { name: 'one', value: '2.5' },
      });
      expect(getByText('Submit')).not.toBeDisabled();
      jest.clearAllMocks();
      fireEvent.click(getByText('Submit'));

      // validation is always async, so we have to wait for it
      setImmediate(() => {
        expect(submitHandler).toBeCalled();
        // Notice value '2.5' is cast to number and truncated to an integer: 2
        expect(submitHandler.mock.calls[0][0]).toEqual({ one: 2 });
        done();
      });
    });
    it('should take default values from schema', () => {
      const { getByText, getByLabelText } = render(
        <Form schema={schema}>
          <TextField label="one" name="one" />
          <SubmitButton>Submit</SubmitButton>
        </Form>
      );
      expect(Number(getByLabelText('one').value)).toBe(99);

      expect(getByText('Submit')).toBeDisabled();
    });
  });
});
