# Обобщение по отношению к типам типов. Дженерики

Когда TypeScript гарантирует нам что со значениями того или иного типа можно делать оговоренные действия мы можем создавать процедуры, которые заранее не определяют конкретный тип. Обобщенное программирование эксплуатирует понятие совместимости типов.

Совместимость типов в TypeScript основана на структурной эквивалентности принятой в JavaScript. Этот подход отличает TypeScript от статически типизированных языков - Java, C# и других. Вооруженные этим знанием мы можем создать первую обобщенную программу.

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

Слева от круглых скобок с аргументами функции мы написали выражение `<T>`. Эта запись уведомляет TypeScript о намерении использовать символ **T** в качестве псевдонима типа значений. В частности мы требуем, чтобы в качестве аргумента наша функция получала значение массива тех самых элементов типа **T**. Видите `array:T[]`?

> На жаргоне мы говорим что **T** это **дженерик** тип (вместо псевдоним обобщенного типа), мы называем функцию **дженерик**-функция firstItem. вы можете встретить рассуждения от **дженерик**-интерфейсах, и прочие.

Вместо **T** можно подставить `string` или `number` или имя любого другого типа, работоспособность функции не нарушится.

Имея описание такой функции мы можем опереться на компилятор и поручить ему убедиться, что после получения элемента мы сможем использовать значения по назначению.

```typescript
const array1 = [42,73];
// компилятор проделает логические рассуждения
// 1. он видит, что значением переменной array1  является массив чисел.
// 2. компилятор вспоминает, что firstArray<T>(items:T[]):T декларирует, что вернет значение типа, совпадающего с типом элемента массива
// 3. следовательно theAnswer будет иметь тип число.
const theAnswer = firstItem(array1);

// typeof theAnswer === "number";
// мы может использовать значение безопасно
Math.abs(theAnswer); //ok
theAnswer.split(","); //Property 'split' does not exist on type 'number'.(2339)
```

[Ссылка на песочницу здесь](https://www.typescriptlang.org/play?#code/PTAEhEQRhEEXhBC4QQxEEBwgh5EFIJhBCsIIARBocEIgog-CDZqDSIIJwgogsiCDcIBoDwgG0B9gDCCCCIO4mqwHSgAoEKECoIIGYQQHwgoPIkKhEoQOwg0VoHEQJogyhAjCCRALCD55izOzzQphCXgn1+QsOwzlVHdK0BsIOYA0oVddCsWGKQjMygALTU-myc3AIAZgCuAHYAxgAuAJYA9smg8ZkATgDO6QCS6QCmALYAPAAqAHwAFACGhYWtAJ4AXPUA2gC6AJR9AN4CoKCZ8W0d3bwANpXJAObpABaNAAzDE1NThZXpiYV57Z1d-duDANyToAC+D5uF2QDuoMmVnwCiHdlCs0AEQ1AAO6S6oAu3WBw3uz1SuVK0PmXQAjKAALygfoAFgATF4AOwAZju9lAsBshEQNGQ1iwRCwEgMNFYhhoEjEiHU7FgmlAWA47Eg7gM0BQlPR-Ak0HQiD0iDwPj8UmUag0DCI2AYTHMlBhGKmyDQ9Pw7FQMS4aF8iEcNF4lIJ-Gp9Fp9MZ6HYlnoiBU+FV-gKJXSAEE0Q0WpkqtVin0hqN6qADLB2VhEFhIIHfP5MDhDBr1JKtDJCKwfOwJGhy3pWIA5EEAkiAYSSgdjSWQ2ah0UJ4Viga3cViU0n8dh0PTV1h4DA0QAyIOZQJtKmHksV3pVCjp9IZEIw8HOO3JVPauU6kWv0kuNiu1xutziQ6UKjU5pd0fCBJTIWDKtl4tet7rpu2JYjiwLJIk1QAEabsC9zCPQpADhI7i7j6EjzooU4HkoKjFoK2gYNh5bsOYAgALKtJsvCtNBxTNMuq7AYU8KgCA2QANYCExd6brwxRgosMYgl4cK3OxwAAApvL+hSQqAADkgnCekimgAAJtklTFF82RXpUAAemQorkS5dL+SmQTBm6KbwzQEqSpIAJzDAIQA)

**Внимание!** В строке `const theAnswer = firstItem(array1);` мы не указывали никаких угловых скобок. Так короче. Но мы можем предупредить компилятор о нашем желании получать именно строки в качестве специализации дженерика, и тогда компилятор предупредит нас о необходимости использовать другой массив.

```ts
function firstItem<T>(array:T[]):T{
  if(array.length>0){
    return array[0];
  }
  throw new Error("empty array");
}
const array1 = [42,73];
const theAnswer = firstItem<string>(array1);//Argument of type 'number[]' is not assignable to parameter of type 'string[]'.
Math.abs(theAnswer); //Argument of type 'string' is not assignable to parameter of type 'number'.
theAnswer.split(","); //OK
```

попробуйте [в песочнице](https://www.typescriptlang.org/play?ssl=11&ssc=1&pln=1&pc=1#code/GYVwdgxgLglg9mABMGAnAzlAklApgWwB4AVAPgAoBDVVSgTwC5iBtAXQEomBvAKEURjAqNegDoANrjABzKAAtSABna9+-VLighUSarTrNFrANx9EAXzPzUcAO6IwuewFEacVOQBEBAA5Q6iHr0nuymlhAImIEidACMiAC8iMwALABMADQA7ADMJjwRYFHyuACCRba4qInIaJg4BISYqDAyFEFxoQD0XaWo0iD4UlCIcMCI-j64iADkYIMARlVsMwLoDnAjlOjoMNJglAuSE3CIPtSUQ3jVYxN0U7PNrdIrojwAspTyoofo5CXldCVVChRA9PoDIZgEa3SbTGZPGSrGDrMCbQI7PYHI7TKCnc60K5VUbjOGzeb4JaoGZvAEVKqidA+cQwKBeDIhYxgroAeQA0jwgA) исправить ошибку, или изучите [следующий код](https://www.typescriptlang.org/play?#code/GYVwdgxgLglg9mABMGAnAzlAklApgWwB4AVAPgAoBDVVSgTwC5iBtAXQEomBvAKEURjAqNegDoANrjABzKAAtSABna9+-VLighUSarTrNFrANx9EAXzPzUcAO6IwuewFEacVOQBEBAA5Q6iHr0nuymlhAImIEidACMiAC8iMwALABMADQA7ADMJjwRYFHyuACCRba4qInIaJg4BISYqDAyFEFxoviUPuTkuOwJpLiiUHAAYjAAHrgAJuRp7EumJeXolaii6D7iMFBeGSHGiAD0JwDyANI8QA).

```ts
function firstItem<T>(array:T[]):T{
  if(array.length>0){
    return array[0];
  }
  throw new Error("empty array");
}
const array1 = [42,73];
const theAnswer = firstItem<string>(array1.map((e)=>e.toFixed(2)));
theAnswer.split(","); //OK
```

Как видно из приведенных отрывков, разработчик может использовать TypeScript в свою пользу и для автоматичского определения типа переменной (начальный вариант) и для контроля типов значений аргумента в обобщенной функции.

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
declare function render<HTMLElement, TView>(
    container: HTMLElement,
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

Изучите демонстрации, показывающие приемы работы с типами.
