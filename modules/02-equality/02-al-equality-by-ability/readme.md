# Все познается в сравнении

Когда пред компилятором TypeScript оказываются два типа, он может определить, являются ли эти типы эквивалентными? Ответ на такой вопрос может быть да или нет. TypeScript считает что типы эквиваленты, если они выглядят одинаково и действуют одинаково. Такой подход жаргон называет утиной типизацией: Если выглядит, ходит и крякает как утка - значит утка.

Над переменными `leadingRole` и `limitedEdition` в следующем примере можно производить одинаковые действия, для обрабатывающих функций они похожи до неузнаваемости. TypeScript не зря считает типы `Book` и `Hero` эквивалентными.

```tsx
type Hero = {
  name: string;
}

interface Book {
  name: string;
}

const leadingRole: Hero = { name: 'Leonardo da Vinci' }
const limitedEdition: Book = { name: 'The Art of Computer Programming' }
```

[Playground Link](https://www.typescriptlang.org/play?#code/C4TwDgpgBAEhBOB7KBeKBvAsAKClAdgIYC2EAXFAM7DwCW+A5gNw4C+OO9wCAZoQMbQAQokQBrDDjxFSFanUYts7bDn6J81KABsIhACb0GAJUS6KcJKgwES5KAHIAMhA2F4+5PsJQAavX5aBygVdU1gHVpiWm59AFFDYFoNChFxa3RbWUcAFQALaABBeAjEHigAYURiMABXbngoAAUkBngSaMZg1iA)

Таким образом, эквивалентность типов определяется их структурой. Типы с различной структурой - различные типы.

Когда перед компилятором TypeScript оказываются два различных типа он может задать вопрос, является ли один из них специализацией другого.

## Отношение специализации

Говорят, что тип **C** (_child_) является специализацией (**extends**) типа **B** (_base_) если везде где можно использовать **любое** значение типа **B** подойдет и **любое** значение типа **С**.

Там, где допускается всякое числовое значение, допускается и числовое значение 42. В этом смысле, тип числа 42 (конкретного числа) является расширением типа `number`;

```tsx
type FortyTwo = 42;
type AllNumbers = number;

declare function getAnswer():FortyTwo;
declare function getRandom():AllNumbers;

//TypeScript допускает такое присваивание
const v1:AllNumbers = getAnswer();

//а такое нет
const v2: FortyTwo = getRandom();
```

[Playground Link](https://www.typescriptlang.org/play?#code/C4TwDgpgBAYg9gVwE6gCoHc5QLxQCwBMA3ALABQokUAggDa0ByCAtgEYRIDOOUAdi+ySky5ACYQAxrQCGSaADMEvCcACWcXlADmEYNV6d0HABQBKAFzxkaTMPFTZCpSvWadwAErTeouMzPmdIwCHJzC5AD0EajgEADKEkiqYMBQgCwggHwggPwggMIggIIggFwggAwggKwggEIgUGVFBRklUFmAAiCAHCB5gEwgRU3tgLwgTSXkEhqcqQBuAIyB9ExsoTzu+oYmpuFkUUWV1bVQXeX9gyME5rCIKCAYWLjuXj5+ZkRAA)

Таким образом, типы могут быть эквивалентны, могут различаться. Различные типы могут быть связаны отношением "специализации" - отношение `extends` а могут быть не связаны друг с другом вовсе.

Используя эти знания TypeScript наводит порядок в вашем коде и подсказывает вам, если обнаружит логические нестыковки. Он удивится, если вы попытаетесь сравнить значения несвязанных типов. Вы получите в этом случае предупреждение. Ведь результат сравнения значений совершенно разных типов известен заранее. Следовательно, делает вывод TypeScript, вы где-то что-то напутали.

Оцените.
```tsx
type SomeType = string;
type OtherType = Date;

declare function getSomeType():SomeType;
declare function getOtherType():OtherType;

if (getSomeType() === getOtherType()){
  console.log('А смысл...')
}
//This condition will always return 'false' since the types 'string' and 'Date' have no overlap.
```

[Playground Link](https://www.typescriptlang.org/play?#code/C4TwDgpgBAyg9gWwgFXNAvFAzsATgSwDsBzAbgFgAoUSKAeWAAsJdVbMARAQ2AgsqoATCAGMANl1zQAZgFdCI4PjiEoxCMHhI2EABQBKAFxaUafsPGSZ8xctXrgDZqzQHDTljv5V80qLocTHQModDC1DQ8XSAN9AG8qKCgRFSw4MQgAOjE4Yl0AckAEEChAQRBAHhBAaRASwG4QTLr8-SoAXyoAelbkRnwsZJVBfCUVKAB3fDExKC4xYa4QHqlgWVxVfOkprAh87CIRaCY9tB78nAISLa5CQSh87l4txi4AN2hCOCg4Z9wJMEygA)

И ведь не поспоришь.

Среди множества типов значений в программах TypeScript есть те, которые достались о JavaScript. С ними мы познакомимся в следующем параграфе
