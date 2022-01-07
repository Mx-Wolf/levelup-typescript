import { register } from "./logger";
import { Logger, Severity, severityOrder } from "./types";

// Чтобы не смущать прикладного программиста вопросами
// а разрешают ли настройки администратора записывать в журнал
// записи определенного уровня 
// мы воспользуемся NULL-шаблоном
const noop: () => void = () => undefined;

// Теперь настраиваемый логгер строится 
// в два действия
export const createLoggerFactory = (configuredLevel: Severity) => {
  const configuredIndex = severityOrder.indexOf(configuredLevel);
  // вычислим функцию проверки 
  // допустимости записи в журнал
  const isLoggingOn = (
    reportingLevel: Severity
  ) => (severityOrder.indexOf(reportingLevel) >= configuredIndex);;
  
  // вернем фабрику по производству журналов 
  // разных категорий
  return (category: string): Logger => {
    // для производства журнала нужной категории
    // создадим отдельные методы 
    // где реализация будет зависеть от того 
    // будет ли делаться реальная запись    
    return severityOrder.reduce((logger, reportingLevel) => {
      logger[reportingLevel] = isLoggingOn(reportingLevel)
        ? (message) => register({ category, message, severity: reportingLevel })
        : noop// если запись в журнал не включена, воспользуемся NULL шаблоном и вернем пустую операцию
      return logger;
    }, {} as Logger);
  }
};