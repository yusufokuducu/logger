import winston from 'winston';
import chalk from 'chalk';
import * as fs from 'fs';
import * as path from 'path';
import 'winston-daily-rotate-file';
import DailyRotateFile from 'winston-daily-rotate-file';


const logDir = path.join(process.cwd(), 'logs');
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


const consoleFormat = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
    winston.format.printf(({ level, message, timestamp, context }) => {
        let colorFn;
        switch(level) {
            case 'error': colorFn = chalk.red.bold; break;
            case 'warn': colorFn = chalk.yellow.bold; break;
            case 'info': colorFn = chalk.green.bold; break;
            case 'http': colorFn = chalk.magenta.bold; break;
            case 'debug': colorFn = chalk.white.bold; break;
            default: colorFn = chalk.white;
        }
        
        
        const contextStr = context 
            ? ` ${JSON.stringify(context, null, 0)}`
            : '';
            
        return `${timestamp} ${colorFn(level.toUpperCase())}: ${message}${contextStr}`;
    })
);


const fileFormat = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
    winston.format.json()
);

const environment = process.env.NODE_ENV || 'development';
const isDevelopment = environment === 'development';
const level = isDevelopment ? 'debug' : 'info';

const logger = winston.createLogger({
    levels,
    level,
    transports: [
        
        new winston.transports.Console({
            format: consoleFormat
        }),
        
        new winston.transports.File({ 
            filename: path.join(logDir, 'error.log'), 
            level: 'error',
            format: fileFormat
        }),
        
        new winston.transports.File({ 
            filename: path.join(logDir, 'combined.log'),
            format: fileFormat
        }),
        
        new DailyRotateFile({
            filename: path.join(logDir, 'combined-%DATE%.log'),
            datePattern: 'YYYY-MM-DD',
            level: 'info',
            maxSize: '20m',
            maxFiles: '29d',
            format: fileFormat
        })
    ],
});


export function logWithContext(level: string, message: string, context: object) {
    logger.log({
        level,
        message,
        context
    });
}

export default logger;
