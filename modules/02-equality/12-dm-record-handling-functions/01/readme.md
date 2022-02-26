# Изучаем контекст задания

В файле с [выборкой данных](https://codesandbox.io/s/problemy-tipizacii-funkciy-dlya-raboty-s-zapisyami-uuezr?file=/src/ledger-01.json) обратим внимание на регистрацию событий с точностью до долей секунды и отметим, что нам придётся отбрасывать дробную часть суток.

В файле с [предоставленными интерфейсами](https://codesandbox.io/s/problemy-tipizacii-funkciy-dlya-raboty-s-zapisyami-uuezr?file=/src/i-faces.ts) отметим, что от нас требуется лишь дата и две суммы: сумма поступлений и сумма списаний.

```ts
export interface AccountDaily {
  date: string;
  debitDayTotal: number;
  creditDayTotal: number;
}
```

Общий контекст задачи перед началом выполнения может быть таким, как в [этой песочнице](https://codesandbox.io/s/problemy-tipizacii-funkciy-dlya-raboty-s-zapisyami-uuezr).
