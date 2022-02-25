# Реализация свёртки

Есть несколько вариантов написания функции сбора статистики по имеющимся требованиям. Мы остановились на свёртке редуктором.

В этом случае нам потребуется два отрывка: создание начального состояния аккумулятора и сам редуктор.

Начальное состояние — смотрим файл `report-seed.ts`.

```ts
export const reportSeed = ()=>new Map<CustomerId,DateTime>();
```

Функция редуктора проверяет, что предъявленный ей заказчик уже встречался, смотрит дату его прошлого заказа и при необходимости обновляет состояние (смотрим report-reducer.ts).

```ts
export const reportReducer = (
  report: Map<CustomerId, DateTime>,
  { customerId, datePlaced }: CustomerOrderDate,
): Map<string, string> => {
  if (isNewCustomerOrRecentDate(report.get(customerId), datePlaced)) {
    report.set(customerId, datePlaced);
  }
  return report;
};
```

Соединяя все вместе, получаем реализацию сбора статистики про клиента (смотрим `reporter.ts`).

```ts
export const createReport:Reporter = (orders) => orders.reduce(reportReducer, reportSeed());
```

Код [в песочнице](https://codesandbox.io/s/step-3-demo-03-08-module-03-safty-to-function-interface-msh4n).

Теперь зафиксируем поведение наших функций модульными тестами.
