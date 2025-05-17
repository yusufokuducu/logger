import winston from 'winston';
import 'winston-daily-rotate-file';
declare const logger: winston.Logger;
export declare function logWithContext(level: string, message: string, context: object): void;
export default logger;
//# sourceMappingURL=index.d.ts.map