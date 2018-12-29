import React, { useContext } from 'react';
import { mount } from 'enzyme';

import { FormikConsumer } from 'formik';

import Form from './Form';
import TextField from './TextField';
import SubmitButton from './SubmitButton';

function useFormik() {
  return useContext(FormikConsumer._context);
}

function Formik() {
  return <pre>{JSON.stringify(useFormik(), null, 2)}</pre>;
}

describe('Form / SubmitButton', () => {
  it('should submit form on pressing SubmitButton', () => {
    const submitHandler = jest.fn();
    const validate = jest.fn(() => ({}));
    const wrapper = mount(
      <Form
        values={{ one: 1 }}
        isInitialValid={true}
        onSubmit={submitHandler}
        validate={validate}
      >
        <Formik />
        <TextField label="one" name="one" />
        <SubmitButton>Submit</SubmitButton>
      </Form>
    );

    expect(wrapper.find('button').prop('disabled')).toBeTruthy();
    wrapper
      .find('input')
      // see:
      // https://github.com/jaredpalmer/formik/blob/f5d76609b222ce583663add279ac76e807e2d0ba/README.md#testing-formik
      .simulate('change', {
        target: { name: 'one', value: '2' }
      });
    // wrapper.find('button').simulate('focus');
    wrapper.update();
    expect(wrapper.find('button').prop('disabled')).toBeFalsy();
    // console.log('before', wrapper.html());
    // expect(wrapper.html()).toBe('');
    // wrapper.find('button').simulate('click', {
    //   preventDefault: () => {} // no op
    // });
    jest.clearAllMocks();
    // debugger;
    wrapper.find('form').simulate('submit', {
      preventDefault: () => {} // no op
    });
    wrapper.update();
    // console.log('after', wrapper.html());
    expect(validate).toBeCalledWith({ one: '2' });
    expect(validate.mock.calls).toEqual([[{ one: '2' }]]);
    expect(validate.mock.results[0].value).toEqual({});
    expect(submitHandler).toBeCalled();
    expect(submitHandler.mock.calls[0][0]).toBeCalledWith({ one: '2' });
  });
});
