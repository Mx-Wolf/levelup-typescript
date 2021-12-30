# Уточнение типа

## Использование операторов typeof, instanseof

В предыдущем разделе мы познакомились с примерным подходом к выяснению реальной формы данных удаленного сервера. Похожие задачи возникают не только при удаленном взаимодействии и нам следует разобраться с инструментами, помогающими в определении типов.

Для оператора typeof и instanseof в контексте данных ведут себя совершенно так же как и в javascript.

```typescript
declare const someType: unknown;

const typeOfSomeType = typeof someType;
//const typeOfSomeType: "string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object" | "function"
```

и

```typescript
class Widget {};
const widget = new Widget();
const isInstance = widget instanceof Widget;
//const isInstance: boolean
```

Оператор typeof  контексте определения типа позволяет извлечь тип известной переменной. Для существующей функции можно получить тип возвращаемого значения

```typescript
function example(){return 42;}
let storage: ReturnType<typeof example> | null = null;
//let storage: number | null
```

## о типе данных object и Record<string,unknown>

Мы привыкли пользоваться объектами в javascript, как ассоциативными массивами.

```javascript
const settings = {
  key:"value",
}
const setting = "key" //as string;
const value = settings[setting];
```

У компилятора TypeScript более строгие правила использования структур. Если вы удалите комментарий перед словами as string, компилятор будет считать типом переменной setting не узкий строковый тип `"key"` а более широкий `string`.  в результате доступ к значению в настройках будет вызывать ошибку компиляции.

Разработчики обсуждают этот вопрос начала 2018 года. см
[TypeScript/issues/21732](https://github.com/microsoft/TypeScript/issues/21732)

Пока же рекомендуется в тех местах где вы размышляете от значении типа *структурный объект непонятной формы* использовать тип `Record<string,unknown>`

## Различимые объединения типов

Распространенная практика в обмене данными с сервером - получить json либо с ошибкой, либо json c данными, но не одновременно. Мы уверены, что если обмен завершился успешно, то поля error в полученном Json документе не будет. Компилятор позволяет нам выразить такую уверенность в виде пересечения различимых типов.

Обратите внимание, что при определении типа используется узкий строковый тип.

```typescript
type SuccessResponse = {
  status: 'success',
  data: Record<string,unknown>,
};
type FailureResponse = {
  status: 'error',
  error:{
    code: number,
    message: string,
  },
};
```

Наличие узкого строкового типа у поля success позволяет компилятору контролировать ваши намерения по использованию значений типа Response.

```typescript
type ApiResponse = SuccessResponse | FailureResponse;

declare function request():ApiResponse;

const result = request();

if(result.status === "error"){
    const {code,message} = result.error;
    console.log({code, message});    
}

```

После успешной проверки значения `status` компилятор уверенно позволяет использовать значения `code` & `message`.

Когда все типы, участвующие в объединенном типе обладают одним и тем же свойством с узким типом (строковым, числовым или логическим) компилятор рассматривает объединенный тип как различимый (discriminated union type) и позволяет конкретизировать значение методами как в примере выше.

## Собственные защитники

Проверку специальных признаков, позволяющих выяснить что значение является представителем того или иного типа можно вынести в отдельную функцию. Когда такая функция проделает необходимые проверки она возвращает boolean. Мы можем объяснить компилятору, что если такая функция вернет true, то аргумент, который она получила действительно является представителем нужного нам типа. И компилятор примет это к сведению.

```typescript
type Rocket = {
  name: string,    
}
const isRocket = (probe:Record<string,unknown>): probe is Rocket => {
  const {name} = probe;
  return typeof name === "string" && name === "Millennium Falcon";
}

let target:Rocket | null = null;

const source: Record<string, unknown> = {
  name:"Millennium Falcon"
}

if(isRocket(source)){
  target = source;
}
```

После того, как `isRocket` вернет *true*, компилятор позволит выполнит присваивание переменной target.

## 1₽ или $1. Как работать с похожими, но разными данными

В языках программирования java, c# определение типа включает имя типа, в TypeScript  типы с разными именами (скорее псевдонимами) могут быть эквивалентными, если попарно совпадают типы их составных частей.

В практике встает задача различить температуру в градусах Цельсия от температуры по Фаренгейту. Объем в литрах от объема в галонах. Длительность отпуска в днях от длительности отпуска в часах.

Во время подготовки функции, вам необходимо донести до коллег, что ваша функция принимает значения в рублях, а не в какой либо другой валюте.

```typescript
type Price {
  type:"рубли",
  value: number,
}
declare function update(id:number, newPrice:Price):void;
```

Это будет подсказка - перед вызовом `update` привести значение по курсу в рублях.

Если вы посмотрите, что в поле `type` всегда одно и то же значение. кроме того оно не используется, вы невольно зададите себе вопрос. Как бы сэкономить. эти пять байт?

```typescript

type Price = {
  type:void,//значение этого поля не используется.
  value: number,
}
const makePrice = (value: number):Price => ({value} as Price); //значение полю type и не присваивается.
declare function update(id:number, newPrice:Price):void;

```

Вы и коллеги все еще можете подать в качестве аргумента в функцию `makePrice` число и в рублях и в долларах, но в функцию `update` будет подано значение в рублях.

Но раз поле type не используется, зачем прятать value внутрь объекта. Вот еще одни подход, позволяющий снабдить значение единицами измерения в целях получения помощи от TypeScript компилятора.

```typescript
type Rubles = number & {"₽":void};
const makeRubPrice = (value: number)=>(value as Rubles);

declare function update2(id:number, price: Rubles):void;

update2(42,makeRubPrice(73));

```

Такой подход рекомендуется, довольно распространен и даже получил название branded-types.
