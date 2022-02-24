# Демонстрация работы сервисов TypeScript

Создадим [временное описание](https://codesandbox.io/s/step-4-demo-4-3-ykbu0?file=/src/api.test.ts:115-533) успешного сервиса. Как только вы присвоите значение 'success' или 'error' полю status, редактор начёт подсказывать, какие следующие поля нужно заполнить.

```ts
const mockSuccessResponse: Api = () => {
  return Promise.resolve({
    status: "success", // Дальше редактор подскажет.
    rowCreated: {
      id: 0,
      dateEvent: SPECIAL_DATE,
      dateRequested: "today",
      guestsCount: 2,
      options: []
    }
  });
};
```

Похожее поведение вы будете наблюдать при написании отрывка для проверки:

```ts
it("Показывает, как работать с успешным результатом", async () => {
  const result = await mockSuccessResponse({
    dateEvent: "tomorrow",
    guestsCount: 2
  });
  if (result.status === "success") {
    //Здесь компилятор (редактор) подскажет.
    expect(result.rowCreated.dateEvent).toBe(SPECIAL_DATE);
    return;
  }
  fail();
});
```

## Разделяемое объединение

Discriminated Union полезно использовать в таких или похожих условиях, где полезная нагрузка значения может быть однозначно определена специальным признаком.
