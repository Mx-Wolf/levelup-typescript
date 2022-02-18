# функции и их эквивалентность

Для программ на javascript функции являются основным строительным материалом.  TypeScript  предоставляет разработчику дополнительные возможности, но функции остаются важной частью системы, поэтому следует уметь выразить назначение и ожидания от функций в разных обстоятельствах. Давайте изучим, как эти намерения сообщить TypeScript-у.

## Явная аннотация типов

Когда вы явно укажите все типы возможных значений, компилятор будет их использовать как для анализа внутри функции, так и в коде, где эта функция используется.

```typescript
// В этом примере разработчик явно указывает 
// значения каких типов требуются для нормального 
// использования функций

function exampleAction():void {
  console.log('еще элемент найден');
};

function exampleAdapter(inValue:number):string {
  return `${inValue}`;
}

function exampleReducer(state:number, action: number):number {
  return state+action;
}
```

При описании функции `exampleAction` разработчик объяснил компилятору, что функция не ожидает никаких параметров, и не возвращает никакого значения. Тип `void` указывает на то, что вызывающий код не должен ожидать от функции какого-то результата.

При описании функции `exampleAdapter` разработчик объяснил компилятору, что для штатной работы перед вызовом в функцию надо передать параметр, содержащий числовое значение. Компилятор будет следить за этим во время анализа.

Описание этой функции одновременно сообщает компилятору (и другим пользователям) что в результате нормального завершения функция вернет результат строкового типа.

Из описания третьей функции `exampleReducer` мы делаем вывод, что для нормальной работы в функцию надо передать два числовых аргумента, а результат будет числом.

## Неявный вывод о типе результата функции

Во многих случаях, компилятор достаточно сообразителен, чтобы выяснить тип возвращаемого значения самостоятельно. Поэтому следующий вариант эквивалентен предыдущему.

```tsx
// Пример функции, от которой мы не ждем результата
function exampleAction() {
  console.log('еще элемент найден');
};

// Пример функции, возвращающей строку
function exampleAdapter(inValue: number) {
  return `${inValue}`;
}

// Пример функции, возвращающей число
function exampleReducer(state: number, action: number) {
  return state + action;
}

declare function readTemperature(): number;
declare function retportTemperture(temp: number): void;
// Пример функции, никогда не возващающейся
function monitor():never {
  while (true) {
    retportTemperture(readTemperature())
  }
}
```

[Playground Link](https://www.typescriptlang.org/play?#code/PTAEnwQQBEEDhBB4QRWEEqQIiCGEQQvCCC4QQYiDWgGlED4QQIRBRNSjIjBOEFFkGkQUdeUQNhBAWEHllEnkHYQVIG4QQDIgJQAwgEgFAAzAK4A7AMYAXAJYB7BaACmADwCGAWwAOAGx0BBVZoUAKAJSgA3lNCglWgM4aLAOjMNAHM7AHJ4QEkQVkBZECFueHQydHEaLnRQhwBuKQBfbKkQCBgEJDQsXAJQQCYQIn4qyHEI8UA5ECi6QEEQEmpMVFlFGy1dQ1MLSwATAxMVHQAnOzUFADUDMzkdAC5QBTkjACNZp1d3GZ0VORntAAMAEmcF5dWdHMvsnKkCsCg4RBQMHDxCDU6g0mq14HRAOIg0HaQiIfWU6kG+mM5h0ACUdGM5EpZnYvCoDNNNts9rNCAYBgpiTt9jNDm5QCczhdQPjCTpQABqUAUxEKV7vMY6JRmAwnUDyBG2Rk6AxjAAqOlMs0J5x0jmppJm2SFIrFHMllJlKhMGhmKkVyvNars01MmtpDk2ADcNGoxtlCl8Sr9ygDmNAKIBmEA44mYrCBVUaLTa7UA8iDwo1GLRqFRmjUKHTO2YuBkAdwAFmoLKBbTM1vT3MdTqbzZaTLNmeqTnL6yqm44HAy3jkgA)

Разглядывая текст функций в примере вы легко можете выяснить значения каких типов они возвращают. Компилятор действует так же. Кроме того, он запоминает свои догадки и использует их в других местах программы так, как будто описание было сделано с явным указанием типа результата. В этом смысле описания функций в этом и в предыдущем разделе эквивалентны.

## Вывод о типах параметров функции по контексту

Если определение функции появляется в контексте, то TypeScript в состоянии выяснить и типы аргументов.

```typescript
// Сравните с предыдущим примером
[1,2,3].forEach(
  function exampleAction(){
    console.log('еще элемент найден');
  }
);

const stringArray = [1,2,3].map(
  function exampleAdapter(inValue){
    return `${inValue}`;
  }
);

const sum = [1,2,3].reduce(
  function exampleReducer(state,action){
    return state+action;
  },
  0,
);

```

В примере выше мы снова определили три функции, но на этот раз типы параметров и типы аргументов компилятор выяснил самостоятельно, по контексту использования.

## Функциональный (вызываемый) тип

Вы можете обозначить что переменная должна содержать функцию и может быть вызвана используя синтаксис, с виду похожий на стрелочную функцию `(...)=>...`. В следующем примере это `()=>boolean`;

```typescript
const myFuncVar: ()=>boolean = ()=>true;
```

Этот код транслируется в javascript предсказуемым образом. Описание типа изымается из текста.

```javascript
const myFuncVar = () => true;
```

Описание типа `()=>boolean` подсказывает компилятору, что функция не ожидает аргументов и возвращает значение типа boolean. Компилятор использует эту информацию для статического анализа программы. Компилятор проинформирует вас, если функция используется ненадлежащим образом.

Следующие выражения вызывают ошибку во время компиляции

```typescript
const message:string = myFuncVar();//Type 'boolean' is not assignable to type 'string'.
const flag:boolean = myFuncVar("test"); //Expected 0 arguments, but got 1.
```

Описанию типа функции можно назначить псевдоним.

```typescript
type UsefulService = ()=>boolean;
const myFuncVar:UsefulService = ()=>true;
```

## Сигнатура функции в структурном типе

В Javascript функции являются полноценными объектами, к ним можно добавлять свойства.  TypeScript  предусматривает специальный синтаксис, позволяющий разработчику объявить намерение иметь значение, которое можно вызвать `()`, но у которого есть и другие поля. Если мы планируем иметь объект - функцию - у которой дополнительно есть свойство `description` мы воспользуемся следующим описанием.

```typescript
type DescribedFunction = {
    ():boolean;
    description: string;
}
```

тогда мы можем использовать договоренность для наших бизнес-потребностей.

```typescript
function logExecution(fn:DescribedFunction){
    try{
        fn();
    }
    catch(ex){
        console.log(ex,fn.description)
    }
}
```

Синтаксис сигнатуры вызова позволяет определять тип перегруженной функции

```tsx
interface DateCreator{
  (ticks: number): Date;
  (year: number, month: number, day: number):Date;
  (isoString: string):Date;
}

declare const creator:DateCreator;

creator(2015,10,21);
creator(1445817600000);
creator('2015-10-26T00:00:00.000Z')
```

[Playground Link](https://www.typescriptlang.org/play?#code/JYOwLgpgTgZghgYwgAgCJ0gYShDB7KAbwFgAoZZACjGAQGsBnALmRAFcBbAI2gEoX0kANxkKlAJ64oLdt2gAaZBzzgAFjM48oigCZxxGuVH6CII8lWAM8AZTBRQAcxYN7TkxjNkAvmTI6IBAAbOBxkBBVXcJx8aVNsXDACczIEGKSoSgAmAAYARgBWeTyc+Sy83nM0xIJKPIAWeoKADjyAdgA2HO7uytT02oByXMKAWhLRrI6AFW6mOe6AOh6ALUHeIA)

Внимательный читатель может заметить кажущееся противоречие. Как так, TypeScript позовляет определить перегруженные функции, но компилируется в обычный JavaScript, где нет понятния перегруженных функций. Это кажущееся противоречие TypeScript разрешает очень элегантно. TypeScript и сервисы компилятора в редакторе не показывают разработчику, то как сам же разработчик реализовал перегруженную функцию. **Не показывают**, - это значит, что в intellisense эти сведения отсутствуют. Вот и все. Кстати, реализация перегруженной функции выполняется примерно так же как и в JavaScript, - методичным изучением полученных в параметрах значений. Мы скоро встретимся с этим подходом в демо.

## Несколько слов о конексте this

Конекст исполнения функции (`handler1` для определенности) в JavaScript можно заменить несколькими способами - присвоением свойству объекта и вызовом через точку.

```JavaScript
const obj = {};
obj.handler1 = handler1;
obj.handler1();// this === obj
```

или использованием методов `call`, `apply`.

В любом случае разработчик вправе ожидать от TypeScript-а контроля допустимого/ожидаемого типа значения контекста `this`. TypeScript использует синтаксис первого аргумента функции и использует зарезервированное словов this для указания типа контекста. Как обычно следует помнить, что во время работы JavaScript ничего не знает об этом "якобы" первом аргрументе.

```ts
export function handler1(this: HTMLAnchorElement, ev:MouseEvent){
    ev.preventDefault();
    this.title = 'clicked';
}

const a = document.querySelector('a');
if(a===null){
    throw new Error();
}
a.addEventListener('click',handler1);

const b = document.querySelector('button');
if(b===null){
    throw new Error();
}
b.addEventListener('click',handler1);
```

[Изучите в песочнице](https://www.typescriptlang.org/play?ssl=17&ssc=1&pln=1&pc=1#code/KYDwDg9gTgLgBAMwK4DsDGMCWEVwBYCGKAJgDbBQCMAFDHpgM4BccAEgCoCyAMgILp5oAUXIBbYChgAaOMABuTThCQNgQuRJgBKAN4AoOIdlyAdGCjzNAEWAICSUjGpaA3AaN1GJrDHJwAvHAA5GikmGgA1sDEQW4Avnp6aDgM8AQBcMQQaEjikiYAjkgUAJ4AysDkGNDUQQRBrnqYCNQE-u0oDqS67oZ0UBAA7nAowMNCUANQzvF6BCYExMTqmtyMMBIUtaHhEUFShCTkVI1JKfAARhlZOXkwhcVQ5ZXA1dNBF0gwMDgNbs3UC7tfydUjdfRGOD9IYjMZwCZTGZ6BIXBZLFaSNapTbvHaRfaHMgUSiNIA) отрывок. Посмотрите, какой результат JavaScript формируется, выясните в какой строке сервисы TypeScript подскажут вам неправомерность использования функции. Обратите внимание на количество аргументов у функции `handler1` в модуле TypeScript и в модуле JavaScript

В следующем разделе мы рассмотрим вопрос о создании программ, которым, как и компилятору TypeScript важно только то, что можно сделать со значениями, но точное название типа менее существенно. Будем создававть программы в обобщенном виде.
