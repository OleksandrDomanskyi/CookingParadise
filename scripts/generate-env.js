const fs = require('fs');
const dotenv = require('dotenv');
const env = dotenv.config().parsed || {};

const targetPath = './src/environments/environment.ts';
const fileContents = `export const environment = {
  production: ${process.env.NODE_ENV === 'production'},
  apiBaseUrl: '${env.API_URL || 'https://dummyjson.com'}'
};
`;

fs.writeFileSync(targetPath, fileContents);