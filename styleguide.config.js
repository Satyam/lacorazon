module.exports = {
  components: 'src/**/*.js',
  ignore: [
    '**/__tests__/**',
    '**/*.test.{js,jsx,ts,tsx}',
    '**/*.spec.{js,jsx,ts,tsx}',
    '**/*.d.ts',
    // added by me
    '**/*.stories.{js,jsx,ts,tsx}',
    'src/store/**',
    'src/index.js',
    'src/serviceWorker.js',
    'src/setupTests.js',
    'src/utils.js',
    'src/Form/index.js'
  ],
  template: {
    head: {
      links: [
        {
          rel: 'stylesheet',
          href:
            'https://maxcdn.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css'
        }
      ]
    }
  },
  styles: {
    Code: {
      code: {
        fontSize: '14px',
        backgroundColor: '#eee'
      }
    }
  }
};
