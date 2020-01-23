const writeFile = require('fs').writeFile;
const argv = require('yargs').argv;

// Would be passed to script like this:
// `ts-node set-env.ts --environment=dev`
// we get it from yargs's argv object
const environment = argv.environment;
const isProd = environment === 'prod';

const targetPath = `./src/environments/environment.${environment}.ts`;
const envConfigFile = `
export const environment = {
  production: ${isProd},
  API_BASE_PATH: '${process.env.BARISTA_API_BASE_PATH}',
};
`;

// TODO: replace this line in the above config
//  when the env items get resolved
// API_BASE_PATH: '${process.env.BARISTA_API_BASE_PATH}',

writeFile(targetPath, envConfigFile, (err) => {
  if (err) {
    console.log(err);
  }

  console.log(`Output generated at ${targetPath}`);
  console.log(`environment: ${JSON.stringify(envConfigFile)}`);
});
