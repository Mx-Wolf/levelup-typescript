# Вопрос в единицах измерения

В JavaScript присутствует класс `Date` — разработчики часто сталкиваются со сложностями его использования. Часть своего жизненного цикла календарное значение проводит в виде строки ISO. Часть, возможно, в виде местного представления — нужно как-то различать строки, обозначающие даты, с учётом часового пояса, моментов перевода стрелок на летнее время и прочих нюансов.

Чтобы различать типы значений, TypeScript предлагает типы. Особенность в том, что для TypeScript строка — это строка, и неважно, по какому часовому поясу значение представляет время. То же относится и к числам: TypeScript считает числовым значение  для измерения температуры по Цельсию. Числом он считает и результат измерения насыщения крови кислородом.

В данной демонстрации мы рассмотрим вариант брендирования типов, который часто применяют, чтобы переложить на TypeScript обязанность по слежке за своевременным переводом значений между разными системами единиц.

Рассмотрим умный дом.

## Температура в комнате

Система умного дома получает сигнал о возвращении хозяина с работы и уточняет, насколько горячий кофе нужно приготовить. Всё бы ничего. Но если хозяин уехал в отпуск по обмену, а в его дом приезжает гость из США, то для нового жильца горячий кофе — напиток с температурой 200 градусов. Упс! И умный дом сгорел.
