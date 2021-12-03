# Установка typescript

## Перед установкой

Typescript это и дополнительный инструмент и синтаксис языка. Он позволяет вашему текстовому редактору лучше понимать ваши намерения и помогает вам создавать и улучшать код с уверенностью, что результат будет исполняться везде, где исполняется javascript. Этот инструмент требует установки.

Мы с вами будем работать локально. Вам потребуется nodejs и npm. Авторы уверены, то эти вещи у вас уже под рукой. Если ставить некуда, а познакомиться с typescipt хочется, это не беда. В интернете можно найти песочницу. О ней мы расскажем в следующем разделе.

## Начнем

1. Создайте директорию для практической работы. `mkdir level-up-typescript` и сделайте ее текущей  `cd level-up-typescript`
2. Инициализируйте npm package. `npm init -y`
3. Добавьте в список зависимостей http-server. `npm i -D http-server`
4. Создайте новый файл `index.html` и добавьте него обычный набор тэгов в соответствии с html5. Мы предлагаем такой вариант.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Typescript At Work</title>
</head>
<body></body>
</html>
```

Теперь вы можете запустить сервер `npx http-server -o` и убедиться, что закладка браузера имеет название `Typescript At Work` и в браузере отображается пустая страница.

Остановите http-server.

Наконец-то мы подошли к установке typescript.

5. Добавьте в список зависимостей пакета typescript. `npm i -D typescript`

Команда `npx tsc --version` позволит вам убедиться, что все идет по плану.

6. Инициализируйте конфигурацию tsconfig.json. `npx tsc --init`

Вы заметите, что в вашей директории появился файл `tsconfig.json`. Откройте и изучите этот файл в редакторе.

7. В этом файле сначала нас интересует строка `"target": ` Измените ее на `"target": "ES2020",`
8. Далее найдите и раскоментарьте строку `"module":`, измените ее, чтобы она стала `"module": "ES2020"`
9. Далее найдите и раскоментарьте строку `"outDir":`, измените ее, чтобы она стала `"outDir": "./js"`
10. Чтобы закончить конфигурацию typescript добавьте в tsconfig.json, перед самой последней `}` ключ и значение `"include": ["./src"]`. У вас должен получиться файл как представлено ниже (без учета комментариев)

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ES2020",
    "sourceMap": true,
    "outDir": "./js",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true
  },
"include": ["./src"]
}
```

Настало время испытаний.

11. Создайте вложенную папку `src`. Ту самую, которую мы ранее указали в tsconfig.json в предпоследней строке.
12. Создайте в папке src файл `index.ts` и добавьте в него обычные javascript инструкции. Мы предлагаем такие

```typescript
const helloElement = document.createElement("h1");
helloElement.innerText = "Движение вверх и вперед";
document.body.appendChild(helloElement);
```

13. выполните команду `npx tsc`. Она заставит typescript произвести компиляцию и вы увидите новую папку js, а в ней файл `index.js`
14. Отредактируйте index.html и добавьте в него строку с инструкцией загрузки скрипта `<script type="module" src="js/index.js"></script>` и перезагрузите браузер.

**Ваш первый код на typescript в этом курсе успешно выполнен!**
