const config = {
  development: {
    apiUrl: import.meta.env.VITE_APP_API_URL || 'http://localhost:8080',
  },
  production: {
    apiUrl: import.meta.env.VITE_APP_API_URL || 'http://localhost:8080',
  },
};

export default config[import.meta.env.MODE || 'development'];
