# Типы с доступом по индексу

В TypeScript объекты являются ассоциативными массивами (словарями), где ключом является строка.

```ts
const dictionary = {
    language: 'TypeScript',
}
//Получить доступ к значению можно через имя ключа.
const key = 'language';
console.log(dictionary[key]);
```

Компилятор TypeScript внимательно следит за доступом к свойствам. Он строже относится к синтаксису индексированных значений объектов. Сравните следующий отрывок:

```ts
const dictionary = {
    language: 'TypeScript',    
}
const key:string = 'language';
console.log(dictionary[key]);// Ошибка!
```

Чтобы использовать синтаксис доступа по индексу, вы должны явно указать компилятору, что значение ключа относится к типу правильных ключей.

```ts
const dictionary = {
    language: 'TypeScript',    
}
const key: keyof typeof dictionary = 'language';
console.log(dictionary[key]);// Снова компилируется без ошибок.
```

Здесь мы познакомились с оператором `keyof`. TypeScript применяет его к типу для получения **объединения** всех ключей.

```ts
const dictionary = {
    language: 'TypeScript',
    platform: 'any',
    types: 'structural',    
}

type keys = keyof typeof dictionary;
//type keys = 'language'|'platform'|'types'
```

[Посмотреть в песочнице](https://www.typescriptlang.org/play?ssl=8&ssc=44&pln=1&pc=1#code/MYewdgzgLgBAJgS2FB4CGAnAnjAvDAbwCgZSYAbNMAcwFc1qBTALhgHIAVLAB0YGVgGBNyhsANCTLdKUAGYgMAW1ZsqWcZNJQejCCugZayWhjTlxZGEQC+RItt4wA1oywQ8z1yFkwHjb-BIKOjYANxEAPQRfp5uHmyUNPRMbAA+bNJocgqKaWx+EGxAA).

Не всегда ключи известны по именам. Чтобы описать тип с произвольным количеством ключей, используйте сигнатуру доступа по индексу:

```ts
type CustomDictionary ={
    [key:string]: string,
};
```

## Составление структуры по именам ключей

На практике бывает нужно создать массив флагов и описать тип, где эти значения были бы ключами.

```ts
// Массив объявляется с указанием as const. 
// Это заставляет TypeScript рассматривать его 
// как запись, и все элементы получают специализированные
// типы.
const flags = ['archive','hidden','readonly','encrypted','system'] as const;

// Извлекаем специализированные типы 
// в виде объединения. 
type Flags = (typeof flags)[number];

// Создаём описание типа,
// где TypeScript в цикле 
// распределяет все элементы объединения.
type FileInfo = {
    [key in Flags]: boolean;
}

// Можем использовать 
// обозначенный тип.
const systemSettings:FileInfo = {
    archive:true,
    encrypted:false,
    hidden:true,
    readonly:true,
    system: true,
};
```

Такой подход позволит сэкономить время и избежать нарушения синхронизации между списком элементов в массиве и фактически обозначенными ключами.

## О специализации типов значений элементов массива

Предыдущий отрывок содержит запись `type Flags = (typeof flags)[number];`. Давайте обсудим, что происходит в недрах компилятора и сервисов TypeScript при вычислении этой записи.

1. Обратим внимание на `as const` в конце первой строки отрывка. Эта запись требует от компилятора принять во внимание намерения разработчика _никогда_ не изменять содержимое массива. Ещё раз: константа — это не только переменная flags, но и всё содержимое массива. Нельзя ни добавить элементы, ни убрать их, ни заменить содержащуюся в нём строку на какую-либо другую.
2. В этих условиях массив становится кортежем из пяти определённых строк. Выражение `(typeof flags)` вычисляется в тип (**не значение**) `['archive','hidden','readonly','encrypted','system']`. Элементы кортежа имеют определённые типы. В нашем случае левый элемент кортежа обязан иметь тип — литеральную специализацию строки, а именно 'archive'. Аналогично самый правый элемент кортежа обязан иметь литеральный специализированный тип 'system'.
3. Выражение `[number]` информирует компилятор, что следует создать объединение типов элементов кортежа. В нашем случае `(typeof flags)[number]` становится эквивалентным `'archive'|'hidden'|'readonly'|'encrypted'|'system'`.

Подход вида 'массив as const' + typeof ...\[number\] позволяет изменять определение типа синхронно с изменением содержимого массива.
