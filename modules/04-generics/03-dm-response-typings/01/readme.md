# Информация об ошибке

Мы предложим использовать следующий тип для получение от удаленного сервера информации об ошибке

```ts
export interface ApiError<TData> {
  status: "error";
  error: string;
  fieldsWithError: Partial<Record<keyof TData,string>>
}
```

В нашем случае будет удобно использовать специальный тип `keyof TData` обозначения договоренности, что в объекте `fieldsWithError` мы ожидаем не случайные поля, а те, которые присутствуют в форме, а вспомогательный тип Partial обозначит, что ошибки могут быть не во всех а только в некоторых полях.

Эту декларацию мы поместим в файл [i-face-api-error.ts](https://codesandbox.io/s/step-1-demo-4-3-yhbcm?file=/src/i-face-api-error.ts)

Перейдем к описанию интерфейса успешного результата.
