# Интерполяция строковых литеральных типов

## Интерполяция строковых типов

Предположим, нам нужно для простых JavaScript-объектов данных создавать прокси. Наш прокси должен позволять заинтересованным функциям подписаться на изменения полей объекта. Компилятор TypeScript позволяет выполнить задачу безопасным способом.

```typescript
type WithSubscription<T> = T & {
    addEventListener(event: keyof T, handler: (target: T) => void): void;
    removeEventListener(event: keyof T, handler: (target: T) => void): void;
}
```

В этом примере мы воспользовались оператором `keyof`. Мы применили его к типу, который, как мы объяснили компилятору, нам будет известен позднее. Компилятор запоминает этот новый тип и в дальнейшем подсказывает, если мы его используем.

Ниже мы воспользуемся этим типом и объявим функцию. Она будет получать структурный объект, выполнять над ним определённые действия и возвращать новый объект. У нового объекта будут те же свойства, что и у исходного. Дополнительно у него появится два метода для подписки и отписки.

```typescript
declare function createObservableProxy<T>(
    value: T
): WithSubscription<T>
```

Так можно будет использовать наш API:

```typescript
const target = {
    name: "Tom Sawyer",
    age: 13,
};

const proxy = createObservableProxy(target);

proxy.addEventListener("age", () => undefined);

```

Проверьте [в песочнице](https://www.typescriptlang.org/play?#code/C4TwDgpgBA6glsAFgZQK4CMDOBjATnMYOAewDsAeAFQD4oBeKSqAMigG8AoKbqAQwBN+AUQBuEUsAAycTMHERcACghiJALigBrCCGIAzRgBooiXqX4AbBRsXBeuAOYRgGygEp6tEcTj83G718Abi4eXAgAW2IxUXEpGTlSBWVVFy0dfSMTM0trKFt7JzT3TyhAvwCffhCAXw4OfghsC3toPVRSbCIyKDwIXjkAeSwFEV50KwAFXGIADxAqakVQ7jGLVAhXDn9YBBQMHHxCEgoaeuwyWSg7R2d6dhWoUl4IzagAIkpiCKhkXgB3EAKd6GR68JwaACMAGZQTUQhwLqQrmAZvN7n0BhBhphRuMpmiQAVbsA3AjUXMQAA6ATCVLSWTyJTvcEQEH5Dx0WgdRp6OBJPwhIA). Редактор будет вам подсказывать, на какие события можно подписаться.

![intellisense](./assets/Capture2.PNG)

## Полезные операции со строковыми типами

Компилятор даёт удобный инструмент для изменения имён полей и для манипуляции строковыми типами. В рассмотренном примере хотелось бы называть событие не "name" или "age", а как-то более привычно, например, "onNameChanged". И этого можно достичь.

```typescript
type WithSubscription<T> = T & {
    addEventListener(event: `on${Capitalize<string & keyof T>}Changed`, handler: (target: T) => void): void;
    removeEventListener(event: `on${Capitalize<string & keyof T>}Changed`, handler: (target: T) => void): void;
}
```

Компилятор предоставляет ряд полезных типов для манипуляции строковыми типами:

- Uppercase&lt;StringType>: тип `type A1 = Uppercase<"name">` эквивалентен `type A2 = "NAME"`;
- Lowercase&lt;StringType>: тип `type A1 = Lowercase<"NAME">` эквивалентен `type A2 = "name"`;
- Capitalize&lt;StringType>: тип `type A1 = Capitalize<name>` эквивалентен `type A2 = "Name"`;
- Uncapitalize&lt;StringType>: тип `type A1 = Uncapitalize<"NAME">` эквивалентен `type A2 = "nAME"`

Попробуйте в песочнице заменить описание типа WithSubscription и посмотрите, какие названия для событий *придумает* компилятор.
