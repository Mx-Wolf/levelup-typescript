# Ключевое слово in в словарях

В этом параграфе мы познакомимся с возможностями TypeScript создавать типы словарей. Мы потренируемся использовать ключевое слово `in` и продолжим изучать обобщённое программирование.

Следующий отрывок использует цикл TypeScript по всем ключам типа-параметра и добавляет каждому из них признак «только для чтения»:

```ts
type LockType<T> = {
    + readonly [key in keyof T]: T[key]
};
```

Разберём строку `+ readonly [key in keyof T]: T[key]`:

- `+ readonly` добавляет к описанию каждого поля модификатор readonly. TypeScript позволяет как добавлять, так и стирать модификаторы. Чтобы стереть модификатор, используем знак `-` (минус).
- `[key in keyof T]` организует цикл по всем ключам из типа-параметра `T`.
- `: T[key]` указывает, какой тип следует зарегистрировать для данного ключа. Под «данным» мы понимаем, что при каждой итерации цикла значение типа-переменной `key` меняется.

Обратите внимание, что эта обобщённая типа-программа эквивалента исходному коду стандартного утилитарного условного типа Readonly.

## Тип ключа можно изменить

При составлении словаря условным типом мы можем поменять не только модификаторы ключа, но и тип значения. В следующем отрывке мы сделаем доступ к каждому ключу асинхронным.

```ts
type AsyncData<T> = {
    [key in keyof T]: Promise<T[key]>
};

interface AppState{
    users: string [];
    posts: string [];
}

type AsyncAppState = AsyncData<AppState>;

declare const state:AsyncAppState;

state.posts.then((data)=>{console.log(data)});
```

Этот отрывок отличается от предыдущего только тем, как указан тип нового свойства `: Promise<T[key]>`.

## Название ключа можно изменить

При описании условного типа-словаря можно поменять не только тип значения свойства, но и преобразовать имя этого свойства

Если собрать воедино знания о дискриминантных объединениях, о литеральных типах и об условных словарях, то вы сможете объяснить, что происходит в следующем отрывке:

```ts
//Интерфейс для иллюстрации.
interface Control{
    renderIn(container:HTMLElement):void;
}
//Программа на типах для TypeScript.
type UIControlFactory<T extends {tag: string}> = {
    [CurrentFactory in T as CurrentFactory["tag"]]:(settings: Omit<CurrentFactory,"tag">)=>Control
}
```

Мы требуем, чтобы входящий тип имел специализацию по отношению к {tag: string}. Ключевое слово `as` показывает, что именно это значение мы будем использовать в качестве наших ключей — методов. Методы фабрики будут получать в качестве параметра все ключи из текущего значения итерации CurrentFactory.

Предположим, у нас есть набор настроек для контролов:

```ts
interface MaskEdit{
    tag: "mask";
    mask: string;
}

interface AccountEdit{
    tag: "account";
    chartsOfAccounts: number;
}
```

Тогда наша программа изготовит тип — интерфейс фабрики для создания контролов:

```ts
type CorporateFactory = UIControlFactory<MaskEdit|AccountEdit>;

declare const factory:CorporateFactory;

factory.account({chartsOfAccounts:103});
factory.mask({mask:'# ##0.00'});
```

Проверьте реализацию в [песочнице](https://www.typescriptlang.org/play?ssl=23&ssc=33&pln=18&pc=1#code/JYOwLgpgTgZghgYwgAgMIHtxXQGwN4BQyxyUEIAJtAJIgAUCmYco0AXABIAqAsgDIBRHBAC25MAEo2AN3TAKAbgIBfAmACeABxQBVahiy4AYojDoo6gDxdkEAB6RKAZ2R5mAczbInYKKHfKAHzIALyuRCQA2qgArlBk4CYIZhbIoMg2cC6x8eJJKeqRAEQeRQC6ZWx0ThBgYP5OXgDyIsBgljkJYPnm6gA0JXDuRYESIYEGvrgqBASgkLCIKDxZANYCFG2EJMgeXkUia0VKO4dOq14+fiDuSqpz4NDwSMgAggiMMeAbWxHEe8giohPuBjn9kAgABZwKBgJxNGDvEFwrwgGIiABG0Dusw02jQ5k05jgkB6qTCekm2BwZKsK3OPzAAB8kegvmBGYElAQqAgcDCUIwQD5kM8CmwMFAiVASRBadyxb0AHTAtngOh4KEwuEI1nsxoARgADABmZQSJSKixKs6rDW2tgAcgAxMhnc6jUqjUbHeaFEA).
