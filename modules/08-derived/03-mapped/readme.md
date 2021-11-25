# Проекция типов

## Синтаксис доступа по ключу

Компилятор typescript внимательно следит за доступом к свойствам. Он строже относится к синтаксису индексированных значений объектов.

```typescript
type Settings = {
  baseUrl:string,
  lastLocale: string,
  lastTimezone: string,
}

declare const settings:Settings;

declare const key :string;
//const value = settings[key];
//              ^^^^^^^^^^^^^
//Element implicitly has an 'any' type because expression of type 'string' can't be used to index type 'Settings'.
//  No index signature with a parameter of type 'string' was found on type 'Settings'.(7053)

declare const setting: keyof Settings;
const value2 = settings[setting];
```

Чтобы использовать синтаксис доступа по индексу вы должны явно указать компилятору, что значение ключа относится к типу правильных ключей.

## Строковые индексируемые типы

Когда вам требуется хранить в значения с любыми ключами и использовать объект typescript (javascript) в качестве ассоциативного массива, вы можете проинструктировать typescript - допускать в качестве ключа любую строку

```typescript
type Dictionary = {
  [k: string]: string | undefined
};

declare const dictionary: Dictionary;
const translation = dictionary["definition"];
```

## Построение типа по ключам

Вы можете построить новый тип, зная тип его ключе. По сути это операция обратная `keyof`.

```typescript
type Flags = "strict" | "noImplicitAny" | "strictNullCheck";
type Options = {
  [k in Flags]:boolean
};

//type Options = {
//    strict: boolean;
//    noImplicitAny: boolean;
//    strictNullCheck: boolean;
//}
```

Во время определения индексируемого типа вы можете дополнительно использовать модификаторы

* `readolny` для указания компилятору - запретить запись в это свойство
* `?` для указания компилятору - наличие этого ключа необязательно.

Дополнительно можно использовать знаки `+` и `-` в значении "добавить модификатор" или "снять модификатор".

Мы может применить материал этого раздела для создания типа Writable - обратного типу Readonly.

```typescript
type Writable<T> = {
    - readonly [k in keyof T]: T[k] 
}

type EditSettings = Writable<{
    readonly strict: boolean, 
    readonly sourcePath: string,
    }>;

//type EditSettings = {
//    strict: boolean;
//    sourcePath: string;
//}
```

## Изменение наименования ключей

Комбинируя методику перебора ключей и интерполяцию строковых типов вы можете объяснять компилятору как новый тип выводится из знаний о существующем

```typescript
type Accessor<T>= {
    [K in keyof T as `get${Capitalize<K&string>}`]:()=>T[K]
}
```

Позволяет объявить новый тип, такой, что каждый ключ типо-параметра **T** трансформируется так, что у него появляется приставка get, сам он записывается  большой буквы и при этом становится функцией без параметров, возвращающих значения исходного типа.

Для примера на основе типа User  мы получим тип, значение которого могли бы выглядеть как в следующем примере.

```typescript
type User = {
    name: string;
    karma: number;
    admin: boolean;
}

const userAccessor: Accessor<User> = {
    getAdmin: () => true,
    getKarma: ()=>0,
    getName: ()=>""
};
```

[изучите в песочнице](https://www.typescriptlang.org/play?#code/FAFwngDgpgBAggYwVAzig9gJwDwBUB8MAvDAN7AyUwDaA0jAJYB2MA1lGOgGYy4wCGKGAAMA5lBAASUgGF+EBiH4AbBgC8o2egDIYKEJmaj8AX2EBdAFwwAFAEpihXHXPATwUJFgBVFFEzEZBRUTPwAtlDW+oZMogDcwZSs-Jhh-NZMAK5hAEb+CVQCACZhzNY56OjKUPxMCe7ACOhM+jCZfpiIyGhY1l2oGDi+-oQk5IXiIHAlZbYORIQGmVAANIkwk7Qpadb2CwAMaxMSAHLhkXMLAERXbnFAA) поведение компилятора при изменении имен ключей
