import React from 'react';
import { render, fireEvent, cleanup } from 'react-testing-library';

import Form from '../Form';
import TextField from '../TextField';
import SubmitButton from '.';

afterEach(cleanup);

function TestForm(props) {
  return (
    <Form values={{ one: 1 }} isInitialValid={true} {...props}>
      <TextField label="one" name="one" />
      <SubmitButton>Submit</SubmitButton>
    </Form>
  );
}

describe('Form / SubmitButton', () => {
  it('on a pristine form, it should be disabled', () => {
    const { getByText } = render(<TestForm />);
    expect(getByText('Submit')).toBeDisabled();
  });
  it('when a field is changed, it should be enabled', () => {
    const { getByText, getByLabelText } = render(<TestForm />);
    expect(getByText('Submit')).toBeDisabled();
    fireEvent.change(getByLabelText('one'), {
      target: { name: 'one', value: '2' },
    });
    expect(getByText('Submit')).not.toBeDisabled();
  });
  it('when a field is changed to an invalid value, it should be disabled', done => {
    const validate = jest.fn(() => 'some error');
    const { getByText, getByLabelText } = render(
      <Form values={{ one: 1 }} isInitialValid={true}>
        <TextField label="one" name="one" validate={validate} />
        <SubmitButton>Submit</SubmitButton>
      </Form>
    );
    expect(getByText('Submit')).toBeDisabled();
    fireEvent.change(getByLabelText('one'), {
      target: { name: 'one', value: '2' },
    });
    // Validation is always Promise-based so it is asynchronous
    // we have to wait for it to happen
    setImmediate(() => {
      expect(validate).toBeCalledWith('2');
      expect(validate.mock.results[0].value).toEqual('some error');
      expect(getByText('Submit')).toBeDisabled();
      done();
    });
  });
});
