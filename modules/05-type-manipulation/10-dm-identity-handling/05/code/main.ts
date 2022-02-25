import { createLoggerFactory } from './logger-factory';

// попробуйте использовать один из трех уровней критичности записей
// и наблюдайте в консоли F12 (инструментов разработчика)
// какие записи буду возникать в журнале

const settings = {
  //logLevel:'warning',
  //logLevel:'error',
  logLevel:'info',
} as const;

const createLoggerCategory = createLoggerFactory(settings.logLevel);
const logger = createLoggerCategory('demo-category');

logger.error('demo error');
logger.info('demo info');
logger.warning('demo warning');
