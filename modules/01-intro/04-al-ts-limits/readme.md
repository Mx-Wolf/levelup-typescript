# Особенности TypeScript

TypeScript помогает при редактировании исходного когда программы. Однако во время работы программы никакого TypeScript нет — есть лишь обычный JavaScript. С этим связано множество жалоб, приведём некоторые из них: 

* Перед запуском программы на TypeScript требуется компиляция. Это дополнительное время.
* Абстрактные классы в TypeScript превращаются в конкретные функции JavaScript.
* Для использования в TypeScript «редких» JavaScript-пакетов требуется вручную создать декларации типов.
* Разработчик тратит рабочее время и силы на изучение особенностей нового языка.
* TypeScript не в состоянии выявить все дефекты программы.

Трудности TypeScript связаны не с ним, а с его отсутствием. Такие нюансы нужно знать и понимать, чтобы использовать силу инструмента по назначению

## Статический анализ и его ограничения

Компилятор TypeScript прикладывает максимум усилий, чтобы обеспечить согласованность различных частей API. Анализ производится на основе определений типов и операций над ними статически. Другими словами, обнаружение дефектов в программе производится без её запуска.

Во многих случаях этот метод позволяет повысить качество кода. Он находит места, которые могут привести к неправильной работе программы. Также статический анализ позволяет создавать единообразный код, который легче читать и сопровождать.

Однако статический анализ имеет ограничения. Как думаете, будет ли работать следующий код или завершится исключением?

<details>
<summary>Спойлер</summary>
Будет работать.
</details>

```typescript
const x = Math.random() < 0.5 ? 0 : 1;

console.log(42 / x);
```

[Попробовать в песочнице](https://www.typescriptlang.org/play?ssl=3&ssc=21&pln=1&pc=1#code/MYewdgzgLgBAHjAvDAsgQygCwHQCc1gAmIAtgBQCUMAPDAAzYCsMA-PTAFwwCMA3AFD9QkEABsAptlEgA5mQAsAJhgB6eBV5A).

**Важно!** Понимание особенностей операций над числами с плавающей точкой — это тоже полезное знание.

Статический анализ не понимает намерений программиста и не подскажет, если название функции не соответствует её алгоритму.

```typescript
const rectangleArea = (width: number, height: number): number => width + height;
```

Для TypeScript [этот фрагмент](https://www.typescriptlang.org/play?#code/MYewdgzgLgBATgU2FAhmA5gGwQQUSmAXhgAoB3ASwBMoALALhjAFcBbAIwTgBoZaEK6WlEYsOXAJSi2nOEQB8MSjVowA1HwFCoAbiA) является вполне приличным.

TypeScript не может контролировать обращение за пределы массива или к несуществующим свойствам:

```tsx
const arr:number[] = [];
const obj:Record<string, number> = {};

const elementOfArray = arr[0]; //TypeScript считает, что переменная имеет тип number. но её значение undefined
const propertyValue = obj["property"];// Такая же ситуация.
```

[Проверьте в песочнице](https://www.typescriptlang.org/play?ssl=5&ssc=58&pln=1&pc=1#code/MYewdgzgLgBAhgJwQLjAVwLYCMCmCDaAujALxEDcAUKJLCFgFbIBKOoCAJgDzQICWYAOYAaGOmx4AfKRgBvAL5Vq4aDBwAbHBhxgoAeQBmAQSRwAnjMQEADIXIwA9A6hmADjgjB+r2IEEQQOIggBwggEIggAwggKwgwaL+wYB8IDCA-CDhgAIg4YA8IOGAvCCZoYDyIDCBGZEwwYEJYpi4CKKZ8eHhMIDsIDn+WYENaGAcOAYCOBzKtDCuCCDuCC4AanDqaDgy9Az4AEQjY3guy3ZOJaGAXCB5MIBsIA2BvnHJgblAA).

Проконтролировать выход за пределы массива и другие краевые ситуации в работе алгоритма — задача разработчика. Было бы полезно иметь автоматические инструменты, которые позволили бы убедиться, что *динамические* намерения разработчика соблюдаются так же, как и намерения по использованию типов. Но это выходит за рамки возможностей TypeScript.

Подчеркнём, что у статического анализа есть свои преимущества. Этот метод действительно позволяет зафиксировать намерения разработчика с точки зрения типов и контролировать их соблюдения. Но надо что-то делать с контролем поведения программы.
