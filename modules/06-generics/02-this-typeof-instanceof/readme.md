# Практические примеры объявления типов

## Тип специальной переменной this

Typescript эксплуатирует интересным образом факт того, что javascrpt запрещает нам называть параметр функции словом this. Javascript запрещает, а Typescript разрешает.

Предположим у вас есть коллекция. Вы инкапсулировали структуру коллекции, но предоставляете api для модификации или использования элементов в коде.

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
const struct = {
    question:"the Ultimate Question of Life, the Universe, and Everything",
    answer: 42,
};
type TypeOfStruct = typeof struct;

```

С помощью этого оператора вы можете описывать тип извлекая его из известной переменной.

## Использование instanseof

При использования оператора instanseof следует помнить, что он возвращает boolean, а в правой части этого оператора следует указывать функцию-конструктор.

```typescript
class Fireman{
    ignitePaperAt(){return 451;}
}

const montag:Fireman = new Fireman();

if(montag instanceof Fireman){
    console.log('instanceof returns boolean')
}
if(typeof montag === "object"){
    console.log('typeof returns type name');
}
```