# Информация об ошибке

Мы предложим использовать следующий тип для получения информации об ошибке от удалённого сервера:

```ts
export interface ApiError<TData> {
  status: "error";
  error: string;
  fieldsWithError: Partial<Record<keyof TData,string>>
}
```

В нашем случае удобно использовать специальный тип `keyof TData` обозначения договорённости, что в объекте `fieldsWithError` ожидаются не случайные поля, а те, которые присутствуют в форме. Вспомогательный тип Partial обозначит, что ошибки могут быть не во всех, а только в некоторых полях.

Эту декларацию мы поместим в файл [i-face-api-error.ts](https://codesandbox.io/s/step-1-demo-4-3-yhbcm?file=/src/i-face-api-error.ts).

Перейдём к описанию интерфейса успешного результата.
