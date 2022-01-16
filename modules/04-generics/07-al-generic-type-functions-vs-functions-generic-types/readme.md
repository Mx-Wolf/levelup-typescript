# Обобщенный тип функции или функция обобщенного типа

Определим два сходных типа. Оба типа обозначают возможность вызова функции.

```ts
type VariableContext<T> = (arg: T)=>void;
type InvocationContext = <T>(arg: T)=>void;
```

Действительно, имея в наличии переменные одного и другого типа можно обозначить вызов функции

```ts
declare const doNumericAction:VariableContext<number>;
declare const doGenericAction:InvocationContext;

doNumericAction(42);
doGenericAction(42);
```

Следует помнить, что функция `doGenericAction` релализует алгоритм в общем виде, в то время как функция `doNumericAction` реализует числовой алгоритм. Обратите внимание на предупреждение компилятора в следующем отрывке

```ts
doNumericAction('no-no-no');
//              ^^^^^^^^^^
//Argument of type 'string' is not assignable to parameter of type 'number'.

doGenericAction('yes!');
```

Разница, как вы видите в том, что тип `VariableContext` определяет функцию для обработки данных выбранного типа, в то время как `InvocationContext` реализует алгоритм в обощенном виде. Попробуйте в [песочнице](https://www.typescriptlang.org/play?jsx=0&ssl=10&ssc=1&pln=14&pc=25#code/C4TwDgpgBAaghgJwJZwEYBsIGED2A7YCAD2AB4AVAPigF4oAKRAcwC4pyBKGygNxyQAmAbgCwAKFCQoASTx8AxnGBJ8uAsWC0oFSowSt2XXv2HjxAiPPSJo8-AGdNAnADkArgFsIyeQEF5yvgs8MhomGqEJKR4nqjelKJiFlY2UHZ4jlDOAOIQeN5IfgEqeCyyCkolERqJ5q6eBUWBePQALABMHIk5eY3+zW2dtUn1Xj79JfQA5Hg4ALSzCzhTXeIA9GtQW9s7OwB6B4dH62u++g0EUDgAZlCS0FOOyHhMU1BI9lCzmnD29khMPBhaDAHBQMCIOBeQgIK63e5QGaxbxTAB0ZhGuXy42K+GmIAg9gAhCshEA) сделать разные реализации. 

Предложите вариант `doNumericAction` для вывода четных чисел на консоль, а для нечетных их удвоенное значение.
Предложите вариант `doGenericAction` для вывода на консоль результата оператора typeof

Эти рассуждения относятся и к объявлению типа сигнатуры вызова

```ts
interface VariableContext<T>{
    (arg:T):void;
    description: string;
}
interface InvocationContext{
    <T>(arg:T):void;
    meta:string;
}
```

Ссылка на [песочницу](https://www.typescriptlang.org/play?jsx=0&ssl=9&ssc=1&pln=1&pc=1#code/JYOwLgpgTgZghgYwgAgGpysOAjANhAYQHtwIAPMAHgBUA+AbwFgAoZN5ACgwHMAuagJS8AbkWAATANwt2ycRADOCTAAcwwEr2QKwmEN2nMAvi1CRYiFAEkQohHHUlipCk1bsatLlD6CRYqRl2AFsIMDheHT0DFhNmFnkEXAwUBBIdOSIAOQBXUMwEAEEERxBedEwcfGdICkoQPOxoWkNE5KhU9LBMgHEIEGhgIpKNMps7B1Ga8jBDBOy8weHSjgAWACYBVqI+gYLilY2tlnnc-KGD0Y4AchAiAFo7x6Jr4+YAenfZb++APX+AYCWJ9Cj5FuBkEQYMgwABPFQoa5RUDca7IYAKZB3bpwBQKYDcEBVFBgIjIFQYOChcyQ6FwhHIW6NaDXAB0J2Y4h2-SWlxIN1higAhK9JEA) для любопытных.

Вы познакомились с двумя вариантами синтаксиса объявления функции обобщенного аргрумента. В одном случае вы планируете создавать алгоритм в самом общем виде, а во втором случае создавать реализацию для конткретного выбранного типа.
