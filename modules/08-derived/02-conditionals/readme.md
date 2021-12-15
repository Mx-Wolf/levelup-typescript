# Условные типы

## параллель

Предлагаем изучить и сравнить два кусочка кода. Javascript

```javascript
const former = 5;
const latter = 7;
const result = latter>former?"more": new Date();
```

Особенно обратим внимание на третий, условный, оператор. Сравним его с приведенным ниже выражением для типов.

```typescript
class Former {
  value (){return 5;}
}
class Latter extends Former{
  op(){};
};

type Result = Latter extends Former? "more": Date;
```

Способ описания типа `Result` называется условным типом. Возможно, в своей ежедневной работе вы будете сталкиваться с условными типами в основном в неявном, завуалированном виде. С помощью условных типов в TypeScript выражены вспомогательные типы-модификаторы. Кроме того, условные типы прекрасно подходят для описания граничных api и frameworks.

На языке условных типов можно выразить алгоритм взятия типа значений, которые имеют свойства.

```typescript
type SettingsSource<T> = T extends {settings: unknown}?T["settings"]:never;

type WithLiteralSettings = SettingsSource<{settings: string}>;
//type WithLiteralSettings = string
type WithCallbackSettings = SettingsSource<{settings: ()=>string}>;
//type WithCallbackSettings = () => string
type WithoutSettings = SettingsSource<{config:string}>;
//type WithoutSettings = never
```

В приведенном примере кода, условный тип SettingsSource инструктирует компилятор проделывать действия *при каждом упоминании*

Во второй строке вместо параметра `T` разработчик указал `{settings: string}`. Компилятор проверил условие и выяснил, что этот тип, действительно имеет ненулевое пересечение свойств с указанным условием, а значит условие выполнено и результатом вычисления типа будет выражение `{settings: string}["settings"]`. Последнее выражение эквивалентно `string`. (еще раз, вычисление производится в редакторе и во время компиляции).

Аналогично производятся вычисления для `WithCallbackSettings`.

Для типа `WithoutSettings` разработчик указал тип, в котором нет свойства settings и условие не выполняется, поэтому компилятор вычисляет результат как `never`.

Ниже вы найдете упрощенный пример использования условных типов для построения фасада к системе управления бизнес-процессом.

```typescript

type DateTime = string & { "datetime": void };
const dateTime = (dateTime: string) => (dateTime as DateTime);

type Phone = string & { "phone": void };
const phone = (phone: string) => (phone as Phone);

type TaskId = string & { "task-id": void };
const taskId = (taskId: string) => (taskId as TaskId);

type Transition =
  {
    type: "ROLLBACK",
  }
  | {
    type: "MOVE_NEXT_TASK",
    task: TaskId,
  }
  | {
    type: "CALL_AGAIN",
    nextDate: DateTime,
    phone: Phone
  };

type TransitionDirection = Transition["type"];
type TransitionArg<T, A> = A extends { type: T } ? {} extends Omit<A, "type"> ? never : Omit<A, "type"> : never;

type CheckTypeComputed = TransitionArg<"ROLLBACK", Transition>;

declare function updateProcess<T extends TransitionDirection>(type: T, args?: TransitionArg<T, Transition>): void;

updateProcess("ROLLBACK");
updateProcess("MOVE_NEXT_TASK", { task: taskId("BPMS_0000") });
updateProcess("CALL_AGAIN", { nextDate: dateTime("2021-12-31"), phone: phone("+7(800) 555-86-28") });
```
