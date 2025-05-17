import logger, { logWithContext } from '../src/index';
import * as process from 'process';

// Set environment for testing different log levels
console.log('LOGGER TEST DEMO - Testing all features\n');

// Test all direct log levels
console.log('\n=== Testing Basic Log Levels ===');
logger.error('ERROR: Critical system failure');
logger.warn('WARN: System approaching resource limits');
logger.info('INFO: Application started successfully');
logger.http('HTTP: GET /api/users 200 OK - 45ms');
logger.debug('DEBUG: Connection pool initialized with 10 connections');

// Test with context of varying complexity
console.log('\n=== Testing Context Objects ===');
// Simple context
logWithContext('info', 'Processing user request', { userId: 'user-123' });

// Complex nested context
logWithContext('debug', 'User session details', {
  session: {
    id: 'sess-456789',
    user: {
      id: 'user-123',
      roles: ['admin', 'editor'],
      preferences: {
        theme: 'dark',
        notifications: true
      }
    },
    device: {
      type: 'mobile',
      os: 'iOS 15.4',
      browser: 'Safari'
    },
    metrics: {
      loadTime: 245,
      interactionDelay: 120
    }
  }
});

// Test with special values in context
logWithContext('info', 'Testing special values', {
  nullValue: null,
  undefinedValue: undefined,
  emptyString: '',
  zeroNumber: 0,
  booleanValue: false,
  dateValue: new Date(),
  arrayWithMixedTypes: [1, 'string', null, { key: 'value' }]
});

// Simulate server startup sequence
console.log('\n=== Simulating Server Lifecycle ===');
logger.info('Server initializing...');

// Database connection simulation
setTimeout(() => {
  logger.debug('Attempting database connection...');
  setTimeout(() => {
    logWithContext('info', 'Database connected', {
      host: 'mongodb://primary:27017',
      replicaSet: 'rs01',
      connectionTime: '120ms'
    });
    
    // Server startup complete
    logger.info('Server started and listening on port 3000');
    
    // Simulate HTTP requests
    simulateHttpTraffic();
  }, 300);
}, 200);

// Function to simulate various HTTP requests
function simulateHttpTraffic() {
  console.log('\n=== Simulating HTTP Traffic ===');
  
  // Successful GET request
  setTimeout(() => {
    logWithContext('http', 'GET /api/products', {
      requestId: 'req-001',
      statusCode: 200,
      responseTime: '45ms',
      userId: 'user-456',
      query: { category: 'electronics', sort: 'price' }
    });
  }, 200);
  
  // Slow database query
  setTimeout(() => {
    logWithContext('warn', 'Slow database query detected', {
      queryId: 'q-789',
      collection: 'products',
      filter: { inStock: true, price: { $gt: 100 } },
      executionTime: '2340ms',
      threshold: '1000ms'
    });
  }, 400);
  
  // Authentication failure
  setTimeout(() => {
    logWithContext('error', 'Authentication failed', {
      requestId: 'req-002',
      endpoint: '/api/admin/settings',
      statusCode: 401,
      reason: 'Invalid JWT token',
      ipAddress: '192.168.1.105',
      attempts: 3
    });
  }, 600);
  
  // System overload simulation
  setTimeout(() => {
    logWithContext('warn', 'System under high load', {
      cpu: '89%',
      memory: '78%',
      activeConnections: 1250,
      timestamp: new Date()
    });
  }, 800);
  
  // Critical error simulation
  setTimeout(() => {
    try {
      throw new Error('Uncaught exception in payment processing module');
    } catch (error: any) {
      logWithContext('error', 'Uncaught exception', {
        error: error.message,
        stack: error.stack?.split('\n').slice(0, 3).join('\n'),
        module: 'PaymentProcessor',
        operation: 'processTransaction',
        transactionId: 'tx-456789'
      });
    }
  }, 1000);
  
  // Server shutdown simulation
  setTimeout(() => {
    console.log('\n=== Simulating Server Shutdown ===');
    logger.info('Initiating graceful shutdown...');
    
    setTimeout(() => {
      logger.debug('Closing database connections...');
      
      setTimeout(() => {
        logger.info('All connections closed, shutting down');
        logger.info('Server stopped. Check the logs directory for output files.');
        
        // Display completion message
        console.log('\nLogger Test Demo completed. Check the logs directory for generated files.');
      }, 300);
    }, 200);
  }, 1500);
} 