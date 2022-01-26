# Настройка git и инструментов

В контексте разработки TypeScript приложений файлы исходных текстов хранятся в папке src и имеют расширения .ts, .tsx. Компилятор создает производные файлы .js. В прошлом разделе мы их направили в папку js. Эту папку не следует включать в репо.

Файл **.gitignore**

```text
js
```

## Линтер

Вы обращаете внимание на стиль написания исходного текста. Eslint поможет вам и в работе с typescript. Мы предлагаем базовую настройку, вы можете ее изменить, привести в соответствие с договоренностями вашей команды.

1. Установите пакеты eslint и eslint-config-htmlacademy, @typescript-eslint/eslint-plugin, @typescript-eslint/parser

```cmd
npm i -D eslint eslint-config-htmlacademy @typescript-eslint/eslint-plugin @typescript-eslint/parser
```

2. Добавьте настройки линтера в package.json или в отдельном файле `.eslintrc.json`.

Файл **.eslintrc.json**

```json
{
    "parser": "@typescript-eslint/parser",
    "plugins": [
      "@typescript-eslint"
    ],
    "parserOptions": {
      "ecmaVersion": 2020,
      "sourceType": "module"
    },
    "env": {
      "es2020": true,
      "browser": true
    },
    "extends": [
      "htmlacademy/vanilla",
      "plugin:@typescript-eslint/eslint-recommended",
      "plugin:@typescript-eslint/recommended"
    ],
  "rules": {
    "no-shadow": "off",
    "@typescript-eslint/no-shadow": "error"
  }
}
```

## Модульное тестирование

Мы будем использовать mocha, chai как инструменты модульного тестирования.

1. Установите пакеты
    * @types/chai - декларации типов для пакета оценки результатов модульного тестирования
    * @types/chai-spies - декларации типов для пакета "подстановки" тестовых реализаций функций
    * @types/jsdom - декларации типов для пакета имитации DOM во время тестирования на node.
    * @types/jsdom-global - декларации типов для пакета имитации окна браузера во время тестирования
    * @types/mocha - декларации типов для пакета запуска модульного тестирования
    * @types/sinon - декларации типов для пакета подмены импортируемых функций
    * chai - пакет помогает в оценке результатов теста
    * chai-spies - пакет помогает заменять некоторые функции (например колбэки) на время тестирования
    * jsdom - пакет помогает эмулировать поведение DOM в тестовых целях при тестировании на стороне node
    * jsdom-global - пакет помогает эмулировать поведение DOM в тестовых целях при тестировании на стороне node
    * mocha - платформа для запуска модульных тестов
    * sinon - пакет для эмуляции функций, методов и много чего еще в целях тестирования
    * ts-node - пакет позволяет "проще" запускать TypeScript в среде node

 @types/chai @types/chai-spies @types/jsdom @types/jsdom-global @types/mocha @types/sinon chai chai-spies jsdom jsdom-global mocha sinon ts-node

```cmd
npm i -D @types/chai @types/chai-spies @types/jsdom @types/jsdom-global @types/mocha @types/sinon chai chai-spies jsdom jsdom-global mocha sinon ts-node
```

2. Измените настройку вашего проекта, так чтобы nodejs использовал es модули. Вы указываете тип проекта в файле package.json, добавлением на верхнем уровне ключа `type` со значением `module`. Сразу исправьте ключ scripts/test. и добавьте привычный script/start

Файл **package.json**

```json
{
  ///....
  "type":"module",
  "scripts": {
    "test": "mocha",
    "start": "npm run build & npm run show",
    "build": "tsc",
    "show": "http-server -o"
  }
  ///....
}
```

3. Добавьте настройки mocha для работы в окружении typescript. Рекомендации можно найти [в документации](https://typestrong.org/ts-node/docs/recipes/mocha)

Файл **.mocharc.json**

```json
{
  "loader": "ts-node/esm",
  "extensions": ["ts", "tsx"],
  "spec": [
    "src/**/*.test.*"
  ],
  "watch-files": [
    "src"
  ]
}
```

## комит результаты

Отправьте ваш исходный код - заготовку будущего проекта в репо.

Теперь вы не просто готовы к продолжению курса, но вооружены по последнему слову техники.
