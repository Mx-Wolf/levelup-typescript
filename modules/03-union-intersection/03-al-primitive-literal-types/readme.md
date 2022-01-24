# Специальные (специализированные) литеральные типы

TypeScript рассматривает **константные** переменные примитивных типов особым образом. Он понимает, что если разработчик определил константу, то ее значение будет таким на протяжении всей программы. И тип этого значения не изменится. TypeScript рассматривает такие типы как специализацию. В следующем примере, тип переменной не просто строка - а специальная строка

```ts
const INC_ACTION  = 'increment';
```

В следующем примере тип результата функции не просто число, а объединение трех чисел. Причем TypeScript догадывается об этом самостоятельно.

```ts
// функция имеет тип
// (left:string, right:string)=>-1|0|1
function compare (left:string, right:string){
  if(left < right){
    return -1;
  }
  if(right < left){
    return 1;
  }
  return 0;
}
```

специализацию типа boolean полезно использовать для подсказки TypeScript какой тип из объединения ему следует выбрать.

Как известно операция поиска может закончится успешно и вернуть то,что требовалось найти. Если искомый элемент в коллекции не найден, то и возвращать нечего.

## Поиск

Определим тип результата в случае успеха

```ts
interface Found<T>{
    success: true; //специальный литеральный тип true
    data: T;
}
```

Обратим внимание, что полю success мы указали тип. Но это не тип boolean, а тип `true`. Тип `true` является специализацией типа boolean.

В случае безрезультатного завершения поиска мы сообщим об этом результатом типа `NotFound`, который можно определить так.

```ts
interface NotFound{
    success: false; //специальный литеральный тип false
}
```

В результате поиска какая-то (ненаписанная еще) функция вернет нам результат, который или "найдено" или "не найдено". TypeScript запомнит это как объединение типов `Found<T> | NotFound`, и, зная определения исходных типов поможет нам во время разработки и компиляции обнаружить попытку прочитать значение данных когда ничего не найдено

```ts
interface Found<T> {
    success: true;
    data: T;
}
interface NotFound {
    success: false;
}

declare const findResult: Found<string> | NotFound;

if(!findResult.success){
    findResult.data
//             ^^^^
//Property 'data' does not exist on type 'NotFound'.
}
```

[Playground Link](https://www.typescriptlang.org/play?jsx=0&ssl=15&ssc=2&pln=1&pc=1#code/JYOwLgpgTgZghgYwgAgGIHsCuIAmAeAFQD5kBvAKGSuQGdMEkaaAuZMKTCAbkupzjBxWBHgF9yoSLEQoAcujAZsOMryp0GEJq3gAbGt3LjyOCAl1woKBOhA0wyGKBwAlLZl1hWS3HntRQAHMSAB9keUUsXB4JGAAKAEInXDc6TwA6DUYaAEoKakdnVI8wdP5BcgB6SoLagoA9RvqqyoAFKHQAB2gwAE9kAHJyuAHkHHQtZBAFZAgAD2B7ZFs2Xu7BiJ8cAfSjIA)

TypeScript вспомнил, что в случае `.success === false` мы имеет дело с типом `NotFound`, а ни как не с `Found<>` и подсказывает, что свойство data отсутствует.
