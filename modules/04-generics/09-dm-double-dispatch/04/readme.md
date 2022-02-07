# Остальные посетители и их поведение

Использование методики _inversion of control_ удобно, когда нужно создать несколько, во многом похожих, отрывков кода. Создание остальных отчетов, вероятно, не вызовет затруднений.

Изучите реализации [customer-outstanding.ts](https://codesandbox.io/s/step-4-demo-4-9-module-4-1qrse?file=/src/visitors/customer-outstanding/customer-outstanding.ts), [service-center-totals.ts](https://codesandbox.io/s/step-4-demo-4-9-module-4-1qrse?file=/src/visitors/service-center-totals/service-center-totals.ts) и связанные с реализацией модульные тесты.

## Создание отчетов

Мы подготовили инфрастуктуру для создания отчетов по списку записке из журнала регистрации. Причем эти отчеты могут быть разной формы и при этом мы поручили TypeScript следить за типами используемых значений.
