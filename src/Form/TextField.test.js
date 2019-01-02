import React from 'react';
import { mount, render } from 'enzyme';
import * as Yup from 'yup';

import Form from './Form';
import TextField from './TextField';

describe('Form/TextField', () => {
  it('should throw with no props as name argument is mandatory', () => {
    const catcher = jest.fn();
    try {
      render(
        <Form>
          <TextField />
        </Form>
      );
    } catch (err) {
      catcher();
    }
    expect(catcher).toBeCalled();
  });
  it('should throw with any extra property but name as argument is mandatory', () => {
    const catcher = jest.fn();
    try {
      render(
        <Form>
          <TextField label="some label" value="Some value" />
        </Form>
      );
    } catch (err) {
      catcher();
    }
    expect(catcher).toBeCalled();
  });
  it('should validate on field change', () => {
    const validate = jest.fn(() => '');
    const wrapper = mount(
      <Form values={{ one: 1 }}>
        <TextField label="one" name="one" validate={validate} />
      </Form>
    );
    wrapper
      .find('input')
      .simulate('change', { target: { name: 'one', value: '2' } });
    expect(validate.mock.calls).toEqual([['2']]);
  });

  it('should generate an id when no id provided', () => {
    const wrapper = mount(
      <Form values={{ one: 1 }}>
        <TextField label="one" name="one" />
      </Form>
    );
    expect(wrapper.find('input').prop('id')).toMatch(/^F_TF_\d+$/);
  });

  it('should respect the id provided', () => {
    const wrapper = mount(
      <Form values={{ one: 1 }}>
        <TextField label="one" name="one" id="abcd" />
      </Form>
    );
    expect(wrapper.find('input').prop('id')).toBe('abcd');
  });

  it('should cast value to an integer before validate with schema on field change', () => {
    const schema = Yup.object().shape({
      one: Yup.number()
        .integer()
        .truncate()
        .default(0)
    });
    const validate = jest.fn(() => '');
    const wrapper = mount(
      <Form values={{ one: 1 }} schema={schema}>
        <TextField label="one" name="one" validate={validate} />
      </Form>
    );
    wrapper
      .find('input')
      .simulate('change', { target: { name: 'one', value: '2.5' } });
    // string '2.5' was transformed into a number 2
    expect(validate.mock.calls).toEqual([[2]]);
  });
});
