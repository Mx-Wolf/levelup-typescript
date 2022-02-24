# Остальные посетители и их поведение

Использование методики _inversion of control_ удобно, когда нужно создать несколько отрывков кода, которые во многом похожи. Создание остальных отчётов, вероятно, не вызовет затруднений.

Изучите реализации [customer-outstanding.ts](https://codesandbox.io/s/step-4-demo-4-9-module-4-1qrse?file=/src/visitors/customer-outstanding/customer-outstanding.ts), [service-center-totals.ts](https://codesandbox.io/s/step-4-demo-4-9-module-4-1qrse?file=/src/visitors/service-center-totals/service-center-totals.ts) и связанные с реализацией модульные тесты.

## Создание отчётов

Мы подготовили инфраструктуру для создания отчётов по списку из журнала регистрации. Эти отчёты могут быть разной формы. И при этом мы поручили TypeScript следить за типами используемых значений.
