# Подключим redux

После создания хранилища в модуле [store.ts](https://codesandbox.io/s/step-4-demo-5-6-oy9k4?file=/src/store/store.ts) мы экспортируем определение типа данных в хранилище.

```ts
export type RootState = ReturnType<ReturnType<typeof initStore>["getState"]>;
```

этот тип мы будем использовать при исследовании thunk.
