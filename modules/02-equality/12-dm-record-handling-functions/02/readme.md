# Определяем потребности функции

Для построения суммарной статистики функция должна получать массив. В связи с этим изменяем описание интерфейса на следующее:

```ts
export type AccountDailyReducer = (
  accountId: string,
  ledger: unknown[]
) => AccountDaily[];
```

Зная, что параметр функции — массив, организуем его свёртку. Для этого нам нужно предоставить методу  `reduce` начальное значение и группирующую функцию, отбирающую данные для нужного нам счёта.

Будем собирать данные так, чтобы если операция происходила по указанному счёту, то сумма операции накапливалась бы в соответствующем поле. Помня о том, что требуется использовать дату без времени, а операции могут быть выбраны из базы в любом порядке, организуем индекс по значению дня с помощью объекта Map.

```ts
type IndexedAccumulator = Map<Date, AccountDaily>;
```

Этот индекс мы создадим в функции `getInitialBuffer`.

```ts
const getInitialBuffer = (): IndexedAccumulator => new Map();
```

А сам редуктор создадим в функции `createReducer`

```ts
const createReducer = (account: string) => (
  previous: IndexedAccumulator,
  entry: unknown
): IndexedAccumulator => {
  throw new Error();
};
```

Обратите внимание, что мы не определили тип значения `entry`, но запомнили в окружении редуктора (замкнули) идентификатор счёта. Он потребуется для фильтрации.

Код доступен на [CodeSandbox](https://codesandbox.io/s/step-2-section-12-module-2-levelup-typescript-demo-1fvme).

