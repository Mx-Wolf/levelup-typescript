**Финальная манипуляция**

На этом шаге мы доопределим тип функции registerHandler таким образом, чтобы добавить работу с обобщённым типом с условием, что он будет специализацией строки. Смотрим файл query-string-router.ts.

Теперь нам удобно создавать обработчики запросов. TypeScript читает формат строки запроса и помогает правильно определить сигнатуру функции-обработчика. Смотрим файл main.ts.
