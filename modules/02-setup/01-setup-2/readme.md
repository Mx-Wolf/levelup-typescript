# Настройка git и инструментов

В контексте разработки typescript приложений файлы исходных текстов хранятся в папке src и имеют расширения .ts, .tsx. Компилятор создает производные файлы .js. В прошлом разделе мы их направили в папку js. Эту папку не следует включать в репо.

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
    "rules": {}
  }
```

## Модульное тестирование

Мы будем использовать mocha, chai как инструменты модульного тестирования.

1. Установите пакеты
   * "@types/chai
   * @types/chai-spies
   * @types/mocha
   * chai
   * chai-spies
   * mocha
   * ts-node

```cmd
npm i -D "@types/chai @types/chai-spies @types/mocha chai chai-spies mocha ts-node
```

2. Измените настройку вашего проекта, так чтобы nodejs использовал es модули. Вы указываете тип проекта в файле package.json, добавлением на верхнем уровне ключа `type` со значением `module`,

Файл **package.json**

```json
{
  ///....
  "type":"module"
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
