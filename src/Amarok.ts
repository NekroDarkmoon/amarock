// ----------------------------------------------------------------
//                             Imports
// ----------------------------------------------------------------
import { Client, Intents } from "discord.js";
import winston from "winston";
import {
  IBot,
  IBotConfig,
  ICommandHandler,
  IDB,
  IEventHandler,
} from "./interfaces";

// ----------------------------------------------------------------
//                              Amarok
// ----------------------------------------------------------------
export default class Amarok extends Client<true> implements IBot {
  config: IBotConfig;
  db: IDB;
  logger: winston.Logger;
  // CommandHandler: ICommandHandler;
  // EventHandler: IEventHandler;
  _started: boolean;
  _exited: boolean;

  public constructor(config: IBotConfig, db: IDB, logger: winston.Logger) {
    super({
      intents: 1025,
      partials: ["CHANNEL", "REACTION", "GUILD_MEMBER"],
    });

    this.config = config;
    this.db = db;
    this.logger = logger;
    // this.CommandHandler = ;
    // this.EventHandler = ;

    this._started = false;
    this._exited = false;
  }

  public async start(): Promise<void> {
    if (this._started) return;
    this._started = true;

    // Check Token
    if (!this.config.token) throw new Error("No discord token provided");

    // Setup EventListeners
    // Setup Commands & Interactons

    // Set token
    this.login(this.config.token);
    this.setMaxListeners(20);
  }

  async close(): Promise<void> {
    if (this._exited) return;
    this._exited = true;

    this.destroy();

    process.exit();
  }
}

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
// ----------------------------------------------------------------
//                             Imports
// ----------------------------------------------------------------
// ----------------------------------------------------------------
//                             Imports
// ----------------------------------------------------------------
