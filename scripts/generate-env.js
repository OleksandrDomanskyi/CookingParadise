const fs = require('fs');
const dotenv = require('dotenv');
const env = dotenv.config().parsed || {};

const defaultUrl = 'https://dummyjson.com';
const apiUrl = env.API_URL || defaultUrl;

const targetPath = './src/environments/environment.ts';
const fileContents = `export const environment = {
  production: ${process.env.NODE_ENV === 'production'},
  apiBaseUrl: '${apiUrl}'
};
`;

fs.writeFileSync(targetPath, fileContents);