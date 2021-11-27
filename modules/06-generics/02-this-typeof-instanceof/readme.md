# Практические примеры обобщенного программирования

## Поиск в дереве по идентификатору

Для реализации алгоритма поиска по дереву нам не требуется знать тип элемента, нужно только иметь возможность сравнить идентификатор и передвигаться по ветвям.

```typescript
type TreeNode<T> = {
    id: number,
    left: TreeNode<T> | undefined,
    right: TreeNode<T> | undefined,
    data: T,
}
```

мы может организовать простейший алгоритм для поиска в этом дереве данные идентифицированных числовым ключом. В случае, если искомый узел в дереве найден, мы возвращаем данные этого узла в форме типа `SearchSuccess`

```typescript
type SearchSuccess<T> = {
    found: true,
    data: T,
}
```

Если поиск не дал результатов мы сообщим об этом значением по форме типа `SearchFailure`.

```typescript
type SearchFailure = {
    found: false;
}
```

Когда наша функция поиска будет готова, она, в зависимости от результатов вернет либо `SearchSuccess` либо `SearchFailure`. Мы обозначим это объединение именем `SearchResult`

```typescript
type SearchResult<T> = SearchFailure | SearchSuccess<T>;
```

для удобства проверки результатов поиска мы можем воспользоваться функцией `isSearchSuccess`

```typescript
const isSearchSuccess = <T extends never>(result: Pick<SearchResult<T>, "found">):result is SearchSuccess<T> => result.found;
```

встроенный тип never подсказывает, что при выполнении проверки нам совсем ну нужен ключ data, даже если проверка успешна.

Мы можем сконструировать положительный результат с помощью функции `createSearchSuccess`.

```typescript
const createSearchSuccess = <T extends unknown>(node: Pick<TreeNode<T>,"data">) => ({ found: true, data: node.data} as const);
```

И теперь мы можем использовать рекурсию для поиска под дереву. 

**Внимание!** этот алгоритм не контролирует, является ли значение tree деревом или имеет в своем составе циклы

```typescript
function searchChildren<T>(children: Pick<TreeNode<T>, "left" | "right">, id: number) {
    const leftResult = findOnTree(children.left, id);
    return isSearchSuccess(leftResult) ? leftResult : findOnTree(children.right, id);
}

function findOnTree<T>(tree: TreeNode<T> | undefined, id: number): Readonly<SearchResult<T>> {
    if (typeof tree === "undefined") {
        return { found: false } as const;
    }
    return (tree.id === id) ? createSearchSuccess(tree) : searchChildren(tree, id);
}
```

целиком пример можно посмотреть [в песочнице](https://www.typescriptlang.org/play?ssl=29&ssc=2&pln=19&pc=1#code/C4TwDgpgBAKgThCA5A9gEwgHhgPigXigG8AoKcqASzQC4oA7AVwFsAjCOAbjIoBsIAZsDrxEqDNjwAfKI3oYBlehDTcKUOJQDmAC2GwEydFlxQZchUpVqKaAIbA7I7gF8SoSFADKEO3ADGOl6M-v4QAM7hkgTEPOQCKBZ0wHCMEDbk9o7OJG4e0D5+gQBidpS8jAgxpOoJSVACdrzh6bnu4AW+AToAShGMvMDRhIXdpeWV0DKjgcGhEVG43CT+KPThwFThM0EhYZEx2FAQAB7AEPLhDBAAbhw4ABQI4QP6AAqU-gDWmDt9L4NJAAaKAAIjq8lBOAAlDRnq8tt4urM9gthnh4YMAHQQ1QrNYbKD+BAOCA7Ob7K6EI6nc6XWT0L70FAAd3oj2ZGDoH2+2EM4hMOCBoKydih0IIeAeRAaiXkyVSEBBoronIgWNFLigdiuq3WwGhywEcn8wEoaygLSKOgAwjpymgEPRJA9Ag6ndzPj9REYJLgQaD+EJQWYwZpdMAoSDqKqWOw4BKahQ9YSg8B-gjCIp5AB5eg+1323iOi5YtPRtCGuIaCDASr0Lbk1GRB5pjODCUAfigbf6gygdGzaDzBbdxadWPDegrVbcJGN9FN5obQ5HhhdKUQIn5xmi5nkgisaArsbYHFhUD6djQa14IF+yN6faGuDwSfIlAEUAe+RQX830D4EBYIWIeyhoKCibVuoCB1nADYyrig5NC0UBajqRIEsAGRodWsH1t+AFYtQBDAdQXZEiS5xNvMLYARKdBWt0druhcP6GDOrhAA)


## Тип специальной переменной this

Typescript эксплуатирует интересным образом факт того, что javascript запрещает нам называть параметр функции словом this. Javascript запрещает, а Typescript разрешает.

Предположим у вас есть коллекция. Вы упаковали структуру коллекции внутри определения класса Collection, и предоставляете api для модификации или использования элементов в коде.

```typescript
interface Collectable{
    id:number;
    //...
    //другие поля
}
interface Collection{
    forEach(action:(item:Collectable)=>void):void;
    filter(predicate:(this:Collectable)=>void): Collectable[];
}

declare const collection: Collection;

collection.forEach(function(item){item.id+=1;});
const array = collection.filter(function(){return this.id%2;});

```

Сравним использование методов forEach и filter и отметим, что во втором случае функция callback-а получает доступ к элементу через значение специальной переменно this, а ее тип определен при описании интерфейса Collection. При этом typescript компилятор проследит за тем, чтобы значение `this.id` было в доступно.

## Использование typeof

При составлении выражений javascript вы можете использовать оператора typeof. Естественно, вы может использовать его для этих же целей и в программах на typescript.

```javascript
const value = 42;
if(typeof value === 'number'){
    console.log('Пример использования оператора typeof в javascript');
}
```

В контексте описания типов оператор typeof в typescript приобретает новый смысл.

```typescript
const box = {
    question:"the Ultimate Question of Life, the Universe, and Everything",
    answer: 42,
};
type TypeOfBox = typeof box;

```

С помощью этого оператора вы можете описывать тип извлекая его из известной переменной.

## Использование instanseof

При использования оператора instanseof следует помнить, что он возвращает boolean, а в правой части этого оператора следует указывать функцию-конструктор.

```typescript
class Fireman{
    ignitePaperAt(){return 451;}
}

const theHero:Fireman = new Fireman();

if(theHero instanceof Fireman){
    console.log('instanceof returns boolean')
}
if(typeof theHero === "object"){
    console.log('typeof returns type name');
}
```

## Ограничения на обобщенные типы

При отправке данные в удаленный api или при использовании сервиса обмена данными с `localStorage` вы заранее понимаете что рабочие значения должны допускать возможность преобразование в строку JSON. В остальном значения могут быть любой формы.

Один из подходов при объявлении такой функции - update - использовать обобщенное программирование.

```typescript
declare function update<T>(id:number, body:T):void;
```

Инструменты typescript позволяют нам уточнить, что значения аргумента body должны соответствовать правилам JSON. Мы можем определить эти правила в виде типа VanillaJson. 

```typescript
type VanillaJson = 
    boolean
    | number
    | string
    | null
    | {[k: string]: VanillaJson}
    | Array<VanillaJson>;
```

При наличии такого определения мы можем заставить компилятор проверять, является ли значение body специализацией типа VanillaJson с помощью ограничения на типо-переменную `T` указанием `T extends VanillaJson`. Вы можете читать это как *любое значение если это значение является специализацией типа VanillaJson*

```typescript
declare function update<T extends VanillaJson> (id: number, body:T):void;
```

Теперь компилятор отследит, чтобы мы не пытались сохранять в localStorage функции.

```typescript
update(2,{getName:()=>undefined});
```
```text
Argument of type '{ getName: () => undefined; }' is not assignable to parameter of type 'VanillaJson'.
  Types of property 'getName' are incompatible.
    Type '() => undefined' is not assignable to type 'VanillaJson | undefined'.
      Type '() => undefined' is missing the following properties from type 'VanillaJson[]': pop, push, concat, join, and 25 more.(2345)
```
[Вот ссылка на песочницу](https://www.typescriptlang.org/play?ssl=12&ssc=35&pln=1&pc=1#code/C4TwDgpgBAaghgOwJYBsVwFIGcD2CoC8UAUFGVAEY44oSKnkA+UCArgLYUQBODZzWYNyQIA5nyjM2aCcwDeAbQDWALiiDhYgLpr4yNJlwIAvrKgBBbtzggAPHtTpseAHwBuYsQAmEAMbpuaAAzVgRfYCQ8KFYwLzhgCFsAFSgIAA8EhC8sWERHQ1coAAokLzU2Th4AGkocLxAVJIBKFQA3HFKPYhi4hKKARiq5BDh2CDUAIgQIHAnjJo8e+IgigCYh0QhgADlR8aKmghdQnyCRCC95tyA)