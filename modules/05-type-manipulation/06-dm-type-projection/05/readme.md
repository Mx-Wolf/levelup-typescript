# Добавим использование thunk

На потребуются ссылки на пакет redux-thunk и на определения типов @types/redux-thunk. Мы [зарегистрируем thunk](https://codesandbox.io/s/step-5-demo-5-6-w5xrc?file=/src/store/store.ts) в качестве middleware при инициализации хранилища. Дополнительно обратите внимание, как мы поменяли сведения о диспетчере.

```ts
return {
  dispatch: dispatch as ThunkDispatch<
    ReturnType<typeof getState>,
    void,
    AnyAction
  >,
  getState,
  replaceReducer,
  subscribe
};
```

## добавим обработку регистрации сообщения

Для демонстрации мы создадим имитацию регистрации сообщения. В реальной жизни, возможно, севрвер определить дату регистрации сообщения, мы же изготовим [register-message.ts](https://codesandbox.io/s/step-5-demo-5-6-w5xrc?file=/src/store/register-message.ts) проще.

```ts
export const registerMessage = (message: Pick<Message, "to" | "body">) => (
  dispatch: Dispatch<AnyAction>,
  getState: () => RootState
) =>
  dispatch(
    postMessage({
      ...message,
      created: now(),
      from: getState().user,
      id: `message-${++lastId}`,
      posted: now()
    })
  );
```

или процесс отметки о прочтении

```ts
export const markAsRead = (message: Pick<Message, "id">) => (
  dispatch: Dispatch
) => dispatch(readMessage({ ...message, read: now() }));
```

## демонстрация в работе

Обычно вы не тестируете "библиотечный" код, но в данном случае мы используем скрее не модульный, а "почти" интеграционный [тест для демонстрации](https://codesandbox.io/s/step-5-demo-5-6-w5xrc?file=/src/store/store.test.ts) результатов помощи от TypeScript-а.
