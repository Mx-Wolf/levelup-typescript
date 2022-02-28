import { Handler } from "./types";
import { getPlainObject, keyFromQueryString } from "./utils";

// Создадим регистратуру для обработчиков.
const registry = new Map<string, Handler>();

export const registerHandler = (
  queryStringTemplate:string,
  handler: Handler,
)=>{
  registry.set(
    // Придумаем алгоритм получения ключа по именам полей строки запроса
    keyFromQueryString(queryStringTemplate),
    // и будем регистрировать обработчики относительно вычисленного ключа.
    handler
  );
};

// Использование регистратуры
export const dispatch=(
  queryString:string,
)=>{
  // основано на том же алгоритме вычисления ключа.
  const key = keyFromQueryString(queryString);
  if(!registry.has(key)){
    throw new Error('404 - not registered');
  }
  const handler = registry.get(key);
  if(typeof handler !== 'function'){
    throw new Error('500 - internal error')
  }
  // Строку запроса преобразуем в обычный объект.
  handler(getPlainObject(queryString));
}
