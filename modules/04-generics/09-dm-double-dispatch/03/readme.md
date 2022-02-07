# Реализация посетителя

В файле [age-cost-correlation.ts](https://codesandbox.io/s/step-2-demo-4-9-module-4-forked-96hiz?file=/src/visitors/age-cost-correlation/age-cost-correlation.ts) изучите одну из возможных реализаций посетилея.

При создании посетилея ему можно задать опорную дату, относительно которой он будет вычислять возраст автомобиля на момет обслуживания.

```ts
export const createAgeCostCorrelationVisitor = (
  reference: DateTime
): ServiceLogVisitor<AgeCostCorrelation> => {
  const refYear = new Date(reference).getFullYear();
  return {
    getInitialState: () => ({}),
    report: (state) => state,
    visitLogRecord: (state, item) => {
      const { year, total } = item;
      return year > refYear
        ? state
        : { ...state, ...collect(refYear - year, state, total) };
    }
  };
};
```

Функция collect добавляет к известной (накопленной) стоимости значение из текущей записи.

```ts
const collect = (age: number, state: AgeCostCorrelation, total: Amount) => ({
  [age]: makeAmount((state[age] || 0) + total)
});
```

Для этого отчета нам не потребовалось никаких дополнительных преобразований после окончания работы - `report` возвращает то, что получила без изменений.
