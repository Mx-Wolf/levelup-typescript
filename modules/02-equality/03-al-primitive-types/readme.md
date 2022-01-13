# Важное значение примитивных типов

Во время работы с JavaScript функциями, вы встречали прием, позволяющий отличить вариант получения настройки в виде объекта, от варианта с функцией обратного вызова. Вспомните, хотя бы, [настройки webpack](https://webpack.js.org/configuration/configuration-types/).

Во время работы своей функции вы проверяете, а является ли полученное в параметре значение функцией и действуете сообразно обстоятельствам.

```javascript
function init(settings){
  if(typeof settings === 'function'){
    settings = settings();
  }
  //используем извлеченные значения
}
```

## Оператор typeof

В этом примере мы воспользовались оператором JavaScript `typeof`. Он доступен вам и в TypeScript. Чтобы быть точным этот оператор выполняется во время работы результата компиляции TypeScript и, следовательно, от формально остается оператором JavaScript.

Использование этого оператора позволяет вам выяснить типы значений во время работы программы. У этого оператора есть ограничения. От расскажет вам только о примитивных типах. Вот они

* bigint
* boolean
* function 
* number
* object
* string
* symbol

Оператор typeof не сможет помочь вам, если нужно отличить объекты разных классов. От него не дождешься информации об аргументах функции и типе ее результата. Все же это очень полезный оператор. Он нам поможет, в модуле 3, когда мы будет выяснять тип значений, полученных от сервера. Он поможет вам во многих случаях. Этот оператор работает во время исполнения программы и действует во вселенной значений.

У оператора typeof есть двойник в параллельной вселенной типов. Будьте внимательны.

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

[Playground Link](https://www.typescriptlang.org/play?#code/MYewdgzgLgBFAWBTAogN0WWBeGBvAUDDAJYAmAXAIwA0hcxUANouTAOQBGxA5jBwIZhubfAF98+KAE8ADohhoMUACqz5OaXJAAzOEkWYA3PgD0AKklqF6TKrkwcBIkTKswAVwC2HRACdjzvRMLDDQvsRCxuJmJhLE2gAUmog6eig22Fg4bCAcAFaIwFBsAJROMKCQIMwAdIwg3AkAUgDKAPIAcjVhEdzxUkn6GdQejIzU7OwlJVGmFgDaADJtAOIAuqwARE6bZJusNISbUAzM+zCbXLwCQptimzCEMUA)

## Специальные примитивные типы TypeScript

TypeScript добавляет несколько примитивных типов. Они работает во вселенной типов. Мы познакомимся с ними в модуле 3

Эти типы 

* undefined 
* null
* unknown
* never
* void
* any

из всего этого списка any мы написали последним. Это самый непредсказуемый тип. Старайтесь его не использовать ни явно, ни косвенно.
