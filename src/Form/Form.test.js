import React from 'react';
import { mount } from 'enzyme';

import Form from './Form';
import TextField from './TextField';
import SubmitButton from './SubmitButton';

describe('Form / Form', () => {
  it('should submit form', done => {
    const submitHandler = jest.fn();
    const validate = jest.fn(() => ({}));
    const wrapper = mount(
      <Form
        values={{ one: 1 }}
        isInitialValid={true}
        onSubmit={submitHandler}
        validate={validate}
      >
        <TextField label="one" name="one" />
        <SubmitButton>Submit</SubmitButton>
      </Form>
    );

    expect(wrapper.find('button').prop('disabled')).toBeTruthy();
    wrapper.find('input').simulate('change', {
      target: { name: 'one', value: '2' }
    });
    wrapper.update();
    expect(wrapper.find('button').prop('disabled')).toBeFalsy();
    jest.clearAllMocks();
    wrapper.find('form').simulate('submit');

    wrapper.update();
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
    const wrapper = mount(
      <Form
        values={{ one: 1 }}
        isInitialValid={true}
        onSubmit={submitHandler}
        validate={validate}
      >
        <TextField label="one" name="one" />
        <SubmitButton>Submit</SubmitButton>
      </Form>
    );

    expect(wrapper.find('button').prop('disabled')).toBeTruthy();
    wrapper.find('input').simulate('change', {
      target: { name: 'one', value: '2' }
    });
    wrapper.update();
    // validation is async so at this point, it won't know
    // it can yet submit
    expect(wrapper.find('button').prop('disabled')).toBeFalsy();
    jest.clearAllMocks();
    wrapper.find('form').simulate('submit');

    wrapper.update();
    expect(validate).toBeCalledWith({ one: '2' });
    expect(validate.mock.calls).toEqual([[{ one: '2' }]]);
    expect(validate.mock.results[0].value).toEqual({ one: 'some error' });
    // validation is always async, so we have to wait for it
    // however, since it fails, it is not going to happen
    setImmediate(() => {
      expect(wrapper.find('button').prop('disabled')).toBeTruthy();
      expect(submitHandler).not.toBeCalled();
      done();
    });
  });
});
