import React from 'react';
import { render, fireEvent, cleanup } from 'react-testing-library';
import * as Yup from 'yup';

import Form from '../Form';
import TextField from '.';

class ErrorBoundary extends React.PureComponent {
  state = { hasError: false };

  static getDerivedStateFromError(err) {
    // Update state so the next render will show the fallback UI.
    return { hasError: err.message };
  }

  // componentDidCatch(err, info) {
  //   this.setState({ hasError: err.message });
  // }

  render() {
    return this.state.hasError || React.Children.only(this.props.children);
  }
}

afterEach(cleanup);

describe('Form/TextField', () => {
  it('should throw with no props as name argument is mandatory', () => {
    const e = console.error;
    console.error = msg => {};
    const { container } = render(
      <ErrorBoundary>
        <Form>
          <TextField />
        </Form>
      </ErrorBoundary>
    );

    expect(container.innerHTML).toMatchSnapshot();
    console.error = e;
  });
  it('should throw with any extra property but name as argument is mandatory', () => {
    const e = console.error;
    console.error = msg => {};
    const { container } = render(
      <ErrorBoundary>
        <Form>
          <TextField label="some label" value="Some value" />
        </Form>
      </ErrorBoundary>
    );
    expect(container.innerHTML).toMatchSnapshot();
    console.error = e;
  });
  it('should validate on field change', () => {
    const validate = jest.fn(() => '');
    const { getByLabelText } = render(
      <Form values={{ one: 1 }}>
        <TextField label="one" name="one" validate={validate} />
      </Form>
    );
    fireEvent.change(getByLabelText('one'), {
      target: { name: 'one', value: '2' },
    });
    expect(validate.mock.calls).toEqual([['2']]);
  });

  it('should generate an id when no id provided', () => {
    const { getByLabelText } = render(
      <Form values={{ one: 1 }}>
        <TextField label="one" name="one" />
      </Form>
    );
    expect(getByLabelText('one').id).toMatch(/^F_TF_\d+$/);
  });

  it('should respect the id provided', () => {
    const { getByLabelText } = render(
      <Form values={{ one: 1 }}>
        <TextField label="one" name="one" id="abcd" />
      </Form>
    );
    expect(getByLabelText('one').id).toBe('abcd');
  });

  it('should cast value to an integer before validate with schema on field change', () => {
    const schema = Yup.object().shape({
      one: Yup.number()
        .integer()
        .truncate()
        .default(0),
    });
    const validate = jest.fn(() => '');
    const { getByLabelText } = render(
      <Form values={{ one: 1 }} schema={schema}>
        <TextField label="one" name="one" validate={validate} />
      </Form>
    );
    fireEvent.change(getByLabelText('one'), {
      target: { name: 'one', value: '2.5' },
    });
    // string '2.5' was transformed into a number 2
    expect(validate.mock.calls).toEqual([[2]]);
  });
});
