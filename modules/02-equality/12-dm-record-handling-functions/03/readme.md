# Реализуем редуктор

Как мы помним, нам нужно «отрезать» время. Сделаем вспомогательную функцию. Мы обнаружим, что нам требуется значение даты и времени операции — мы видим его в исходном массиве в элементе в свойстве `posted`.

```ts
interface GeneralLedgerEntryPart {
  posted: string;
  // to be continue...
}

const getDate = (dateTime: string) => dateTime.substring(0, 10);
```

Для каждого дня, в котором были операции по счёту, нам нужно аккумулировать суммы приходов и списаний. Мы будем хранить такие данные в специальном объекте, а создавать его будем функцией:

```ts
const createAccountDaily = (date: string): AccountDaily => ({
  creditDayTotal: 0,
  date,
  debitDayTotal: 0
});
```

Операция `set` объекта Map предназначена для fluent-использования, но нам требуется версия, возвращающая установленное значение:

```ts
const setMapThough = (
  accumulator: Map<string, AccountDaily>,
  row: AccountDaily
) => {
  accumulator.set(row.date, row);
  return row;
};
```

Сначала в редукторе добавим определение функций фильтрации, чтобы проверить, затрагивала ли операция рассматриваемый счёт.

Мы обнаружим, что нам нужно знать `debitAccountId` и `creditAccountId`. Добавим их в определение интерфейса.

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

Наконец, мы изготовим функцию редуктора, где нам потребуется знание суммы операции. А значит, мы сможем типизировать наш редуктор:

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

Вы можете ознакомиться с кодом [в песочнице](https://codesandbox.io/s/step-3-section-12-module-2-levelup-typescript-demo-yther).
