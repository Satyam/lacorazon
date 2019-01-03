import React from 'react';
import { mount, render } from 'enzyme';

import * as Yup from 'yup';

import Form from '../Form';
import DateField from './';
import TextField from '../TextField';

import DatePicker from 'react-datepicker';

describe('Form/DateField', () => {
  it('should throw with no props as name argument is mandatory', () => {
    const catcher = jest.fn();
    try {
      render(
        <Form>
          <DateField />
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
          <DateField label="some label" value="Some value" />
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
      <Form values={{ one: new Date(2019, 8, 7) }}>
        <DateField label="one" name="one" validate={validate} />
      </Form>
    );

    wrapper
      .find(DatePicker)
      .instance()
      .props.onChange(new Date(2019, 2, 2));
    expect(validate.mock.calls).toEqual([[new Date(2019, 2, 2)]]);
  });
  it('should validate on field blur', () => {
    const validate = jest.fn(() => '');
    const wrapper = mount(
      <Form values={{ one: new Date(2019, 8, 7) }}>
        <DateField label="one" name="one" validate={validate} />
      </Form>
    );

    wrapper
      .find(DatePicker)
      .instance()
      .props.onBlur();
    expect(validate.mock.calls).toEqual([[new Date(2019, 8, 7)]]);
  });

  it('should generate an id when no id provided', () => {
    const wrapper = mount(
      <Form values={{ one: new Date(2019, 8, 7) }}>
        <DateField label="one" name="one" />
      </Form>
    );
    expect(wrapper.find('input').prop('id')).toMatch(/^F_DF_\d+$/);
  });

  it('should respect the id provided', () => {
    const wrapper = mount(
      <Form values={{ one: new Date(2019, 8, 7) }}>
        <DateField label="one" name="one" id="abcd" />
      </Form>
    );
    expect(wrapper.find('input').prop('id')).toBe('abcd');
  });

  it('should take values from the schema', () => {
    const schema = Yup.object().shape({
      one: Yup.date().default(new Date(2019, 8, 7))
    });
    const validate = jest.fn(() => '');
    const wrapper = mount(
      <Form schema={schema}>
        <DateField label="one" name="one" validate={validate} />
      </Form>
    );
    wrapper
      .find(DatePicker)
      .instance()
      .props.onBlur();
    expect(validate.mock.calls).toEqual([[new Date(2019, 8, 7)]]);
  });
  it.skip('should reject values below the min in the schema', done => {
    // since the out-of-range dates are not enabled, they can't be clicked
    const schema = Yup.object().shape({
      one: Yup.date()
        .min(new Date(2019, 8, 5))
        .default(new Date(2019, 8, 7)),
      two: Yup.string().default('xxx')
    });
    const wrapper = mount(
      <Form schema={schema}>
        <DateField label="one" name="one" />
        <TextField label="two" name="two" />
      </Form>
    );
    wrapper.find('input[name="one"]').simulate('click');
    console.log(wrapper.html());
    wrapper.find('.react-datepicker__day--014').simulate('click');
    wrapper.find('input[name="two"]').simulate('click');
    setImmediate(() => {
      wrapper.update();
      expect(
        wrapper.find('input[name="one"]').hasClass('is-invalid')
      ).toBeTruthy();
      done();
    });
  });
});
