import * as FormComponents from './';

describe('Form', () => {
  it('Should export all components', () => {
    expect(Object.keys(FormComponents)).toEqual([
      'DateField',
      'TextField',
      'SubmitButton',
      'LabeledText',
      'Form',
    ]);
  });
});
