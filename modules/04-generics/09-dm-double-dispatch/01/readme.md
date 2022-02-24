# Алгоритм создания отчёта

Отчёт можно создать в три шага:

1. Инициализация отчёта.
2. Сбор статистики.
3. Выполнение финальной обработки.

Из этого описания вырисовывается следующий шаг:

## Интерфейс посетителя

```ts
export interface ServiceLogVisitor<T, R = T> {
  getInitialState(): T;
  visitLogRecord(state: T, record: ServiceLogRecord): T;
  report(state: T): R;
}
```

[Интерфейс](https://codesandbox.io/s/step-1-demo-4-9-module-4-rv8vq?file=/src/i-face-visitor.ts) подсказывает, что для создания отчета следует выполнить метод `getInitialState`, затем в цикле, для каждой записи журнала `visitLogRecord`, в завершение преобразовать накопленные данные методом `report`.

Такой подход прекрасно соотносится с использованием метода `Array::reduce`

И в самом деле, все отчёты, которые можно изготовить по этой схеме, будут выполняться одним и тем же кодом.

## Диспетчер

```ts
export const dispatch = <T, R>(
  items: ServiceLogRecord[],
  visitor: ServiceLogVisitor<T, R>
) =>
  visitor.report(
    items.reduce(
      (state, item) => visitor.visitLogRecord(state, item),
      visitor.getInitialState()
    )
  );
```

Мы выбрали [такую реализацию](https://codesandbox.io/s/step-1-demo-4-9-module-4-rv8vq?file=/src/dispatch.ts) диспетчера записей в отчёт.
