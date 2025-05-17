"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logWithContext = logWithContext;
const winston_1 = __importDefault(require("winston"));
const chalk_1 = __importDefault(require("chalk"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
require("winston-daily-rotate-file");
const winston_daily_rotate_file_1 = __importDefault(require("winston-daily-rotate-file"));
// Create logs directory if it doesn't exist
const logDir = path.join(process.cwd(), 'logs');
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
}
// Define log levels
const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
};
// Define log level colors
const colors = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    debug: 'white',
};
// Custom formatter for console output
const consoleFormat = winston_1.default.format.combine(winston_1.default.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }), winston_1.default.format.printf(({ level, message, timestamp, context }) => {
    let colorFn;
    switch (level) {
        case 'error':
            colorFn = chalk_1.default.red.bold;
            break;
        case 'warn':
            colorFn = chalk_1.default.yellow.bold;
            break;
        case 'info':
            colorFn = chalk_1.default.green.bold;
            break;
        case 'http':
            colorFn = chalk_1.default.magenta.bold;
            break;
        case 'debug':
            colorFn = chalk_1.default.white.bold;
            break;
        default: colorFn = chalk_1.default.white;
    }
    // Format context if it exists
    const contextStr = context
        ? ` ${JSON.stringify(context, null, 0)}`
        : '';
    return `${timestamp} ${colorFn(level.toUpperCase())}: ${message}${contextStr}`;
}));
// Format for file output (no colors)
const fileFormat = winston_1.default.format.combine(winston_1.default.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }), winston_1.default.format.json());
// Set log level based on environment
const environment = process.env.NODE_ENV || 'development';
const isDevelopment = environment === 'development';
const level = isDevelopment ? 'debug' : 'info';
// Create logger instance
const logger = winston_1.default.createLogger({
    levels,
    level,
    transports: [
        // Console transport with colors
        new winston_1.default.transports.Console({
            format: consoleFormat
        }),
        // Error log file
        new winston_1.default.transports.File({
            filename: path.join(logDir, 'error.log'),
            level: 'error',
            format: fileFormat
        }),
        // Combined log file
        new winston_1.default.transports.File({
            filename: path.join(logDir, 'combined.log'),
            format: fileFormat
        }),
        // Daily rotating log files
        new winston_daily_rotate_file_1.default({
            filename: path.join(logDir, 'combined-%DATE%.log'),
            datePattern: 'YYYY-MM-DD',
            level: 'info',
            maxSize: '20m',
            maxFiles: '29d',
            format: fileFormat
        })
    ],
});
// Helper function for logging with context
function logWithContext(level, message, context) {
    logger.log({
        level,
        message,
        context
    });
}
exports.default = logger;
//# sourceMappingURL=index.js.map