import winston from 'winston';
import chalk from 'chalk';
import 'winston-daily-rotate-file';

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
    winston.format.printf(({level, message, timestamp})=> {
        const color = chalk.bold(colors[level as keyof typeof colors]);
        return `${timestamp} ${color} ${level.toUpperCase()}: ${message}`;
    })
);

const logger = winston.createLogger({
    levels,
    format,
    transports:[
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
        new winston.transports.File({ filename: 'logs/combined.log' }),
        
    ],
});

export default logger;
