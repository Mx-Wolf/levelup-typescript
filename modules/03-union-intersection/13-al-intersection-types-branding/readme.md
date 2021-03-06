# Пересечение типов, брендирование

В TypeScript определена операция пересечения типов.

Пересечением типов **Ta** и **Tb** называется тип, значения которого одновременно являются значениями  **Ta** и **Tb** и обозначаются `Ta & Tb`.

TypeScript остаётся верен идее эквивалентности типов с одинаковой структурой. В реальной жизни это означает, что число остаётся числом, какой бы синоним ему ни придумали.

С помощью пересечения типов можно требовать, чтобы аргумент функции был одновременно и значением типа `Person`, и значения типа `Serializable`. Когда нам требуется изготовить бирку для карточки товара с указанием скидки, нам нужны всё те же сведения, что и для обычной карточки, но при этом ещё и указание величины скидки.

```ts
// Для обычной карточки товара нам требуется
// набор дочерних элементов.
interface Container {
    children: HTMLElement[]
}
```

```ts
// Моделируем значения о скидке 
// с помощью интерфейса DiscountTag.
interface DiscountTag {
    percent: number;
}
```

```ts
// Функция для создания нужного UI
// должна получить значение, 
// обладающее одновременно признаками
// и Container, и DiscountTag.
const renderDiscountedCard = (props: DiscountTag & Container) => {

    const {
        // Эти сведения
        // нам доступны.
        children,
        // TypeScript и редактор
        // позволяют нам
        // убедиться в этом.
        percent,
    } = props;

    const div = createDiv();
    div.append(createSpan(formatPercent(percent)));
    children.forEach((item) => div.append(item));
    return div;
}
```

Посмотрите в [песочнице](https://www.typescriptlang.org/play?#code/JYOwLgpgTgZghgYwgAgCLAM4IPYFdwAqcA5sgN4BQy1yADtEuAFzIi4C2ARtANwUC+FUJFiIUAYWzg4oaOSo0EAC2AAbACZQIIFgAkCAWQAyAUVUR22sAG0AugIrqICVXC3IcIDGA9a4kdAA3FgAKAEpkAF4APmR9YyCzCys+Jxc3FE9vXwh-CABlWjgdZBDIAA8wFm8oUGIImLjDI0LipMtwVOdXdyyfGGwodn8ABQYrUMC4VVwIFjYuaAbYmrq+Cj7kLRAnKHQsPHAIdXE3dSjS2ihsWgwWfZx8MCJSADJkSWlZKGX5BWpNpQaMCPCoNNsADT-EH0KCMMBQ4H8C5XG4YdbAzbqYCBC4IPwBHHhPjA7GBAB0cFo9B2IXxuUgrRAIQGQ1G43AIVh8LCvJJijBmm05NZJkQShCIWAkHYvzJlOp2nUUplfOhWjAuCgIGQZL4-CAA), что получаете полную поддержку со стороны TypeScript.

## Брендирование значений

Во время работы сотрудники разных организаций придумывают различные системы нумерации договоров, приказов и прочих документов. Эти системы бывают настолько разработаны, что люди, ведущие документооборот, по одному только идентификатору могут сказать кто, когда и по какому поводу создал документ `20-Д-211/01`. Использование объединения типов позволяет нам смоделировать похожую систему нумерации.

В TypeScript такой подход называют брендированием.

```ts
type StaffId = number & { 'StaffId': void }
type OfficeId = number & {'OfficeId': void }
```

Функция бронирования переговорной требует теперь не просто два числа, а табельный номер сотрудника и инвентарный номер офиса. Мы как разработчики будем получать от TypeScript предупреждение, если попытаемся перепутать аргументы местами.

Сравните два примера TypeScript.

Сделаем псевдоним этому типу чисел для обозначения табельного номера сотрудника:

```ts
type StaffNr = number;
```

И сделаем другой псевдоним типу чисел для обозначения инвентарных номеров переговорных комнат:

```ts
type OfficeNr = number;
```

Создадим функцию резервирования переговорки:

```ts
declare const reserveMeetingRoom: (id1: OfficeNr, id2: StaffNr) => void;
```

При создании резервирования мы легко можем перепутать, где здесь первый, а где второй аргумент.

```ts
reserveMeetingRoom(32, 1024);
```

Сделаем псевдоним для бренда чисел. Обратите внимание на слово void: мы так обозначаем, что во время исполнения программы никаких накладных расходов для чисел не будет добавлено.

```ts
type StaffId = number & { 'StaffId': void }
type OfficeId = number & { 'OfficeId': void }
```

Определим функцию резервирования:

```ts
declare const reserveMeetingRoomBranded: (id1: OfficeId, id2: StaffId) => void;
```

TypeScript заставит нас задуматься, откуда мы получили число.

```ts
reserveMeetingRoomBranded(32, 1024);
//                        ^^
// Argument of type 'number' is not assignable to parameter of type 'OfficeId'.
//  Type 'number' is not assignable to type '{ OfficeId: void; }'.
```

Добавим конструкторы во время выполнения TypeScript. Обе функции выглядят одинаково (value)=>value и при наличии хвостовой оптимизации вообще исчезают из работающего кода.

```ts
const makeStaffId = (value: number) => value as StaffId;
const makeOfficeId = (value: number) => value as OfficeId;
```

Для законченности примера определим функции для поиска:

```ts
declare const findOfficer: (name: string) => number;
declare const findOffice: (color: string) => number;
```

Получим и сконструируем идентификаторы:

```ts
const officer = makeStaffId(findOfficer('Штирлиц'));
const office = makeOfficeId(findOffice('белый'));
```

Теперь мы не сможем перепутать порядок следования чисел.

```ts
reserveMeetingRoomBranded(office, officer);
```

Представленный код компилируется в JavaScript.

```js
"use strict";
reserveMeetingRoom(32, 1024);
reserveMeetingRoomBranded(32, 1024);
const makeStaffId = (value) => value;
const makeOfficeId = (value) => value;
const officer = makeStaffId(findOfficer('Штирлиц'));
const office = makeOfficeId(findOffice('белый'));
reserveMeetingRoomBranded(office, officer);
```

Вот код в [песочнице](https://www.typescriptlang.org/play?removeComments=true&jsx=0#code/FAehAJEEQQWEEVhBG4QQDCC0Dwg5D8IJWgmEEHwg1BeEEA4QNQWRBAhEFxUGEQcco9WwcRAit5xQJp5B5EHF0CMILkDsIAURNYxPuUQCEgGRACuQMwgucEpSxAAiCJOUcluqEigLhBdAFwCeABwCm4AMrmAhgDNXAOQBO4ALzgAOwBXAFsAI1svAG49Iig4JFRwaENVQE4QDCxsaFxiNHpGcBY2PW4+QRExCSlwIgJsSRktAkBpEEBREHUqbVxsPXRtWFU8ZvbwEyoxcmArO3AAeXcASwBjW28-QNCI6OA9SBFoRBJwQBEQagITQDEQIkA5EHAtWGFtbCItHsQa-oeh3C0TImAABNbMsADbOLz2ZYAewCAGdzOBIXDIgA3WwAWVstnMiwCAHMAErQ6EhABc4AAFItAQBGCkLVwrNZeAA04BpACYKU43J4vABKPwAPnAqOhNJifS0cX2wkOxDiDyeWheb2wHyIfBQLT08EG43AKFwgDYQJJfWCMGTkeRjSh0ajkDDPFppPSIO1qbCUN4ZRBaZTUTQEKbItGY7G4gnE0mUgDMnPZtIADJyACwCqVgeIIZBoTA4fDHMrgARaUgEQ5FVgIDjZ9AyiRoQQ6ejkWDgbB5TUdsRQeA9NTiml6HXgCjHCqicR59lMe14TsPFB8WKQdC4eAESRajBvZQ6FBj4hmf4dPRiExIQijHSQNr4HrJXjVtjqDsCIywJ05ASIbD6ko0w2PYvLuAAkoCGzBOEkTgAAZOAADe4AAORga4kGoRSw5QQAvsBsyMsykHQVscGIShqHEasWE4RK+G7NmuANrACTHGcFzXHcyrPK87xSECILgpC4AwvCiJhl46JYjieJEiSIQAEJeM4ATAoCFLUnSDJLLRgLslyPIuBBgJCr4oq4VmEAACogQ4yxeIs1iIsIiCQDILxOmIkDgG50BBogNqQOU5AmEYujZmOG7wNQLDwHExQDuACbAFJMmRvJMbKap6m2IC8aJuAKbppmejgBVlVVdVNUVQAenVegAIJePioS2AEiLQq44AzPYqEwdsqEcnCgTQoizhwnCiz4gEzhhKC9jmNC4DWBCzghDicHdb1IFoTRthYQAdOVdmzAN5FeMNiyjQE43gJN02zfNi29StfVoShB2QfRkrgHhqEnZwAC0oNg+DEOQ6DpSCP+xzjAQHmGCYPotHWEDYEuqB8NgLQxduNRnbYDlOS5-ByKc5xXEQALZrjyi8NAPBOkWl6DlSqLOKCQS2AKFmc9ztixHucRiAlLBxG0eAeYOGQsfQKBEG51xxMDna4IIgCSIB2rASG5NxTNmSv3LIuAyDc2uqGM+C6OJCLgCEzgANbEyZmFQf4lICzzFKDZE5mWVzPMPaNGGQTEduIo7LvfR7HNB7YvuXQHYoJyH8x6YdgLWc+fBuQj1RKB5cQNiQ2genoLEPOxaCcdTcQlhurBmEJYIQlCsL20y6kHV4WlzZtFIIk5BIp37OzAm3omR+A3eAgdWkwqC0J9+Aw-yWPl0xGAfSbnFxyygjSPUPx1BJEQcAhkQJymEFvy6jP3VMqsPj+NHrt8pBlJz73lKoYAFCD0C0AlS4qEBRlUfpnDY79Y7fzxPPTOf85DwFdGAsqfRLTaFtMeDskBjRmnzAMK0QVbQbi0DwHIJh+xsQEruYoCA0q2BRNJCMcloyKRUmpDSlIn7MnZLwl+mYgA). Попробуйте поменять местами аргументы.
