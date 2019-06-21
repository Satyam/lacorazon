const path = require('path');
module.exports = {
  components: 'src/Components/**/*.js',
  ignore: [
    '**/__tests__/**',
    '**/*.test.{js,jsx,ts,tsx}',
    '**/*.spec.{js,jsx,ts,tsx}',
    '**/*.d.ts',
    // added by me
    '**/*.stories.{js,jsx,ts,tsx}',
    'src/Components/Form/index.js',
  ],
  moduleAliases: {
    Components: path.resolve(__dirname, 'src/Components/'),
    Shared: path.resolve(__dirname, 'src/Shared/'),
  },
  template: {
    head: {
      links: [
        {
          rel: 'stylesheet',
          href:
            'https://maxcdn.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css',
        },
      ],
    },
  },
  styles: {
    Code: {
      code: {
        fontSize: '14px',
        backgroundColor: '#eee',
      },
    },
  },
};
