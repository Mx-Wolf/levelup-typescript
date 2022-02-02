# Борьба за качество ПО это не только TypeScript

TypeScript позволяет опытным разработчикам создавать качественные продукты быстрее, надежнее и эффективнее. Статический анализатор TypeScript и другие сервисы обнаруживают узкие места в коде и позволяют разработчику принимать информированное решение. Посмотрите, как разработчик решил поступить при обнаружении попытки деления на 0.

```ts
const inverse = (value: number) =>{
    if(value===0){
        throw new RangeError();
    }
    return 1/value;
}

const inverseAlternative = (value: number)=>{
    if(value === 0){
        return Number.NaN;
    }
    return 1/value;
}

const yetAnotherInverse = (value: number)=> 1/value;

const report = (value:unknown)=>console.log(value);

const safeExec = (action:()=>void)=>{
  try{
      action();
  }
  catch(err){
      console.log(err);
  }
};

safeExec(()=>report(inverse(0)));
safeExec(()=>report(inverseAlternative(0)));
safeExec(()=>report(yetAnotherInverse(0)));
```

[Playground Link](https://www.typescriptlang.org/play?#code/MYewdgzgLgBAlmAbgUwE4WTAvDAFIgQwBsBXZALhjBIFsAjNASmwD4BvAKBm-gDN9iZLMIAMjTj0kwoAC1QgA7lWRKASgTABzZAFFU81LkYBuLjwC+Z7qmRQSqMDACMAekKlkpyx1CRYCFHRkAEEiKDQwAig4FGw8dzJKanomLHYrPgEPbGEYMQkpa1t7RwA5WgZUADpSglLTSUtJGzsHZzdBTw5vX2gYAE9bYLAQWTQASSQ0DDisxKoK1JZ2hK6fcD6bAAcQVFgcOYoSMABrEYUwRjTekCJkKqIQTUOTDnW-GAgCXl0AD2RgLMCMBouByEY0ogQHAACZXdLcKCofoFSTA0FgIwNGBNGDAKLAGS4NCocQZbg3O4PJ7E-SvbiWcymDhfH46f7AXAQljbXZQXABabIXBiRivVl-AFc+G8vYCqZBULhBxRGLC0Xi76Sznc2X8wZQYajGQTBUYEVi15AA)

Во всех трех случаях `inverse`, `inverseAlternative`, `yetAnotherInverse` готовы к работе и синтаксически корректны. Предположим, что разработчик принял решение использовать один из этих вариантов в проекте. TypeScript проконтролирует типы значений и все будет хорошо.

Предположим, так же, что во время реализации новых требований со стороны заказчика, выяснилось, что поведение функции инвертирования следует изменить. Конкретно, вместо Number.NaN возвращать Number.NEGATIVE_INFINITY или Number.INFINITY, чтобы не треять знак значения. С точки зрения TypeScript ничего не поменяется.

Как вы думаете в чем риск такого изменения?

## О качестве разработки

Получается, что TypeScript не гарантирует нам спокойствие. Чтобы усилить наши позиции и улучшить качество наших разработок нужны еще несколько инструментов. Сейчас мы поговорим о трех из них

* модульное тестирование
* адекватная архитектура
* автоматизация развертывания

## Модульное тестирование

Существует несолько философских течений о том, как лучше использовать модульное тестирование. Следуте ли начинать разработку с создания тестов/спецификаций? Или может быть тестировать когда все сломается? По нашему мнению модульное тестирование должно исследовать только "код автора" (а не используемых библиотек) и фиксировать поведение алгоритма, фиксировать принятые разработчиком решения.

```ts
describe('инвертирование числа', () => {
    it('возращает NaN при инвертировании нуля', () => {
        expect(Number.isNaN(inverseAlternative(0))).eq(true);
    });
});
```

## Архитектура ПО

Хорошая архитектура ПО проста и понятна, ее легко развивать. В любом случае полезно иметь представление о ней. Существует множество формальных описаний шаблонов проектирования, и они могут быть полезны. Почитайте литературу по этому вопросу. Без сомнения, эти сведения обогаят ваш арсенал разработчика.

## Автоматическое развертывание

На тему CI/CD говорят много и заслуженно. Главный риск при развертывании, обновлении приложения это люди. Человеческий фактор может остановить на пол дня ЦОД Амазона или затереть ИНН всех клиентов в базе данных вкладчиков банка. Делайте все от вас зависящее, чтобы разветрывание производилось роботами. Они железные и без эмоций.
