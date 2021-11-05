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

## Реализация интерфейса, классы
Простейшый способ реализации интерфейса - создание переменной с аннотацией нужного типа.

```typescript
interface A{
    field: string;
}
const a:A = {
    field: 'value'
}
```

Интерфейсы могут содержать не только поля, но и методы
```typescript
interface B{
    field: string;
    toString():string;
}

const b:B = {
    field: "value",
    toString(){
        return this.field;
    }
}
```
Используя интерфейс можно описать класс, который этот интерфейс реализует.
```typescript
interface EntityIface{
    field:string;
    toString():string;
}

class EntityImpl implements EntityIface{
  field: string;
  constructor(){
      this.field="value";
  }
  toString(): string {
    return this.field;
  }
}
const entity = new EntityImpl();
```

Классы в typescript заслуживают отдельного обсуждения.

## Классы, модификаторы доступа
В javascript возможность определить приватное поле с помщью `#` еще только ожидает своего часа. При этом в typescript разработчик пожет помечать поля и методы модификаторами, и компилятор проследит за их соблюдением правил доступа. Конечно, это все происходит лишь до окончания компиляции.

Для модифиации атрибутов класса доступны модификаторы

* **private** для полей и методов, предназначенных лишь для использования в данном классе
* **protected** для полей и методов, предоставляющих севрвис классам наследникам
* **public** (по умолчанию) для полей и методов, описывающих публичный api класса.

Typescript предоставляет модификатор **readonly** для обозначения полей, значения которых не должны изменяться после окончания работы конструтора. В следующем примере последняя строка вызывает ошибку компилятора *Cannot assign to 'field' because it is a read-only property.(2540)*

```typescript
class R{
    readonly field: string;
    constructor(){
        this.field = "value"
    }
}
const a= new R();
a.field= "change value";
```
Другими словами, во время разработки с использованием typescript в руках разработчика оказывается полноценный OOP-инструмент. Нам остается помнить, что вся эта магия заканчивается после компиляции.