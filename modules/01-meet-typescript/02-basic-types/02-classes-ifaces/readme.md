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
## Наследование интерфейсов
При проектировании системы типов для программы разработчик может создавать иерархию интерфейсов. Для обозначения наследования используется ключевое слово `extends`. Переменные обозначенные расширенным типом наследуют поля исходного типа, а выражение в фигурных скобках добавляет новые поля.

```typescript
interface SpecialExample extends AnotherExample{
    footer: string;
}
const spec:SpecialExample = {
    footer: "работает",
    header: "typescript. Наследование",
    useHeader: true,
};
```
Наследовать можно и от интерфейса и от псевдонима типа.

```typescript
interface Iface3 extends StructureExample{
    footer: string;
}
```
Однако с помощью `extends` не удасться определить новый псевдоним типа. Возможно, в этом мешает знак `=`? Тем не менее аналогичного результата можно добиться и при использовании `type` псевдонима. Это достигается операцией **объединения**.

```typescript
type Iface4 = StructureExample & {
    footer: string,
};
```
В примерах `SpecialExample`, `Iface3`, `Iface4` выражают идентичные намерения разработчика.

Кроме операции объединения над типами в typescript можно производить и другие операции и мы познакомимся с ними в ходе нашего курса.