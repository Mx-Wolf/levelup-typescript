# Результат выполнения, тип возвращаемого значения, void, never

## Неявный тип возвращаемого значения

Во многих случаях компилятор в состоянии выяснить тип возвращаемого из функции значения, и указывать его явным образом не требуется.

```typescript

function isGraterThen(left:number, right:number){
    return left>right;
}
```

Компилятор будет считать, что тип этой функции эквивалентен вот такому типу

```typescript
type GreaterThenPredicate = (left:number, right:number)=>boolean;
```

Компилятор сумеет выполнить операции над множеством типов и для функции, возвращающей значения разных типов. 

```typescript
const mockData = {} as Record<string,unknown>;
const ERROR_MESSAGE = "no data available" as string;
function getData(){
  if(typeof mockData === "undefined"){
      return {
            status:"error", 
            message: ERROR_MESSAGE,
          } as const;
  }
  return {
      status: "success",
      data: mockData,
  } as const;
}
```
Вы можете скопировать это определение в песочницу и изучить закладку `.d.ts`. Убедитесь, что исходный код приведенной выше функции typescript рассматривает как имеющий тип пересечения двух структурных типов.

```typescript
declare function getData(): {
    readonly status: "error";
    readonly message: string;
    readonly data?: undefined;
} | {
    readonly status: "success";
    readonly data: Record<string, unknown>;
    readonly message?: undefined;
};
```

**На заметку** В ходе этого курса мы изучим операции объединения, пересечения типов, специализированные типы строковых литералов, способы дискриминации типов и другие вопросы арифметики типов.

Здесь интересно заметить, что тип поля status - явно записанная строка. Еще отметим, что для typescript-а очевидна зависимость - если status- "error", то message - строка, а если status "success" то message не определена. Компилятор возьмет с собой это знание и подскажет разработчику, если вдруг увидит выражение

```typescript
const received = getData();
if(received.status === "success"){
    //Object is possibly 'undefined'.(2532)
    console.log(received.message.length)
}
```

## Тип void

В javascript все функции возвращают значение, даже если при их определении ни разу не использовалось ключевое слово return. После выполнения функции noop значение переменной `alwaysCarry` теряется. Ему присваивается результат работы функции.

```javascript
function noop(){};
let alwaysCarry = 'towel';
alwaysCarry = noop();
console.log(typeof alwaysCarry);// undefined
```

Компилятор typescript добавляет в набор типов специальный тип void. С точки зрения компилятора функция, возвращающая void может возвращать любое значение, но компилятор это значение будет игнорировать. 

**Внимание** Напомним, что все операции с типами значений заканчиваются после компиляции. 

С точки зрения typescript-компилятора допустимыми являются все следующие определения функций

```typescript
type Action = ()=>void;
const logTime: Action = function(){
    console.log(new Date());
}
const doTheTruth:Action = () => true;
```

Вы можете встретить эту ситуацию при использовании функций обратного вызова. Вспомним, хотя бы `Array.prototype.forEach`. Этот метод ожидает функцию в качестве аргумента, и эта функция должна возвращать void. Другой метод, Array.prototype.push, в свою очередь возвращает число - длину массива. Благодаря обсуждаемому правилу игнорирования возвращаемого значения typescript-ом следующий код компилируется без ошибок.

```typescript
const cards = ['туз'];
const hand = ['тройка', 'семерка']
cards.forEach((card)=>hand.push(card));
```

Компилятор typescript в состоянии определить тип возвращаемого значения самостоятельно. Разработчик, тем не менее, может помочь компилятору и указать тип явным образом. В том числе и тип `void`. 

Функция, для которой явно указна тип возвращаемого значения `void` не должна возвращать никакого значения. Следующее определение с точки зрения typescript ошибочно.

```typescript
function doAction():void{
    return 0; //Type 'number' is not assignable to type 'void'.(2322)
}
```

Компилятор typescript знаком еще с одним типом данных, имеющих отношение к определению типов функций. Это тип `never`. Он объясняет компилятору, что разработчик создает функцию, которая никогда не закончится (**нормально**).

```typescript
function colorGuard(color: string): never {
    throw new Error(`нет гусей такого цвета ${color}`);
}
function addWhite(): number { return 0; }
function addGray(): number { return 0; }

function countGeese(goose: string): number {
    switch (goose) {
        case 'белый': return addWhite();
        case 'серый': return addGray();
        default: return colorGuard(goose);
    }
}
```