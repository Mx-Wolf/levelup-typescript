# Интерфейсы и их реализация
## Интерфейсы структурных типов
Разработчик моделирует реальность в терминах typescript используя интефейсы. Для многих, но не для всех, целей исользование ключевых слов `type` и `interface` не отличаются.

```typescript
type StructureExample = {
  header: string,
  useHeader: boolean,
};

interface AnotherExample {
    header: string;
    useHeader: boolean;
}
```
Оба примера декларируют одно и то же намерение разработчика. Значения, которые принадлежат одному типу можно присваивать переменным объявленным вторым типом. Приведенные ниже выражения - корректны.

```typescript
const a1: StructureExample = {
    header:"typescript",
    useHeader: true
};
const a2: AnotherExample = a1;
```
