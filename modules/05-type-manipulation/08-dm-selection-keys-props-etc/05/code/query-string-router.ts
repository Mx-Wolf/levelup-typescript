import { Handler } from "./types";
import { getPlainObject, keyFromQueryString } from "./utils";

// создадим себе регистратуру для обработчиков
const registry = new Map<string, (props: never)=>void>();

export const registerHandler = <T extends string>(
  queryStringTemplate:string,
  handler: Handler<T>,
)=>{
  registry.set(
    // придумаем алгоритм получения ключа по именам полей строки запроса
    keyFromQueryString(queryStringTemplate),
    // и будем регистрировать обработчики относительно вычисленного ключа
    handler
  );
};

// использование регистратуры
export const dispatch=(
  queryString:string,
)=>{
  // основано на том же алгоритме вычисления ключа
  const key = keyFromQueryString(queryString);
  if(!registry.has(key)){
    throw new Error('404 - not registered');
  }
  const handler = registry.get(key) as ((props:Record<string,string>)=>void);
  if(typeof handler !== 'function'){
    throw new Error('500 - internal error')
  }
  // строку запроса мы преобразуем в обычный объект
  handler(getPlainObject(queryString));
}