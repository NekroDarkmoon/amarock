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


  async close() : Promise<void> {
    await this.pool.end();
    this.logger.warn('Closed DB pool.');
  }


  async fetch (sql: string, values: [] = []) : Promise<object[] | null>  {
    // Validation
    if (sql.indexOf('SELECT') === -1) throw new Error('Not a fetch query');

    const result  = await this.pool.query(sql, values);
    if (result.rows.length === 0) return null;

    return result.rows;
  }


  async fetchOne(sql: string, values: [] = []) : Promise<object | null> {
		// Validation
		if (sql.indexOf('SELECT') === -1) throw new Error('Not a fetch query');

		// Pool query
		const result = await this.pool.query(sql, values);
		if (result.rows.length === 0) return null;
		return result.rows[0];
	}


	async execute(sql: string, values: [] = []) : Promise<void> {
		// Validation
		// if (sql.indexOf("INSERT") === -1) throw "Not an execute query";

		// Create Connection
		const conn = await this.pool.connect();
		// TODO: Add ability to gain a result from the transaction

		// Start Transaction
		try {
			await conn.query(sql, values);
			// Commit transaction
			await conn.query('COMMIT');
		} catch (err) {
			// Rollback if an error occured
			await conn.query('ROLLBACK');
			console.error(err);
		} finally {
			conn.release();
		}
	}

	/**
	 *
	 * @param {Array<String>} sqlArray
	 * @param {Array<Array>} valArray
	 */
	async executeMany(sqlArray: string[], valArray: [] = []) : Promise<void> {
		// TODO: Validation - Match Array Size

    const conn = await this.pool.connect();
	
    try {
			for (let pos = 0; pos < sqlArray.length; pos++) {
				const sql = sqlArray[pos];
				const values = valArray[pos] || [];
				await conn.query(sql, values);
			}
			await conn.query('COMMIT');
		} catch (err) {
			await conn.query('ROLLBACK');
			console.error(err);
		} finally {
			conn.release();
		}
	}
  
}