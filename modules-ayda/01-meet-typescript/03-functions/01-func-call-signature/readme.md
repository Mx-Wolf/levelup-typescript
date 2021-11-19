# Функции и сигнатуры
## Как описать функцию
Для программ на javascrip функции являются основным строительным материалом. Typescript расширяет доступный разработчику арсенал, но функции остаются важной частью системы. Поэтому следует уметь выразить намерения использования фукнций в разных обстоятельствах

Вы можете обозначить что переменная должна содержать функцию и может быть вызвана используя синтаксис, с виду похожий на стрелочную функцию

```typescript
const myFuncVar: ()=>boolean = ()=>true;
```
Этот код транслиуется в javascript предсказуемым образом. Описание типа изымается из текста.

```javascript
const myFuncVar = () => true;
```
Описание типа `()=>boolen` подсказывает компилятору, что функция не ожидает аргументов и возвращает значение типа boolean. Комплиятор использует эту информацию для статического анализа программы и информирует разработчика, если функция используется ненадлежащим образом.

Следующие выражения вызывают ошибку во время комплиляции

```typescript
const message:string = myFuncVar();//Type 'boolean' is not assignable to type 'string'.
const flag:boolean = myFuncVar("test"); //Expected 0 arguments, but got 1.
```
Описанию типа функции можно назначить псевдоним.
```typescript
type UsefulService = ()=>boolean;
const myFuncVar:UsefulService = ()=>true;
```
## Сигнатура функции в структурном типе
В Javascript функции являются полноценными объектами, к ним можно добавлять свойства. Typescript предусматривает специальный синтаксис, позволяющий разработчику объявить намерение иметь значение, которое можно вызвать `()` и использовать другие поля.

```typescript
type DescribedFunction = {
    ():boolean;
    description: string;
}
function logExecution(fn:DescribedFunction){
    try{
        fn();
    }
    catch(ex){
        console.log(ex,fn.description)
    }
}
```

## Сигнатура new
Вы исользуете ключевое слово `new`, как оператор при создании новых объектов. Typescript позволяет выразить намерения такого рода указанием `new` перед описанием типа функции. Это позволит компилятору контролировать конструирование новых объектов только конструкторами.

```typescript
type SomeObject = {/*..,..*/};
type ConstructableWithSetting = new (setting: string)=>SomeObject
function setWithSetting(ctor:ConstructableWithSetting){
    return new ctor("world");
}
```

Если вы опустите `new` в описании типа, то компилятор сообщит об ошибке
*'new' expression, whose target lacks a construct signature, implicitly has an 'any' type.*

Любой вариант описания функции позволяет указать типы ожидаемых аргументов.