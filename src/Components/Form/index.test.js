import * as FormComponents from './';

describe('Form', () => {
  it('Should export all components', () => {
    expect(Object.keys(FormComponents)).toEqual([
      'TextField',
      'SubmitButton',
      'LabeledText',
      'Form',
    ]);
  });
});
