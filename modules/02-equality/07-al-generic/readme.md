# Обобщение по отношению к типам типов

Когда TypeScript гарантирует нам что со значениями того или иного типа можно делать оговоренные действия мы можем создавать процедуры, которые заранее не определяют конкретный тип. Обобщенное программирование эксплуатирует понятие совместимости типов.

Совместимость типов в TypeScript основана на структурной эквивалентности принятой в JavaScript. Этот подход отличает TypeScript от статически типизированных языков - Java, C# и других. В частности в TypeScript допускается использование следующей специализации

Вооруженные этим знанием мы можем создать первую обобщенную программу.

```typescript
// функция вернет первый элемент массива. 
// Его тип и значение будет известно потом. 
// сейчас важно, что аргумент - это массив
function firstItem<T>(array:T[]):T{
  if(array.length>0){
    return array[0];
  }
  throw new Error("empty array");
}
```

Слева от круглых скобок с аргументами функции мы написали выражение `<T>`. Эта запись уведомляет TypeScript о намерении использовать символ **T** в качестве псевдонима типа значений. В частности мы требуем, чтобы в качестве аргумента наша функция получала значение массива тех самых элементов типа **T**. Видите `array:T[]`? Вместо **T** можно подставить `string` или `number` или имя любого другого типа, работоспособность функции не нарушится.

Имея описание такой функции мы можем опереться на компилятор и поручить ему убедиться, что после получения элементы мы сможем использовать значения по назначению

```typescript
const array1 = [42,73];
// компилятор проделает логические рассуждения и сделает вывод
// что theAnswer будет иметь тип число.
const theAnswer = firstItem(array1);
// typeof theArray === "number";
// мы может использовать значение безопасно
Math.abs(theAnswer); //ok
theAnswer.split(","); //Property 'split' does not exist on type 'number'.(2339)

```

Возможности обобщенного программирования делают TypeScript очень мощным инструментом и мы регулярно  будет использовать их в работе.

## Синтаксис для обозначения обобщенного типа

Кроме обобщения функций вы можете использовать обобщение в структуре типов и интерфейсов.

Для определения обобщенного дерева может пригодится тип `TreeNode`, способный хранить полезные данные любого типа.

```typescript
interface TreeNode<T>{
  parent: TreeNode<T>;
  children: TreeNode<T>[];
  payload: T;
}
```

[Playground Link](https://www.typescriptlang.org/play?ssl=5&ssc=2&pln=1&pc=1#code/JYOwLgpgTgZghgYwgAgCpQhAcgewCYQA8qAfAN4CwAUMsgA5wbgBcaG2+RpA3NbQgAtgAGzxNW6TLgLESAbQC6vGvTgBPYTjh4JygL5A)

Допускается использовать больше одного параметра типа, в этом случае они разделяются запятой

```ts
// В качестве контейнера можно использовать разные типы
// HTML элементов
declare function render<THTMLElement, TView>(
    container: THTMLElement,
    view: TView,
): void;
```

[Playground Link](https://www.typescriptlang.org/play?jsx=0#code/CYUwxgNghgTiAEAzArgOzAFwJYHtXzlVBgB4AVACTIFkAZAUQhAFsRUMAaeMgNSxADuAPgAUAWABQ8afDB4MULKhAwAXNyp1GLNp0kz4AN34D1vEx0kBKdYZxZgAbiA)

Символ обобщенного типа может использоваться в любом месте соответствующей декларации, где можно использовать обозначение типа.

```ts
// обобщенный тип T распространяется на определение всего интерфейса
interface DataBase<T>{
    getConnection():T;
    closeConnection(connection:T):void;
}
```

[Playground Link](https://www.typescriptlang.org/play?jsx=0#code/JYOwLgpgTgZghgYwgAgCJzHAQnAzhAHgBUA+AbwFgAoZW5AcwjAGEB7EECBMYdgCgCUALiIBuanWQIANq3xsOXHvwTtO3XiBHCAbq2AATcVQC+QA)
