// ----------------------------------------------------------------
//                             Imports
// ----------------------------------------------------------------
import Amarok from "./Amarok";
import setupLogger from "./utils/logger";

import { IBot, IBotConfig } from "./interfaces";
import { readFileSync } from "fs";
import AmarokDB from "./utils/db";

// ----------------------------------------------------------------
//                              Main
// ----------------------------------------------------------------
async function main () : Promise<void> {
  // Setup Logger
  const logger = setupLogger('info');
  logger.info('Logger Setup');

  // Config data
  const config : IBotConfig = JSON.parse(
    readFileSync('./src/settings/config.json', 'utf-8')
  );
  logger.info('Config retrieved');

  // Setup DB
  const db = new AmarokDB(config.uri, logger);
  // db.init();
	logger.info('DB initiated');

  const amarock: IBot = new Amarok(config, db, logger);
  logger.info('Bot Initalized');

  [
		// 'exit',
		'SIGINT',
		// 'SIGQUIT',
		// 'SIGTERM',
		// 'uncaughtException',
		// 'unhandledRejection',
	].forEach(ec => process.on(ec, amarock.close.bind(amarock)));


  await amarock.start();
}

// ----------------------------------------------------------------
//                             Imports
// ----------------------------------------------------------------
main();