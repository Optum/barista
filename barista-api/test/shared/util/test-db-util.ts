import { Connection, createConnection, getConnectionManager } from 'typeorm';

export class TestDbUtil {

  private static async connection(name: string = 'default') {
    const manager = getConnectionManager();

    let dbConnection;

    if (manager.has(name)) {
      dbConnection = await manager.get(name);
    } else {
      dbConnection = await createConnection(name);
    }

    if (!dbConnection.isConnected) {
      await dbConnection.connect();
    }

    return dbConnection;
  }

  private static async defaultConnection() {
    return await this.connection();
  }

  private static async resetConnection(name: string = 'default') {
    const dbConnection = await this.connection(name);
    await dbConnection.close();
    await dbConnection.connect();
  }

  static async resetEntities(seedData: boolean = false) {

    return new Promise(async (resolve) => {
      const connection: Connection = await this.seedConnection();

      await connection.synchronize(true).then(async () => {

        return connection.close().then(async () => {

          if (seedData) {
            await this.seedDb();
            resolve(true);
          } else {
            resolve(true);
          }
        });

      });

    });
  }

  private static async seedConnection() {
    return await this.connection('seed');
  }

  static async seedDb() {
    const connection = await this.seedConnection();
    await connection.runMigrations();
  }
}
