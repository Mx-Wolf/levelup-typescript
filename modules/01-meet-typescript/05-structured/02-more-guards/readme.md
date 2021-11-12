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

У компилятора typescript более строгие правила использования структур. Если вы удалите комментарий перед словами as string, компилятор будет считать типом переменной setting не узкий строковый тип `"key"` а более широкий `string`.  в результате доступ к значению в настройках будет вызывать ошибку компиляции.

Разработчики обсуждают этот вопрос начала 2018 года. см
[TypeScript/issues/21732](https://github.com/microsoft/TypeScript/issues/21732)

Пока же рекомендуется в тех местах где вы размышляете от значении типа структурный объект непонятной формы использовать тип `Record<string,unknown>`

## Различимые объединения типов

## Собственные защитники

## 1₽ или $1. Как работать с похожими, но разными данными
