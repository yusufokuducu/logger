import logger, { logWithContext } from '../index';

describe('Logger API Structure', () => {
  test('logger should be defined', () => {
    expect(logger).toBeDefined();
  });

  test('logger should have all required logging methods', () => {
    expect(typeof logger.error).toBe('function');
    expect(typeof logger.warn).toBe('function');
    expect(typeof logger.info).toBe('function');
    expect(typeof logger.http).toBe('function');
    expect(typeof logger.debug).toBe('function');
  });

  test('logWithContext function should be defined', () => {
    expect(typeof logWithContext).toBe('function');
  });
});
