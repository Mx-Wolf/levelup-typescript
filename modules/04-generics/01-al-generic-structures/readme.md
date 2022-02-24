# Типы структуры в общем виде

В разделе об объединении типов мы обсуждали получение данных из удалённого сервиса. Давайте расширим нашу систему типов, чтобы позволить нескольким разным удалённым хранилищам предоставлять данные и сведения об ошибках единообразно.

TypeScript позволяет моделировать структуру интерфейса, в том числе обмена по сети, в общем виде.

Вспомним, как мы определили тип для успешного результата:

```ts
interface Messages{
    status: 'success';
    items: string[];
}
```

Очевидно, что элементы массива `items` в разных случаях могут быть различными. TypeScript позволяет учесть эту договорённость указанием на то, что о типе элементов мы договоримся позднее.

```ts
// В угловых скобках мы указали
// условный идентификатор типа
// переменную типа типа
interface Messages<T>{
    status: 'success';
    // И договорились, что 
    // элементы массива будут иметь тот самый тип
    items: T[];
}
```

В этом определении интерфейса мы договорились только о той его части, которую нужно знать, чтобы определить степень успешности запроса.

```ts
type ApiResponse<T> = Messages<T> | ClientError | ServerError;
```

Используя созданную систему типов, мы можем определять конкретные сервисы:

```ts
declare const getMessages:()=>ApiResponse<string>;
declare const getContacts:()=>ApiResponse<{id:number, name: string}>;
```

И поручить TypeScript следить за правильным использованием результатов:

```ts
const response = getContacts();
if(response.status==='success'){
    const {id,name} = response.items[0];
    console.log({id,name});
}
```

[Посмотреть в песочнице](https://www.typescriptlang.org/play?removeComments=true&jsx=0&ssl=25&ssc=1&pln=20&pc=1#code/JYOwLgpgTgZghgYwgAgLIQM4bgc0wHgBUA+AbwChkrkMw4wBXDALmQHIMGEks2BuStQD0Q5IA4QZIBYQQHwggZhBpgJhBpgARAxgbhAxgQRBAMiDJA4iCAhEGnJBVEckCyIGsCsIIB4Qa4F4QA4GkQZLcAMIJs1iF75IEYQQGEQSUCDcXsDXSMwzXdbZ0BOEGQDMUB+EFNkYEgAWxZkQgBtAF0BAF9yUEhYRBQAZWgAN2gAUSgoAHsoCmoaOkY8jkboAFpoDqh+DLBgbIhCdoB5EAAbUAhWWihQHD4e8nLK6HgkZABhVYhwVvHu6lp6JlY2BAvwUbbOyZ7ZrFx13q2IB2+3IYAAngAHFAAQQhwAASpgIe0QBgIERiMgALxoTDYPAYDHIAA+Z1eYGunRJyHqUCaUEpUAE5AAJhAXnAoCgECjaMg8GB0L8CcwABQASixxFhCKRvPRm22xAEbI5XOQPNRYH5EDApxRdAQYBYEqlMsRGGRqPRpGALOYIAY2QARtAADTIEBwWYbMCAnClZXkciavlcy3y7E6vUGxDGiUCYAwUXhq1ogB0936WJzHC4PAwbHFtyooe1tpZbq9s1KUdT8vTWQguQKAAYShlQ+1lhB08t2jhRRWq96IKVxWVyEA).

Обобщённые структуры могут иметь несколько типов-параметров.

```ts
// Два типа-параметра для 
// использования в структуре 
interface Entity<TId, TData> {
    id: TId;
    data: TData;
}

type OfficeId = number & { OfficeId: void }
declare const findOffice: () => Entity<OfficeId, { title: string, floor: number }>

// позволяют там безопасно использовать определения.
const { id, data: { floor, title } } = findOffice();
```

В [песочнице](https://www.typescriptlang.org/play?removeComments=true&jsx=0#code/C4TwDgpgBA8gZnAlgYwgSQCZQLxQHYCuAtgEYQBOUAZFAN6wIroYBcUAbgPaJYC+AUIjzAKcAIaooAUWGJQAHgAqmADRRFAETHAxAPjr8oRqDzbKMAbkPGM2sWa06rA-hgjIANmPLRknPADOwFBIeBjwSKhsABQAlDj6MsByIPIRTKp0UMnAHhBsQeRCAOZqcB6cnORshKQUULy6-Px+gcH0PGq2Omz05ZXkajl5DaO4oeGMqHEWQA) вы можете увидеть поддержку и компилятора, и редактора.

## Ковариантность обобщенных структур

Отметим важное свойство, характерное большинству обобщённых структур — их ковариантность относительно операции специализации.

За этими словами скрывается факт из двух условий и следствия.

1. У нас есть два типа — таких, что тип **C** (наследник) является специализацией типа **B** (базы).
2. У нас есть обобщённый структурный тип **S&lt;T>**.

Тогда **S&lt;C>** является специализацией типа **S&lt;B>**. Можно сказать, направление специализации остаётся тем же самым.

Это означает возможность присваивать значения обобщённых типов друг другу.

```ts
// Обобщённый структурный тип.
interface Package<T>{
    id:number;
    payload:T;
}

// Специализация типа чисел используется
// при объявлении переменной c обобщённого 
// типа.
const cp:Package<42> = {
    id:0,
    payload:42
};

// Базовому воплощению обобщённого 
// типа можно присвоить значение воплощения
// специализированного типа.
const bp:Package<number> = cp;

// Но не наоборот.
const nop:Package<73> = bp;
```

Изучите поведение в [песочнице](https://www.typescriptlang.org/play?removeComments=true&jsx=0&ssl=13&ssc=28&pln=13&pc=1#code/JYOwLgpgTgZghgYwgAgAqINZwOYQDwAqAfAN4BQylywAJgFwgCuAtgEbQDcFVADnAJ4AbAPZx6BLgF8yZBMJABnMMgQ866BFlx4ALACYiyALzJyVavQAMAGm6U+Q0fX1lJXWfKXJWajVvxMbNCGJqrucorKIMK+mDj4AOwAzCHePFwA9BnmAHp5ZFkE-DwoAOR+8XiB7FBEpdQKyNHKcAoKwNggcKyCKGDCyGDFZRXayXUAdAXZyEUlyKXV0PXAjc3Ire2d3b2DA0PzpcmlE0A).
