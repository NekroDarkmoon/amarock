// ----------------------------------------------------------------
//                             Imports
// ----------------------------------------------------------------
import { Client } from "discord.js";
import { Pool } from "pg";
import winston from "winston";

// ----------------------------------------------------------------
//                             Client
// ----------------------------------------------------------------
export interface IBot extends Client<true> {
  readonly config: IBotConfig;
  readonly db: IDB;
  readonly logger: winston.Logger;
  // readonly CommandHandler: ICommandHandler;
  // readonly EventHandler: IEventHandler;
  _started: boolean;
  _exited: boolean;

  start(): Promise<void>;
  close(): Promise<void>;
}

// ----------------------------------------------------------------
//                             Config
// ----------------------------------------------------------------
export interface IBotConfig {
  readonly token: string;
  readonly uri: string;
}

// ----------------------------------------------------------------
//                               DB
// ----------------------------------------------------------------
export interface IDB {
  logger: winston.Logger;
  pool: Pool;

  init() : Promise<void>;
  close() : Promise<void>;
  fetch(sql: string, values : []) : Promise<object[] | null>;
  fetchOne(sql: string, values: []) : Promise<object | null>;
  execute(sql: string, values: []) : Promise<void>;
  executeMany(sqlArray: string[], valArray: []) : Promise<void>
}
// ----------------------------------------------------------------
//                         Command Handler
// ----------------------------------------------------------------
export interface ICommandHandler {}
 
// ----------------------------------------------------------------
//                             Event Handler
// ----------------------------------------------------------------
export interface IEventHandler {}
// ----------------------------------------------------------------
//                             Imports
// ----------------------------------------------------------------
// ----------------------------------------------------------------
//                             Imports
// ----------------------------------------------------------------
// ----------------------------------------------------------------
//                             Imports
// ----------------------------------------------------------------
// ----------------------------------------------------------------
//                             Imports
// ----------------------------------------------------------------
