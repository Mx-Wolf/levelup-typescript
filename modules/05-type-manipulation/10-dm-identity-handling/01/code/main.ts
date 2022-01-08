import { createLoggerFactory } from './logger-factory';

// в настройках нашего приложения администратор 
// может указать уровень важности сообщений
// попадающих в лог.
const settings = {
  logLevel:'error',
} as const;

// настройки позволяют создать специальную 
// функцию для создания журналов разных категорий
const createLoggerCategory = createLoggerFactory(settings.logLevel);

// модуль, который хочет вести журнал, создает себе
// собственную категорию
const logger = createLoggerCategory('demo-category');

// в нужных местах записывает в журнал сообщения
// которые будут зарегистрированы, если их
// важность превышает установленный порог.
logger.error('demo error');
logger.info('demo info');
logger.warning('demo warning');
