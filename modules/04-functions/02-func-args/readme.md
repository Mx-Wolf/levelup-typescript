# Параметры функций

## Список параметров

Для выполнения своей работы, функциям может потребоваться получение параметров. Любой вариант описания типа функции позволяет указать список параметров, которые требуются функции для работы. Необходимо указывать имя параметра и его тип.

```typescript
type PrimeDetector = (intToTest:number)=>boolean;
type GCDService = (a:number, b:number)=>boolean;
```
В javascript функция может быть готова к работе с аргументом нескольких типов. Вы можете сообщить компилятору, что функции определенного типа готовы к такому повороту событий используя пересечение типов. 

**На заметку!** Более подробно об операциях пересечения, объединения и о других операциях с типами мы поговорим позднее. 

Следующее определение информирует компилятор о том, что функции работают и с числами и со строками

```typescript
function len1(arg: string|number):number{
    if(typeof arg === "number"){
        return arg;
    }
    return arg.length;
}
```

Вы можете использовать перегрузку функций. В этом случае вы записываете одно за другим все варианты возможных аргументов, и тут же, записываете реализацию. Обратите внимание, что тип реализации спрятан и доступен только для компилятора

```typescript
function len2(arg: number):number;
function len2(arg: string):number;
function len2(arg: any){
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
const value:string|number = 42;
console.log(len1(value)); //компилируется без ошибок
console.log(len2(value)); //ошибка 2769
```
[Изучите поведение](https://www.typescriptlang.org/play?target=7#code/GYVwdgxgLglg9mABAGwKZgIwAoCGAnAcwC5EBnKPGMAgHzBAFsAjVPASiPudYG8AoRIMQxgWKAE8ADqjjBE+AogC8KxACIuLPGrb8h+xHlRQQeJAoDcAoQF9rgoybPzCAOjTUoACyt2+oSFgEFHQAJlxCEk1WDmi8KwDoeCQPcIUSckpqWMYtBPAk4NSI4nkwcV17YVEJaVkXRRUldTidPQMHY1NzQit9O30RMSkZOQVlVTVMqgI2qv1Hboa+2yrvPDgAd0QwVG2AUTwNvCw2Xz4+ABNUCGR8VEQIBHJBADccZBBUDIoZulzWFY+E8wKQ4Gh3HACFgPNh3p9UGwzogAPQowBcIIA+EEAPCCAfhBABwggG4QfGAARBAMIggFYQQBCIIBBEEA8iCIQCMIBTAOwgiExgAkQfGMzHo4HPcGoSHQ4rwr5IiyolGc7nowAMIIhQgB2ABsAE4gA) в песочнице
```text
No overload matches this call.
  Overload 1 of 2, '(arg: number): number', gave the following error.
    Argument of type 'string | number' is not assignable to parameter of type 'number'.
      Type 'string' is not assignable to type 'number'.
  Overload 2 of 2, '(arg: string): number', gave the following error.
    Argument of type 'string | number' is not assignable to parameter of type 'string'.
      Type 'number' is not assignable to type 'string'.
```

Мы уже встречались с синтаксисом определения функций, содержащим угловые скобки. Они относятся к разделу typescript об обощенном программировании. В соответствующем разделе нашего курса мы подробнее рассмотрим детали. Сейчас, забегая вперед, познакомимся с еще одним способом описания типа функции

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