# Функции и их эквивалентность

Функции — основной строительный материал для программ на JavaScript-языке. Хотя TypeScript даёт разработчику дополнительные возможности, функции всё равно остаются важной частью системы, поэтому нужно уметь выражать назначение и ожидания от них в разных обстоятельствах.

## Явная аннотация типов

Когда вы явно указываете все типы возможных значений, компилятор их использует как для анализа внутри функции, так и в коде, где эта функция используется. Давайте посмотрим на пример:

```typescript
// Здесь разработчик явно указывает, 
// значения каких типов нужны для нормального 
// использования функций.

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

Здесь при описании функции `exampleAction` разработчик объяснил компилятору, что функция не ожидает никаких параметров и не возвращает никакого значения. Тип `void` указывает на то, что вызывающий код не должен ожидать от функции какого-то результата.

Описывая функцию `exampleAdapter`, разработчик объяснил компилятору, что перед вызовом в неё надо передать параметр с числовым значением — компилятор будет следить за этим во время анализа. Описание также сообщает компилятору и другим пользователям, что функция должна вернуть результат строкового типа.

Из описания третьей функции, `exampleReducer`, видно, что для нормальной работы в неё надо передать два числовых аргумента, а результат будет числом.

## Неявный вывод о типе результата функции

Компилятор достаточно сообразителен и во многих случаях может самостоятельно выяснить тип возвращаемого значения. Поэтому следующий вариант описания функций эквивалентен предыдущему:

```tsx
// Пример функции, от которой мы не ждём результата.
function exampleAction() {
  console.log('ещё элемент найден');
};

// Пример функции, возвращающей строку.
function exampleAdapter(inValue: number) {
  return `${inValue}`;
}

// Пример функции, возвращающей число.
function exampleReducer(state: number, action: number) {
  return state + action;
}

declare function readTemperature(): number;
declare function reportTemperture(temp: number): void;
// Пример никогда не возвращающейся функции.
function monitor():never {
  while (true) {
    reportTemperture(readTemperature())
  }
}
```

[Посмотреть в песочнице](https://www.typescriptlang.org/play?#code/PTAEnwQQBEEDhBB4QRWEEqQIiCGEQQvCCC4QQYiDWgGlED4QQIRBRNSjIjBOEFFkGkQUdeUQNhBAWEHllEnkHYQVIG4QQDIgJQAwgEgFAAzAK4A7AMYAXAJYB7BaACmADwCGAWwAOAGx0BBVZoUAKAJSgA3lNCglWgM4aLAOjMNAHM7AHJ4QEkQVkBZECFueHQydHEaLnRQhwBuKQBfbKkQCBgEJDQsXAJQQCYQIn4qyHEI8UA5ECi6QEEQEmpMVFlFGy1dQ1MLSwATAxMVHQAnOzUFADUDMzkdAC5QBTkjACNZp1d3GZ0VORntAAMAEmcF5dWdHMvsnKkCsCg4RBQMHDxCDU6g0mq14HRAOIg0HaQiIfWU6kG+mM5h0ACUdGM5EpZnYvCoDNNNts9rNCAYBgpiTt9jNDm5QCczhdQPjCTpQABqUAUxEKV7vMY6JRmAwnUDyBG2Rk6AxjAAqOlMs0J5x0jmppJm2SFIrFHMllJlKhMGhmKkVyvNars01MmtpDk2ADcNGoxtlCl8Sr9ygDmNAKIBmEA44mYrCBVUaLTa7UA8iDwo1GLRqFRmjUKHTO2YuBkAdwAFmoLKBbTM1vT3MdTqbzZaTLNmeqTnL6yqm44HAy3jkgA)

Рассматривая текст функций, вы легко можете понять, значения каких типов они возвращают — компилятор действует так же. Кроме того, он запоминает свои догадки и использует их в других местах программы так, словно описание было сделано с явным указанием типа результата.

## Вывод о типах параметров функции по контексту

Если определение функции появляется в контексте, то TypeScript в состоянии выяснить и типы аргументов.

```typescript
// Сравните с предыдущим примером.
[1,2,3].forEach(
  function exampleAction(){
    console.log('ещё элемент найден');
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

В этом примере мы снова определили три функции. Но на этот раз компилятор сам, по контексту использования, выяснил типы параметров и типы аргументов.

## Функциональный (вызываемый) тип

Вы можете указать, что переменная должна содержать функцию и может быть вызвана, с помощью синтаксиса `(...)=>...`. В следующем примере посмотрим на `()=>boolean`:

```typescript
const myFuncVar: ()=>boolean = ()=>true;
```

Этот код транслируется в JavaScript предсказуемым образом. Описание типа изымается из текста.

```javascript
const myFuncVar = () => true;
```

Описание типа `()=>boolean` подсказывает компилятору, что функция не ожидает аргументов и возвращает значение типа `boolean`. Компилятор использует эту информацию для статического анализа программы. И если что-то пойдёт не так, он сразу же предупредит вас.

Следующие выражения вызывают ошибку во время компиляции:

```typescript
const message:string = myFuncVar();//Type 'boolean' is not assignable to type 'string'.
const flag:boolean = myFuncVar("test"); //Expected 0 arguments, but got 1.
```

Также описанию типа функции можно назначить псевдоним:

```typescript
type UsefulService = ()=>boolean;
const myFuncVar:UsefulService = ()=>true;
```

## Сигнатура функции в структурном типе

Функции в JavaScript — полноценные объекты, к ним можно добавлять свойства. В TypeScript есть специальный синтаксис, который позволяет разработчику объявить намерение: иметь значение, которое можно вызвать `()`, но у которого есть и другие поля. 

Давайте разберём на конкретном примере. Например, если мы планируем иметь объект — *функцию, у которой дополнительно есть свойство `description`*, то воспользуемся следующим описанием:

```typescript
type DescribedFunction = {
    ():boolean;
    description: string;
}
```

Попробуем прочитать эту декларацию типа:

> *К значениям типа `DescribedFunction` можно применить операцию вызова (invokation). Кроме того, значения типа `DescribedFunction` имеют свойство `description` со строковыми значениями*.

Мы можем использовать договорённость, описанную такой декларацией типа, для наших бизнес-потребностей.

```typescript
function logExecution(fn:DescribedFunction){
    try{
        fn();//Применяем операцию вызова.
    }
    catch(ex){
        console.log(ex,fn.description); //Пользуемся описанием функции.
    }
}
```

Синтаксис сигнатуры вызова позволяет определять тип перегруженной функции:

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

[Посмотреть в песочнице](https://www.typescriptlang.org/play?#code/JYOwLgpgTgZghgYwgAgCJ0gYShDB7KAbwFgAoZZACjGAQGsBnALmRAFcBbAI2gEoX0kANxkKlAJ64oLdt2gAaZBzzgAFjM48oigCZxxGuVH6CII8lWAM8AZTBRQAcxYN7TkxjNkAvmTI6IBAAbOBxkBBVXcJx8aVNsXDACczIEGKSoSgAmAAYARgBWeTyc+Sy83nM0xIJKPIAWeoKADjyAdgA2HO7uytT02oByXMKAWhLRrI6AFW6mOe6AOh6ALUHeIA).

Внимательный читатель может заметить «противоречие». *Как так, TypeScript помогает определить перегруженные функции, но компилируется в обычный JavaScript, где нет понятия перегруженных функций?* TypeScript элегантно разрешает это «противоречие». Он и сервисы компилятора в редакторе не показывают разработчику, как сам же разработчик реализовал перегруженную функцию. **Не показывают** — это значит, что в intellisense нет этих сведений. Вот и всё. Кстати, реализация перегруженной функции выполняется примерно так же, как и в JavaScript — методичным изучением полученных в параметрах значений. Мы скоро встретимся с этим подходом в демо.

## Несколько слов о контексте this

Контекст исполнения функции (в нашем случае `handler1`) в JavaScript можно заменить несколькими способами: присвоением свойству объекта и вызовом через точку:

```JavaScript
const obj = {};
obj.handler1 = handler1;
obj.handler1();// this === obj
```

... или использованием методов `call`, `apply`.

В любом случае разработчик вправе ожидать от TypeScript контроля допустимого или ожидаемого типа значения контекста `this`. TypeScript использует синтаксис первого аргумента функции и зарезервированное слово `this` для указания типа контекста. Нужно помнить, что во время работы JavaScript ничего не знает об этом «якобы» первом аргументе.

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

[Изучите в песочнице](https://www.typescriptlang.org/play?ssl=17&ssc=1&pln=1&pc=1#code/KYDwDg9gTgLgBAMwK4DsDGMCWEVwBYCGKAJgDbBQCMAFDHpgM4BccAEgCoCyAMgILp5oAUXIBbYChgAaOMABuTThCQNgQuRJgBKAN4AoOIdlyAdGCjzNAEWAICSUjGpaA3AaN1GJrDHJwAvHAA5GikmGgA1sDEQW4Avnp6aDgM8AQBcMQQaEjikiYAjkgUAJ4AysDkGNDUQQRBrnqYCNQE-u0oDqS67oZ0UBAA7nAowMNCUANQzvF6BCYExMTqmtyMMBIUtaHhEUFShCTkVI1JKfAARhlZOXkwhcVQ5ZXA1dNBF0gwMDgNbs3UC7tfydUjdfRGOD9IYjMZwCZTGZ6BIXBZLFaSNapTbvHaRfaHMgUSiNIA) этот фрагмент. Посмотрите, какой результат JavaScript формируется, и выясните, в какой строке сервисы TypeScript подскажут неправомерность использования функции. Обратите внимание на количество аргументов у функции `handler1` в модуле TypeScript и в модуле JavaScript.
***

В следующем разделе мы разберём вопрос о создании программ, которым важно только то, что можно сделать со значениями, но точное название типа менее существенно. Будем создавать программы в обобщённом виде.
