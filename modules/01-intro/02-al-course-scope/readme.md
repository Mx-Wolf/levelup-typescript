# Цель курса

Работа на TypeScript требует знаний. В первую очередь нужно понимать взаимоотношения между значениями, чтобы  управлять всем разнообразием значений, которые получает ваша программа. Мы поступим разумно: рассортируем их и сгруппируем по определённым признакам — другими словами, разделим на группы. В этом курсе мы займёмся изучением этих групп — **типов** значений.

TypeScript — нечто большее, чем статический анализатор типов. Вам потребуется также понимание системы модулей: как они создаются и как загружаются. TypeScript может создавать модули и для браузера, и для node. 

Множество вариантов модульных систем, для которых TypeScript может создавать код:

* None — компилирует TypeScript, но не создаёт специфические форматы файлов для какой-либо системы загрузки модулей.
* CommonJS — система загрузки модулей, часто используется в работе на серверной стороне (nodejs) или упаковщиками (webpack).
* AMD — Asynchronous Module Definition — используется, например, загрузчиком `require.js`.
* UMD — Universal Module Definition — попытка унифицировать форматы и спецификации в области загрузки модулей.
* System — спецификация модулей, задуманная для реализации модулей типа ES6 в рамках стандарта ES5.
* ES2015, ES6, ES2020, ES2022 — стандартный формат модуля JS.
* ESNext — экспериментальный формат, возможно, для следующей версии JS.
* Node12 — формат модуля для nodejs.
* NodeNext — экспериментальный формат модуля для nodejs.

Мы не будем детально изучать особенности каждого формата в этом курсе.

TypeScript — это ещё и объектно-ориентированный язык. Поэтому, если ваша команда использует в работе принципы ООП, TypeScript станет хорошим помощником. В этом курсе мы тоже обратимся к классам TypeScript. При этом нашей задачей является изучение вопросов, связанных с типами классов: методологию ООП мы затрагивать не будем.

TypeScript — полезный инструмент в работе над новыми или уже существующими проектами — даже если они изначально работают в JavaScript. На начало 2022 года TypeScript используется всеми популярными экосистемами, в которых раньше был только JavaScript. Среди них [Angular](https://angular.io/guide/typescript-configuration), [React](https://create-react-app.dev/docs/adding-typescript/), [Node](https://nodejs.dev/learn/nodejs-with-typescript), [Next](https://nextjs.org/docs/basic-features/typescript), [Vue](https://v2.vuejs.org/v2/guide/typescript.html).

Мы не будем рассматривать вопросы сборки приложения и его развёртывания. При использовании упаковщиков (webpack), скорее всего, вы увидите больше знакомого, чем нового. Но мы посмотрим на применение методов модульного тестирования и будем использовать некоторые из них во время демонстраций. Каких-либо предварительных знаний о модульном тестировании вам не потребуется.

***

Итак, задача курса — изучить теорию типов TypeScript в минимально необходимом объёме, которого достаточно для ежедневной продуктивной работы. Вместе с теорией мы продемонстрируем и применим на практике подходы, ускоряющие работу как во время написания, так и во время сопровождения программных продуктов любого размера.
