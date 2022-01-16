# Типы с доступом по индексу

В TypeScript объекты являются ассоциативными массивами (словарями), где ключом является строка. 

```ts
const dictionary = {
    language: 'TypeScript',
}
//получить доступ к значению можно зная имя ключа
const key = 'language';
console.log(dictionary[key]);
```

Компилятор TypeScript внимательно следит за доступом к свойствам. Он строже относится к синтаксису индексированных значений объектов. Сравните следующий отрывок

```ts
const dictionary = {
    language: 'TypeScript',    
}
const key:string = 'language';
console.log(dictionary[key]);// ошибка!
```

Чтобы использовать синтаксис доступа по индексу вы должны явно указать компилятору, что значение ключа относится к типу правильных ключей.

```ts
const dictionary = {
    language: 'TypeScript',    
}
const key: keyof typeof dictionary = 'language';
console.log(dictionary[key]);// снова компилируется без ошибок
```

Здесь мы познакомились с оператором `keyof`. TypeScript применяет его к типу для получения **объединения** всех его ключей.

```ts
const dictionary = {
    language: 'TypeScript',
    platform: 'any',
    types: 'structural',    
}

type keys = keyof typeof dictionary;
//type keys = 'language'|'platform'|'types'
```
[песочница](https://www.typescriptlang.org/play?ssl=8&ssc=44&pln=1&pc=1#code/MYewdgzgLgBAJgS2FB4CGAnAnjAvDAbwCgZSYAbNMAcwFc1qBTALhgHIAVLAB0YGVgGBNyhsANCTLdKUAGYgMAW1ZsqWcZNJQejCCugZayWhjTlxZGEQC+RItt4wA1oywQ8z1yFkwHjb-BIKOjYANxEAPQRfp5uHmyUNPRMbAA+bNJocgqKaWx+EGxAA).

Не всегда известны ключи по именам. Чтобы описать тип с произвольным количеством ключей используйте сигнатуру доступа по индексу

```ts
type CustomDictionary ={
    [key:string]: string,
};
```


## Составление структуры по именам ключей

В практическом использовании встречается потребность создать массив флагов и описать тип, где эти значения были бы ключами.

```ts
// массив объявляется с указанием as const. 
// это заставляет TypeScript рассматривать его 
// как запись и все элементы получают специализированные
// типы
const flags = [`archive`,'hidden','readonly','encrypted','system'] as const;

// извлекаем специализированные типы 
// в виде объединения 
type Flags = (typeof flags)[number];

// создаем описание типа
// где TypeScript в цикле 
// распределяет все элементы объединения
type FileInfo = {
    [key in Flags]:boolean;
}

// можем использовать 
// обозначенный тип
const systemSettings:FileInfo = {
    archive:true,
    encrypted:false,
    hidden:true,
    readonly:true,
    system: true,
};
```

Такой подход позволит сэкономить время и избежать нарушения синхронизации между списком элементов в массиве и фактически обозначенными ключами.
