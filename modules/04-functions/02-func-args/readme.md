# Параметры функций

## Список параметров

Для выполнения своей работы, функциям может потребоваться получение параметров. Любой вариант описания типа функции позволяет указать список параметров, которые требуются её для работы. Необходимо указывать имя формального параметра и его тип.

```typescript
type PrimeDetector = (intToTest:number)=>boolean;
type GCDService = (a:number, b:number)=>number;
```

имя формального параметра в описании типа может не совпадать с именеме парамерта при описании функции.

```typescript
const isPrime: PrimeDetector = function (value) {
    switch (value) {
        case 2:
        case 3:
        case 5:
        case 7:
            return true;
    }
    throw new Error('a very difficult problem');
}
```

В приведенном примере, функция `isPrime` использует параметр `value` имя которого отличается от имени `intToTest` в описании типа. Прорамма при этом, компилируется без ошибок

## Функции обрабатывающие данные разных типов

В javascript функция может быть готова к работе с аргументом нескольких типов. Вы можете сообщить компилятору, что функции определенного типа готовы к такому повороту событий используя пересечение типов. 

**На заметку!** Более подробно об операциях пересечения, объединения и о других операциях с типами мы поговорим позднее. 

Следующее определение информирует компилятор о том, что функции работает и с числами и со строками

```typescript
function getHash(arg: string|number):number{
    if(typeof arg === "number"){
        return arg;
    }
    return arg.length;
}
```

Вы можете использовать перегрузку функций. В этом случае вы записываете одно за другим все варианты возможных аргументов, и тут же, записываете реализацию. Обратите внимание, что тип реализации спрятан и доступен только для компилятора, а тип аргументов реализации должен объединять все типы в перегруженных декларациях

```typescript
function getHashOverload(arg: number):number;
function getHashOverload(arg: string):number;
function getHashOverload(arg: any){
    if(typeof arg === "number"){
        return arg;
    }
    if(typeof arg === "string"){
        return arg;
    }
    throw new Error();
}
```
этот вариант отличается от первого тем, что тип аргумента обязан быть известен более точно. 

```typescript
const value = 42 as string|number;
console.log(getHash(value)); //компилируется без ошибок
console.log(getHashOverload(value)); //ошибка 2769
```
[Изучите поведение](https://www.typescriptlang.org/play?target=7#code/GYVwdgxgLglg9mABAcwKZQBIEMDOALACiwCdkAuRHKYmMZAHzBAFsAjVYgSjKbY4G8AUIhGIYwAlACeAB1RxgiEskQBedYgBEvdsU2choo4mLoQxJMoDcw0QF9bI01HOXSAOgA2qOlDw2HQVBIWAQUdGx8AHkANw5POCwAEyJSCh0ObgziG2DoeCQ0TFw8WPjElOUKKho6LJZdXPB8sKLI0rjiBOTU8iUwKQNHMQlpOQUlUjUNbQaOfUNjJzMLSeQbIwcjcUlZeUVladUtGtpkBeGjZ1c1jfthv2I4AHdEMFRXgFFiJ+ICTgCgkESVQEE8JFQiAgCCoIhiWE8IFQ1WoZ0YcxyQOhYBwcG8XjgyAIbRKBHhiNQnABiAA9DTAFwggD4QQA8IIB+EEAHCCAbhB2YABEEAwiCAVhBAEIggEEQQDyIIhAIwgAsA7CCIRmACRB2ZLGfTBNjcfiEkSSdFOt0UuSkVSrLSaYrlfTAAwgiAATAB2ABsAE4gA) в песочнице
```text
No overload matches this call.
  Overload 1 of 2, '(arg: number): number', gave the following error.
    Argument of type 'string | number' is not assignable to parameter of type 'number'.
      Type 'string' is not assignable to type 'number'.
  Overload 2 of 2, '(arg: string): number', gave the following error.
    Argument of type 'string | number' is not assignable to parameter of type 'string'.
      Type 'number' is not assignable to type 'string'.
```

Мы уже встречались с синтаксисом определения функций, содержащим угловые скобки. Они относятся к разделу TypeScript об обощенном программировании. В соответствующем разделе нашего курса мы подробнее рассмотрим детали. Сейчас, забегая вперед, познакомимся с еще одним способом описания типа функции

```typescript
function extractFirstElement<T>(array:T[]):T{
    if(array.length>0){
        return array[0];
    }
    throw new Error();
}

const num = extractFirstElement([1,2,3]);
const str = extractFirstElement(["a","b","c"]);
```
Переменная `num` получает значение `1` типа `number`, а переменная `str` значение `"a"` типа string. Но важно даже не это, а то, что компилятор об этом догадывается сам.

В приведенном примере разработчик выражает намерение работать с массивами значений. При этом с помощью использования обобщенного типа аргумента `<T>` разработчик объясняет компилятору: *какие типы значений будут у элементов в массиве во время исполнения, значение такого типа и вернет моя функция*
