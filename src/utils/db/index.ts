// ----------------------------------------------------------------
//                             Imports
// ----------------------------------------------------------------
import { Pool } from 'pg';
import { readFile, readFileSync } from 'fs';
import { IDB } from '../../interfaces';
import winston from 'winston';

// ----------------------------------------------------------------
//                            DB Class
// ----------------------------------------------------------------
export default class AmarokDB implements IDB {
  logger: winston.Logger;
  pool: Pool;

  public constructor (uri: string, logger: winston.Logger) {
    this.logger = logger;
    this.pool = new Pool({connectionString: uri});
  }

  async init() : Promise<void> {
    const tableSchema : Object = JSON.parse(
      readFileSync('./src/utils/db/schema.json', 'utf-8')
    );

    const ct: string = 'CREATE TABLE IF NOT EXISTS';

    for (const [table, data] of Object.entries(tableSchema)) {
			let query = '';

			for (const [key, value] of Object.entries(data)) {
				query += `${key} ${value} \n`;
			}

			// Execute sql
			const sql = `${ct} ${table}(${query})`;
			// await this.execute(sql);
		}

		this.logger.info('DB setup Complete');
  }

  
}