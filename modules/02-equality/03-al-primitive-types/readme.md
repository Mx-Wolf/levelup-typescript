# Важное значение примитивных типов

При работе с JavaScript-функциями вы, вероятно, встречали приём, который позволяет отличить вариант получения настройки в виде объекта от варианта с функцией обратного вызова. Вспомните хотя бы [настройки webpack](https://webpack.js.org/configuration/configuration-types/).

Во время работы функции вы проверяете, а является ли полученное в параметре значение функцией, и действуете по обстоятельствам:

```javascript
function init(settings){
  if(typeof settings === 'function'){
    settings = settings();
  }
  //используем извлечённые значения
}
```

## Оператор typeof

В примере выше мы воспользовались оператором JavaScript `typeof`. Этот оператор доступен и в TypeScript: он выполняется во время работы результата компиляции TypeScript, поэтому формально остаётся оператором JavaScript.

Использование `typeof` позволяет выяснить типы значений во время работы программы. У этого оператора есть ограничения: он расскажет только о примитивных типах:

- bigint,
- boolean,
- function,
- number,
- object,
- string,
- symbol.

Оператор `typeof` не поможет, если нужно отличить объекты разных классов. От него не дождёшься информации об аргументах функции и типе её результата. Но всё же `typeof` — очень полезный оператор. Мы будем работать с ним в третьем модуле при выяснении типа значений, полученных от сервера. Он поможет вам и во многих случаях. Этот оператор работает во время исполнения программы и действует во Вселенной значений.

У оператора `typeof` есть двойник в параллельной Вселенной типов. Будьте внимательны.

```tsx
const theEvent = {
  id:1,
  title: 'big bang'
}

type EventType = typeof theEvent;
/*
type EventType = {
    id: number;
    title: string;
}
*/

if(typeof theEvent === 'object'){
  console.log(JSON.stringify(theEvent,null, ' '));
}
/*
[LOG]: "{
 "id": 1,
 "title": "big bang"
}" 
 */
```

[Посмотреть в песочнице](https://www.typescriptlang.org/play?#code/MYewdgzgLgBFAWBTAogN0WWBeGBvAUDDAJYAmAXAIwA0hcxUANouTAOQBGxA5jBwIZhubfAF98+KAE8ADohhoMUACqz5OaXJAAzOEkWYA3PgD0AKklqF6TKrkwcBIkTKswAVwC2HRACdjzvRMLDDQvsRCxuJmJhLE2gAUmog6eig22Fg4bCAcAFaIwFBsAJROMKCQIMwAdIwg3AkAUgDKAPIAcjVhEdzxUkn6GdQejIzU7OwlJVGmFgDaADJtAOIAuqwARE6bZJusNISbUAzM+zCbXLwCQptimzCEMUA).

## Специальные примитивные типы TypeScript

TypeScript добавляет несколько примитивных типов, работающих во Вселенной типов. Мы познакомимся с ними в третьем модуле.

Эти типы:

- undefined,
- null,
- unknown,
- never,
- void,
- any.

Тип `any` — самый непредсказуемый. Старайтесь его не использовать ни явно, ни косвенно. Аннотацией `any` вы заставляете TypeScript «отойти в сторону» и в результате остаётесь один на один с потенциальными ошибками. Не делайте так.
