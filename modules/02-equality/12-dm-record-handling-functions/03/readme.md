# Реализуем редуктор

Как мы помним, нам потребуется отрезать время. изготовим себе вспомогательную функцию. Кстати, мы обнаружим, что значение даты и времени операции нам требуется. - мы его видим в исходно массиве в элементе в свойстве `posted`

```ts
interface GeneralLedgerEntryPart {
  posted: string;
  // to be continue...
}

const getDate = (dateTime: string) => dateTime.substring(0, 10);
```

Для каждого дня, в котором были операции по счету, нам поднадобиться аккумулировать суммы приходов и списаний. Мы будем хранить такие данные в специальном объекте, а изготавливать его будем вот такой функцией

```ts
const createAccountDaily = (date: string): AccountDaily => ({
  creditDayTotal: 0,
  date,
  debitDayTotal: 0
});
```

Операция `set` объекта Map преднаначена для fluent использвания, но нам потребуется версия возращающая установленное значение

```ts
const setMapThough = (
  accumulator: Map<string, AccountDaily>,
  row: AccountDaily
) => {
  accumulator.set(row.date, row);
  return row;
};
```

Сначала в редукторе мы добавим определение функций фильтрации, для определения затрагивала ли операция рассматриваемый счет.

И кстати, обраружим, что нам нужно знать `debitAccountId` и `creditAccountId`. Добавим их в определение интерфейса

```ts
interface GeneralLedgerEntryPart {
  posted: string;
  // to be continued...
  debitAccountId: string;
  creditAccountId: string;
  // to be continued 2 ...
}

const createReducer = (accountId: string) => {
  const debitFilter = (item: GeneralLedgerEntryPart) =>
    accountId === item.debitAccountId;
  const creditFilter = (item: GeneralLedgerEntryPart) =>
    accountId === item.creditAccountId;

  throw new Error();
};
```

И наконец, мы изготовим функцию редуктора - где нам портебуется знание суммы опрерации, а значим мы сможем типизировать наш редуртор

```ts
interface GeneralLedgerEntryPart {
  posted: string;
  // to be continued...
  debitAccountId: string;
  creditAccountId: string;
  // to be continued 2 ...
  amount: number;
}

const createReducer = (accountId: string) => {
  const debitFilter = (item: GeneralLedgerEntryPart) =>
    accountId === item.debitAccountId;
  const creditFilter = (item: GeneralLedgerEntryPart) =>
    accountId === item.creditAccountId;
  return (
    accumulator: Map<string, AccountDaily>,
    item: GeneralLedgerEntryPart
  ) => {
    const isCredit = creditFilter(item);
    const isDebit = debitFilter(item);
    if (isCredit || isDebit) {
      const row = getOrCreateDaily(accumulator, item.posted);
      row.creditDayTotal += isCredit ? item.amount : 0;
      row.debitDayTotal += isDebit ? item.amount : 0;
    }
    return accumulator;
  };
};
```

вы можете ознакомится с кодом [в песочнице](https://codesandbox.io/s/step-3-section-12-module-2-levelup-typescript-demo-yther)

#
#
