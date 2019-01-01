const React = require.requireActual('react');
jest
  .spyOn(React, 'useEffect')
  .mockImplementation((...args) => React.useLayoutEffect(...args));
module.exports = React;
