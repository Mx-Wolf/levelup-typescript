# Использование "переменных" в операциях над типами

Ключевое слово `infer` может встречаться в конструкции условного типа и предназначено для указания компилятору *как назвать* тип в момент вычисления типов (т.е. в редакторе) если условие выполнено.

```typescript
type ResultType<T> = T extends (...args:unknown[])=> infer R? R: never;

declare function getName ():string;
declare function getAnswer():42;

type StringResult = ResultType<typeof getName>;
//type StringResult = string
type NarrowNumberResult = ResultType<typeof getAnswer>;
//type NarrowNumberResult = 42
type NotCallable = ResultType<true>;
//type NotCallable = never
```

В первой строке примера слово infer можно читать как: *уважаемый компилятор, если при использовании обобщенного типа ResultType тип-переменная будет удовлетворять условию, т.е. будет функцией, то для дальнейших вычислений типа назови тип результата функции буквой R*. Это и видно в приведенных примерах.

Кстати, такой обобщенный тип, похожий на ResultType уже приготовлен и готов к использованию в typescript "прямо из коробки".
