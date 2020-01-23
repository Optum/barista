let baseConnection = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_DATABASE || 'barista-dev',
  entities: [
    './dist/models/index.js',
  ],
  synchronize: false,
  migrations: ['dist/db/migrations/*.js'],
  cli: {
    migrationsDir: 'src/db/migrations',
    entitiesDir: 'src/models',
  },
};

let defaultConnection = {
  ...baseConnection,
  name: 'default',
};

let seedConnection = {
  ...baseConnection,
  name: 'seed',
  migrations: [
    'dist/db/seeds/*.js',
  ],
  cli: {
    migrationsDir: 'src/db/seeds',
  },
};

const testConnection = {
  ...baseConnection,
  host: process.env.TEST_DB_HOST || 'localhost',
  port: process.env.TEST_DB_PORT || 5433,
  username: process.env.TEST_DB_USER || 'postgres',
  password: process.env.TEST_DB_PASSWORD || 'password',
  database: process.env.TEST_DB_DATABASE || 'barista-test',
};

let testDemoSeedConnection = {
  ...testConnection,
  name: 'demo-seed',
  migrations: [
    'dist/db/demo-seeds/*.js',
  ],
  cli: {
    migrationsDir: 'src/db/demo-seeds',
  },
};

let testSeedConnection = {
  ...testConnection,
  name: 'seed',
  migrations: [
    'dist/db/seeds/*.js',
  ],
  cli: {
    migrationsDir: 'src/db/seeds',
  },
};

let demoSeedConnection = {
  ...baseConnection,
  name: 'demo-seed',
  migrations: [
    'dist/db/demo-seeds/*.js',
  ],
  cli: {
    migrationsDir: 'src/db/demo-seeds',
  },
};

if (process.env.TEST_DB != 'true') {
  module.exports = [
    defaultConnection,
    demoSeedConnection,
    seedConnection,
  ];
} else {
  module.exports = [
    testConnection,
    testDemoSeedConnection,
    testSeedConnection,
  ];
}
