# Редукторы для действий

Создавая код редуктора [message-reducer.ts](https://codesandbox.io/s/step-3-demo-5-6-t5215?file=/src/store/message-reducer.ts) или [user-reducer.ts](https://codesandbox.io/s/step-3-demo-5-6-t5215?file=/src/store/user-reducer.ts), вы используете ранее реализованные объединения действий, и тогда TypeScript помогает вам.

Изучите в каждой веточке case тип значения `payload` TypeScript определяет верно.

Нужно только помнить, что redux будет вызывать ваш редуктор и для других действий тоже, поэтому в конце вы видите `return state`.
