import React from 'react';
import { mount } from 'enzyme';

import Form from './Form';
import TextField from './TextField';
import SubmitButton from './SubmitButton';

describe('Form / SubmitButton', () => {
  it('on a pristine form, it should be disabled', () => {
    const wrapper = mount(
      <Form values={{ one: 1 }} isInitialValid={true}>
        <TextField label="one" name="one" />
        <SubmitButton>Submit</SubmitButton>
      </Form>
    );
    expect(wrapper.find('button').prop('disabled')).toBeTruthy();
  });
  it('when a field is changed, it should be enabled', () => {
    const wrapper = mount(
      <Form values={{ one: 1 }} isInitialValid={true}>
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
  });
  it('when a field is changed to an invalid value, it should be disabled', done => {
    const validate = jest.fn(() => 'some error');
    const wrapper = mount(
      <Form values={{ one: 1 }} isInitialValid={true}>
        <TextField label="one" name="one" validate={validate} />
        <SubmitButton>Submit</SubmitButton>
      </Form>
    );
    expect(wrapper.find('button').prop('disabled')).toBeTruthy();
    wrapper.find('input').simulate('change', {
      target: { name: 'one', value: '2' }
    });
    // Validation is always Promise-based so it is asynchronous
    // we have to wait for it to happen
    setImmediate(() => {
      wrapper.update();
      expect(validate).toBeCalledWith('2');
      expect(validate.mock.results[0].value).toEqual('some error');
      expect(wrapper.find('button').prop('disabled')).toBeTruthy();
      done();
    });
  });
});
