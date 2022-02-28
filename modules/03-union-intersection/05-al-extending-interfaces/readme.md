# Интерфейсы и их наследники

## Интерфейсы структурных типов

Поскольку объекты реального мира сложнее примитивных чисел и флагов, разработчик моделирует реальность, собирая примитивные типы в структуры. Структуры по синтаксису похожи на объявления json-объектов, где вместо значения используется имя типа.

Структуры сопровождаются ключевыми словами `type` или `interface`. Для многих, но не для всех, целей использование ключевых слов `type` и `interface` не отличается. Оба примера декларируют одно и то же намерение разработчика. Значения, которые принадлежат типу `StructureExample`, можно присваивать переменным, объявленным типом `AnotherExample`. 

Приведённые ниже выражения корректны:

```typescript
type StructureExample = {
  header: string,
  useHeader: boolean,
};

// Пример интерфейса, эквивалентного интерфейсу StructureExample,
// но с другим именем.
interface AnotherExample {
  header: string;
  useHeader: boolean;
}

const a1: StructureExample = {
    header:"typescript",
    useHeader: true
};
// Для TypeScript фактическое название интерфейса не имеет значения.
// Название нужно людям, чтобы было удобнее договариваться.
const a2: AnotherExample = a1;
```

Вы [можете убедиться](https://www.typescriptlang.org/play?target=7#code/C4TwDgpgBAysBOBXAxsR8IFEAeBDAtmADbQC8UA3gFBRQAWEuAJhPAFxQDOCAlgHYBzADQ0oiThAASjFuygAjAPaKSuPiIC+AbipV+wVgDNcyaAEE+i4A3g4CxaNVq0GzVh27x+Anc7ETpNzklFUY+HQ1dZEU+bihcAEYOOCRUdCw8QhIocidnV1k2ACJQSE5kLzBgIpE-cSkZdygERAgqbSpo2OB4gCYOCysbOyyyeIStIA), что компилятор совершенно спокойно воспринимает этот исходный код и создаёт правильный JavaScript.

## Наследование интерфейсов

При проектировании системы типов для программы разработчик может создавать иерархию интерфейсов. Для обозначения наследования используется ключевое слово `extends`. Переменные, обозначенные специализированным типом, наследуют поля исходного типа, а выражение в фигурных скобках добавляет новые поля.

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

Наследовать можно и от интерфейса, и от псевдонима типа.

```typescript
interface SomeFace3 extends StructureExample{
    footer: string;
}
```

Однако с помощью `extends` не получится определить новый псевдоним типа. Возможно, этому мешает знак `=`. Тем не менее аналогичного результата можно добиться и при использовании `type` псевдонима. Это достигается операцией **объединения**.

```typescript
type SomeFace4 = StructureExample & {
    footer: string,
};
```

В примерах `SpecialExample`, `SomeFace3`, `SomeFace4` выражают идентичные намерения разработчика.

**К сведению.** Кроме операции объединения над типами в TypeScript можно производить и другие операции. Мы познакомимся с ними в ходе курса.

## Реализация интерфейса, классы

Простейший способ реализации интерфейса — создание переменной с аннотацией нужного типа.

```typescript
interface A{
    field: string;
}
const a:A = {
    field: 'value'
}
```

Интерфейсы могут содержать не только поля, но и методы, которые тоже [нужно инициализировать](https://www.typescriptlang.org/play?target=7&ssl=19&ssc=1&pln=1&pc=1#code/JYOwLgpgTgZghgYwgAgNImAcwBZgN4BQyxyAtgPZhjkBcyAzmFKJgNxEnMAmEAFAJQ1GzEGwIBfAgQTkQjZAGsWAJWAJscKFxrosuZAF5khEmUrU6AIgDi5Lsjgh7pAJ7JVOMJYA0HYtz5+E1NOCDAAVygQZAADODBkMGwUACF4sAAbFHIYZGtgenIoejoAEjwkgoA6CipycRj2U0lJaVl5ZIyAB2hDZBhwkAQwYFlkXkqS3U8g5CgwyOiYjLhkDPD1VZlwKFWM8nozDNAD5B5kADdgCHBaYnLJmvN6xtbt+S5ZAEVw4AAPSgQHQYTyGYLEWoWZCWAAyqy4wGOmBuCGAqwgh1IcC48zOKBWyAARuEbnALjcIrsfH45sAeHROj0oBICEA). Ниже приводим несколько примеров.

```typescript
interface Knight{
    motto: string;
    ride():string;
}

const kingRichard:Knight = {
    motto: "God and my Right",
    ride(){
        return `at the Battle of Gisors: ${this.motto}`;
    }
}

const helper = function (this:Knight){ return `la lucha contra los molinos de viento:  ${this.motto}`;}

const donQuixote:Knight ={
    motto: "La diligencia es madre de la buenaventura",
    ride: helper
}
```

Современный JS часто опирается на понятие class. Используя интерфейс,
можно описать класс, который этот интерфейс реализует. Вы используете ключевое слово `implements` для указания, какой именно интерфейс вы намерены реализовать.

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

Классы в TypeScript заслуживают отдельного обсуждения. В самостоятельной работе после этого параграфа вы встретите трудные вопросы для самостоятельного исследования.
