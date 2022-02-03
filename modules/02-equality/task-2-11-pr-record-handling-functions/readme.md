# Задача

В файле `ledger-or.json` хранится демо-выборка из журнала операций огранизации. Операции представляют json-объект вида, похожего на такой:

```json
{
  "generalLedgerId": 2,
  "posted": "2021-07-28T07:49:45.507",
  "debitAccountId": "311.0001 income",
  "creditAccountId": "158.0001 project",
  "amount": 2021.43,
  "referenceId": "promo"
}
```

Вам следует преобразовать список таких объектов в другой список, которые по форме соответствует указанному интерфейсу

```ts
export interface AccountDaily {
  date: string;
  debitDayTotal: number;
  creditDayTotal: number;
}
```

Дополнительно известно, что значение в поле `AccountDaily.date` должно не содержать значения времени (т.е. быть в форме `YYYY-MM-DD`T`00:00:00.000`Z);

Функцию свертки нужно сделать в соответствии с интерфейсом 

```ts
export type AccountDailyReducer = (accountId: string, ledger: unknown) => AccountDaily[];
```

тип параметра `ledger` следует определить таким образом, чтобы с одной стороны в функцию можно было бы передать записи из `ledger-or.json`, а с другой, чтобы тип значения был минимально необходимый для выполнения операции.
