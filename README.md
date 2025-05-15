# Logger Test Project

A simple, winston-based logger for internal Innoversat testing purposes.

## About

This project is a test implementation of a logging system built on top of the Winston library. It provides basic logging functionality with colorized output and file rotation.

## Features

- Multiple log levels (error, warn, info, http, debug)
- Colored console output
- Log file storage with rotation
- Environment-aware configuration

## Local Development

### Installation

```bash
# Clone the repository
git clone https://github.com/yusufokuducu/logger.git
cd logger

# Install dependencies
npm install
# or
pnpm install
```

### Build

```bash
npm run build
# or
pnpm run build
```

### Testing Locally

```bash
# Import directly in your test project
import logger from './path/to/this/project';

# Use the logger
logger.info('Test message');
logger.error('Error message');
```

## Basic Usage Example

```javascript
import logger from './logger';

// Log examples
logger.info('Application started');
logger.warn('Resource usage high');
logger.error('Connection failed', new Error('Timeout'));

// With context
import { logWithContext } from './logger';

logWithContext('info', 'User action', {
  userId: 123,
  action: 'login'
});
```

## Note

This is a test project developed for Innoversat and is not intended for production use or public distribution yet.

## License

MIT © Yusuf Okuducu 