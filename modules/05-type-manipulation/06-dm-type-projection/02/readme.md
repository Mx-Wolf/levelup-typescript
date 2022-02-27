# Фабрики действий

Изучим [функции создания](https://codesandbox.io/s/step-2-demo-5-6-xe38p?file=/src/actions.ts:332-789) действий.

Когда коллеги читают `postMessage`, они могут сделать вывод, что при развитии приложения аргумент этой функции эволюционирует синфазно с формой интерфейса `Message`. Только надо исключить дату прочтения, что естественно для нового сообщения.

При изучении функции `deleteConversation` можно сделать вывод, что её аргумент тоже имеет отношение к `Message`, но использует лишь значение адресата, чью переписку нужно удалить.

К слову, мы обращаем внимание на использование ключевого слова **as const**. Он подсказывает TypeScript возможность создания распадающегося объединения:

```ts
export type MessageActions =
  | ReturnType<typeof postMessage>
  | ReturnType<typeof readMessage>
  | ReturnType<typeof deleteMessage>
  | ReturnType<typeof deleteConversation>;
```

В этом отрывке написано указание TypeScript:

- изучить функции `postMessage`, `readMessage`, `deleteMessage`,`deleteConversation`;
- выяснить типы их результатов (**ReturnType<>**);
- создать объединение `MessageActions`.

Благодаря **as const** результат объединения окажется распадающимся, поскольку типы ключа `type` будут литеральными специализациями, а не строками в широком смысле. И эти пять строк эквивалентны тем, что написаны выше.

```ts
type MessageActions = {
    readonly type: "POST_MESSAGE";
    readonly payload: Omit<Message, "read">;
} | {
    readonly type: "READ_MESSAGE";
    readonly payload: Pick<Message, "read" | "id">;
} | {
    readonly type: "DELETE_MESSAGE";
    readonly payload:Pick<Message, 'id'>;
} | {
    readonly type: "DELETE_CONVERSATION";
    readonly payload: Pick<Message, "to">;
}
```

Мы рекомендуем использовать возможности TypeScript для сокращения времени.
