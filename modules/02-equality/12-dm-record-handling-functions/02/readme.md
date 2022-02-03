# Определяем потребности функции

Мы отмечаем, что для построения суммарной статистики, функция должна получать массив. В связи с этим мы изменяем описание интерфейса на следующее

```ts
export type AccountDailyReducer = (
  accountId: string,
  ledger: unknown[]
) => AccountDaily[];
```

Зная, что тип параметра функции массив мы можем организовать цикл с помощью метода reduce подготовить начальное значение и сгруппировать данные по массиву для нужного нам счета.

Мы будем собирать данные так, чтобы если операция происходила о указанному счета, сумма операции накапливалась бы в соответствующем поле. Помня, о том, что требуется использовать дату без времени, а операции могут быть выбраны из базы в любом порядке, мы огранизуем индекс значению дня с помощью объекта Map.

```ts
type IndexedAccumulator = Map<Date, AccountDaily>;
```

Этот индекс мы создадим в функции `getInitialBuffer`.

```ts
const getInitialBuffer = (): IndexedAccumulator => new Map();
```

а сам редуктор создадим в функции `createReducer`

```ts
const createReducer = (account: string) => (
  previous: IndexedAccumulator,
  entry: unknown
): IndexedAccumulator => {
  throw new Error();
};
```

Обратите внимание, что мы не определили тип значения entry, но запомнили в окружении редуктора (замкнули) идентификатор счета. Он нам потребуется для фильтрации.

Код доступен на [codesandbox](https://codesandbox.io/s/step-2-section-12-module-2-levelup-typescript-demo-1fvme)
