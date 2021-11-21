# Интерфейсы и их реализация

## Интерфейсы структурных типов

Поскольку объекты реального мира сложнее примитивных чисел и флагов, разработчик моделирует реальность, собирая примитивные типы в структуры. Структуры по синтаксису похожи на объявления json объектов, где вместо значения используется имя типа.

Структуры сопровождаются ключевыми словами `type` или `interface`. Для многих, но не для всех, целей использование ключевых слов `type` и `interface` не отличаются.

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
Оба примера декларируют одно и то же намерение разработчика. Значения, которые принадлежат типу `StructureExample` можно присваивать переменным объявленным типом `AnotherExample`. Приведенные ниже выражения - корректны.

```typescript
const a1: StructureExample = {
    header:"typescript",
    useHeader: true
};
const a2: AnotherExample = a1;
```
Вы [можете убедиться](https://www.typescriptlang.org/play?target=7#code/C4TwDgpgBAysBOBXAxsR8IFEAeBDAtmADbQC8UA3gFBRQAWEuAJhPAFxQDOCAlgHYBzADQ0oiThAASjFuygAjAPaKSuPiIC+AbipV+wVgDNcyaAEE+i4A3g4CxaNVq0GzVh27x+Anc7ETpNzklFUY+HQ1dZEU+bihcAEYOOCRUdCw8QhIocidnV1k2ACJQSE5kLzBgIpE-cSkZdygERAgqbSpo2OB4gCYOCysbOyyyeIStIA), что компилятор совершенно спокойно воспринимает этот исходный код и создает правильный javascript.


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
interface SomeFace3 extends StructureExample{
    footer: string;
}
```
Однако с помощью `extends` не удасться определить новый псевдоним типа. Возможно, в этом мешает знак `=`? Тем не менее аналогичного результата можно добиться и при использовании `type` псевдонима. Это достигается операцией **объединения**.

```typescript
type SomeFace4 = StructureExample & {
    footer: string,
};
```
В примерах `SpecialExample`, `SomeFace3`, `SomeFace4` выражают идентичные намерения разработчика.

**К сведению.** Кроме операции объединения над типами в typescript можно производить и другие операции и мы познакомимся с ними в ходе нашего курса.

## Реализация интерфейса, классы

Простейший способ реализации интерфейса - создание переменной с аннотацией нужного типа.

```typescript
interface A{
    field: string;
}
const a:A = {
    field: 'value'
}
```

Интерфейсы могут содержать не только поля, но и методы, которые тоже [нужно инициализировать](https://www.typescriptlang.org/play?target=7#code/JYOwLgpgTgZghgYwgAgEIG8BQyfJsCAGwBMAuZAZzClAHMBubXMAewGVq6AKASlKpogGmAL6ZMCFiCrIARqVTIAvMiy48BEuQBEANziEArhG0AaJjlYdBtXmvW4oEMIaghkYABbAKAOnxExIzqYmISUjKeRAAO0Mp4hiAIYMBSyFxePgo86MhOLm4e3n4BJPRhktJgcgCMCsr2OKVkyNpwICxecfpGJubqVpxC5FGEsVCimEA). Ниже приводим несколько примеров.

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

const helper = function (this:B){ return this.field;}

const b1:B ={
    field: "another value",
    toString: helper
}

```

Современный javascript часто опирается на понятие class. Используя интерфейс можно описать класс, который этот интерфейс реализует. Вы используете ключевое слово `implements` для указания какой именно интерфейс вы намерены реализовать.

```typescript
interface EntityFace{
    field:string;
    toString():string;
}

class EntityImpl implements EntityFace{
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

В javascript возможность определить приватное поле с помощью `#` еще только ожидает своего часа. При этом в typescript разработчик может помечать поля и методы модификаторами, и компилятор проследит за их соблюдением правил доступа. Конечно, это все происходит лишь до окончания компиляции.

Для модификации атрибутов класса доступны модификаторы

* **private** для полей и методов, предназначенных лишь для использования в данном классе
* **protected** для полей и методов, предоставляющих сервис классам наследникам
* **public** (по умолчанию) для полей и методов, описывающих публичный api класса.

Typescript предоставляет модификатор **readonly** для обозначения полей, значения которых не должны изменяться после окончания работы конструктора. В следующем примере последняя строка вызывает ошибку компилятора *Cannot assign to 'field' because it is a read-only property.(2540)*

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