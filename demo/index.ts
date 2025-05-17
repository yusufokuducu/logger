import logger, { logWithContext } from '../src/index';

// Simulate backend server startup
logger.info('Server starting...');
logger.info('Initializing configuration');
logger.debug('Environment: production');
logger.debug('Database connection string: mongodb://localhost:27017/myapp');

// Simulate API endpoint requests
logger.info('API Server listening on port 3000');
logWithContext('info', 'Received GET request', {
  endpoint: '/api/users',
  requestId: 'req-123456',
  clientIp: '192.168.1.105',
  timestamp: new Date()
});

// Simulate database operations
logWithContext('debug', 'Database query executed', {
  operation: 'FIND',
  collection: 'users',
  query: { active: true },
  executionTime: '45ms',
  timestamp: new Date()
});

// Simulate authentication events
logWithContext('info', 'User authenticated', {
  userId: 'user-9876',
  username: 'admin@example.com',
  method: 'JWT',
  timestamp: new Date()
});

// Simulate error handling
logWithContext('error', 'Failed to process request', { 
  endpoint: '/api/orders/process',
  requestId: 'req-789012',
  errorCode: 'ERR_PAYMENT_GATEWAY',
  statusCode: 500,
  details: 'Payment gateway timeout after 30s',
  timestamp: new Date()
});

// Simulate performance metrics
logWithContext('warn', 'Slow database query detected', {
  operation: 'AGGREGATE',
  collection: 'transactions',
  executionTime: '1250ms',
  threshold: '1000ms',
  timestamp: new Date()
});

logger.info('Server gracefully shutting down');
logger.info('Closed database connections');
logger.info('Server stopped'); 