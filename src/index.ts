import winston from 'winston';
import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import 'winston-daily-rotate-file';

const logDir = 'logs';

if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
}

const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
};

const colors = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    debug: 'white',
};

const format = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
    winston.format.metadata({ fillExcept: ['message', 'level', 'timestamp'] }),
    winston.format.errors({ stack: true }),
    winston.format.printf(({level, message, timestamp, ...metadata})=> {
        const color = chalk.bold(colors[level as keyof typeof colors]);
        const metaString = Object.keys(metadata).length ? JSON.stringify(metadata) : '';
        return `${timestamp} ${color} ${level.toUpperCase()}: ${message} ${metaString}`;
    })
);

const environment = process.env.NODE_ENV || 'development';
const isDevelopment = environment === 'development';

const level = isDevelopment ? 'debug' : 'info';

const logger = winston.createLogger({
    levels,
    level,
    format,
    transports:[
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
        new winston.transports.File({ filename: 'logs/combined.log' }),
        new winston.transports.DailyRotateFile({
            filename: 'logs/combined-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            level: 'info',
            maxSize: '20m',
            maxFiles: '14d',
        }),
        
    ],
});
export function logWithContext(level: string, message: string, context: object) {
    logger.log(
        level,
        message,
       { context }
    );
}
export default logger;
