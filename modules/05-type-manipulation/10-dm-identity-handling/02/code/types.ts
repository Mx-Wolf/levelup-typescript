// нам важно, чтобы названия критичности сообщения имели
// определенный порядок.
// массив - имеет натуральный порядок - этим мы и воспользуемся
const severityOrder = ['info', 'warning', 'error'] as const;

// Кстати, кавычках в следующей строке вы сможете 
// написать только те слова, которые указаны в массиве
const LOG_LEVEL_ERROR_LEVEL = severityOrder.indexOf('error');
const LOG_LEVEL_WARNING_LEVEL = severityOrder.indexOf('warning');
const LOG_LEVEL_INFO_LEVEL = severityOrder.indexOf('info');

// TypeScript позволяет нам извлечь из константного массива
// типы элементов в объединение - назовем этот тип
// можете убедиться, что эта строка эквивалентна 
// type Severity = "info" | "warning" | "error"
export type Severity = typeof severityOrder[number];

// в TypeScript (по наследству от JavaScript) все еще есть
// трудности по обработки календарных данных.
// мы добавим себе гибкости
export type DateTime = string & { 'iso formatted date': void };

// Запись в журнале будет иметь 
// вот такую структуру
export interface LogRecord {
  id: number; // уникальный идентификатор - identity - создает база данных
  date: DateTime; // дата регистрации события - инициализирует "центральный сервер"
  severity: Severity; // критичность сообщения поможет администратору при анализе логов
  category: string; // категория поможет сгруппировать сообщения по месту их возникновения
  message: string; // текст сообщения поможет разработчику в поиске дефектов
}

// Мы позаботимся о разработчиках - функции - методы - 
// обозначенные в файле main.ts будут иметь вот такую сигнатуру
interface LogMessage { (message: string): void; }

// А вот и сами методы 
// воспользуемся объединением специализированных
// строковых литералов в массиве наших констант
export type Logger = {
  [K in Severity]: LogMessage;
}

//эта функция все еще не реализована
export const createLoggerFactory = (level: any): any => { throw new Error('not implemented yet'); }