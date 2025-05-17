import logger, { logWithContext } from '../src/index';

console.log('Starting logger demo...');

// Basic logging examples
logger.info('This is an info message');
logger.warn('This is a warning message');
logger.error('This is an error message');
logger.debug('This is a debug message');

// Logging with context
logWithContext('info', 'User logged in', { userId: '12345', timestamp: new Date() });
logWithContext('error', 'Failed to process payment', { 
  orderId: 'ORD-9876',
  errorCode: 'PAYMENT_FAILED',
  details: 'Invalid card information'
});

console.log('Demo completed. Check the logs directory for output files.'); 