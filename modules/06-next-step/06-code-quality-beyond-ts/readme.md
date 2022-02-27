# Борьба за качество ПО: TypeScript и не только

TypeScript позволяет опытным разработчикам создавать качественные продукты быстрее, надёжнее и эффективнее. Статический анализатор TypeScript и другие сервисы находят «узкие места» в коде и позволяют разработчику принимать решение. 

Посмотрите, как разработчик поступил при обнаружении попытки деления на ноль.

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

[Посмотреть в песочнице](https://www.typescriptlang.org/play?#code/MYewdgzgLgBAlmAbgUwE4WTAvDAFIgQwBsBXZALhjBIFsAjNASmwD4BvAKBm-gDN9iZLMIAMjTj0kwoAC1QgA7lWRKASgTABzZAFFU81LkYBuLjwC+Z7qmRQSqMDACMAekKlkpyx1CRYCFHRkAEEiKDQwAig4FGw8dzJKanomLHYrPgEPbGEYMQkpa1t7RwA5WgZUADpSglLTSUtJGzsHZzdBTw5vX2gYAE9bYLAQWTQASSQ0DDisxKoK1JZ2hK6fcD6bAAcQVFgcOYoSMABrEYUwRjTekCJkKqIQTUOTDnW-GAgCXl0AD2RgLMCMBouByEY0ogQHAACZXdLcKCofoFSTA0FgIwNGBNGDAKLAGS4NCocQZbg3O4PJ7E-SvbiWcymDhfH46f7AXAQljbXZQXABabIXBiRivVl-AFc+G8vYCqZBULhBxRGLC0Xi76Sznc2X8wZQYajGQTBUYEVi15AA).

Во всех случаях `inverse`, `inverseAlternative`, `yetAnotherInverse` готовы к работе и синтаксически корректны. Предположим, что разработчик принял решение использовать один из этих вариантов в проекте. TypeScript проконтролирует типы значений, и всё будет хорошо.

Представим ситуацию. Во время реализации новых требований со стороны заказчика выяснилось, что поведение функции инвертирования стоит изменить. Вместо Number.NaN нужно возвращать Number.NEGATIVE_INFINITY или Number.INFINITY, чтобы не терять знак значения. Со стороны TypeScript ничего не поменяется.

Как думаете, в чём риск такого изменения?

## О качестве разработки

TypeScript не гарантирует спокойствия. Чтобы усилить наши позиции и улучшить качество разработки, нужны дополнительные инструменты. Поговорим о трёх из них:

* модульное тестирование,
* адекватная архитектура,
* автоматизация развёртывания.

## Модульное тестирование

Существует несколько мнений о том, как лучше использовать модульное тестирование. Следует ли начинать разработку с создания тестов/спецификаций? Или тестировать, когда всё сломается? По нашему мнению, модульное тестирование должно исследовать только код автора, а не используемых библиотек, а также фиксировать поведение алгоритма и принятые разработчиком решения.

```ts
describe('инвертирование числа', () => {
    it('возвращает NaN при инвертировании нуля', () => {
        expect(Number.isNaN(inverseAlternative(0))).eq(true);
    });
});
```

## Архитектура ПО

Хорошая архитектура ПО проста и понятна, её легко развивать — важно иметь представление о ней. Существует множество формальных описаний шаблонов проектирования, и они могут быть полезны. Обязательно изучайте литературу по этому вопросу — эти сведения обогатят ваш арсенал как разработчика.

Советуем прочитать книги:
- «Чистый код. Создание анализ и рефакторинг» Роберта Мартина.
- «Чистая архитектура. Искусство разработки программного обеспечения» Роберта Мартина.
- «Design Patterns. Elements of Reusable Object-Oriented Software». Erich Gamma, Richard Helm, Ralph Johnson, John Vlissides.

## Автоматическое развёртывание

На тему CI/CD говорят много и заслуженно. Главный риск при развёртывании и обновлении приложения — это люди. Человеческий фактор может остановить на полдня ЦОД Амазона или удалить ИНН всех клиентов в базе данных вкладчиков банка. Делайте всё зависящее от вас, чтобы развёртывание производилось роботами. Они железные и без эмоций.
