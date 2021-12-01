// ----------------------------------------------------------------
//                             Imports
// ----------------------------------------------------------------
import winston from "winston";
const { createLogger, format, transports } = winston;
const { combine, colorize, splat, timestamp, printf } = format;

// ----------------------------------------------------------------
//                              Main
// ----------------------------------------------------------------
export default function setupLogger( level: string ) : winston.Logger {
	// Basic Formatter
	const format : winston.Logform.Format = printf(({ level, message, timestamp, stack }) => {
		let msg : string = `${timestamp} [${level}] : ${message}`;
		if (stack) msg += `\n  ${stack} \n`;
		// if (meta) msg += '\n' + JSON.stringify(meta);
		return msg;
	});

	const logger : winston.Logger = createLogger({
		level: level,
		format: combine(colorize(), splat(), timestamp(), format),
		transports: [
			new transports.Console({ level: level }),
			new transports.File({
				filename: './.logs/combined.log',
				level: 'info',
			}),
			new transports.File({
				filename: './.logs/error.log',
				level: 'error',
			}),
		],
	});

	return logger;
}


// ----------------------------------------------------------------
//                             Imports
// ----------------------------------------------------------------
