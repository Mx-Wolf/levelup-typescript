# Выполняются ли модульные тесты?

Также, если всё сделано правильно, ваши настройки позволяют запускать процессы модульного тестирования.

```terminal
PS D:\sources\html-academy\courses\typescript> npm run test

> test
> mocha

(node:15976) ExperimentalWarning: --experimental-loader is an experimental feature. This feature could change at any time
(Use `node --trace-warnings ...` to show where the warning was created)


  main program
    ✔ should render result of createHeader

  formatDate in utils
    ✔ formats date   


  2 passing (124ms)  

PS D:\sources\html-academy\courses\typescript>
```

## Подсказки по настройке модульного тестирования

Мы будем использовать mocha, chai как инструменты модульного тестирования.

1. Установите пакеты
    * @types/chai - декларации типов для пакета оценки результатов модульного тестирования
    * @types/chai-spies - декларации типов для пакета "подстановки" тестовых реализаций функций
    * @types/jsdom - декларации типов для пакета имитации DOM во время тестирования на node.
    * @types/jsdom-global - декларации типов для пакета имитации окна браузера во время тестирования
    * @types/mocha - декларации типов для пакета запуска модульного тестирования
    * @types/sinon - декларации типов для пакета подмены импортируемых функций
    * chai - пакет помогает в оценке результатов теста
    * chai-spies - пакет помогает заменять некоторые функции на время тестирования
    * jsdom - пакет помогает эмулировать поведение DOM в тестовых целях при тестировании на стороне node
    * jsdom-global - пакет помогает эмулировать поведение DOM в тестовых целях при тестировании на стороне node
    * mocha - платформа для запуска модульных тестов
    * sinon - пакет для эмуляции функций, методов и много чего еще в целях тестирования
    * ts-node - пакет позволяет "проще" запускать TypeScript в среде node

    Все модули являются devDependency.

    ```cmd
    npm i -D @types/chai @types/chai-spies @types/jsdom @types/jsdom-global @types/mocha @types/sinon chai chai-spies jsdom jsdom-global mocha sinon ts-node
    ```

1. Измените настройку вашего проекта, так чтобы nodejs использовал es модули. Вы указываете тип проекта в файле package.json, добавлением на верхнем уровне ключа `type` со значением `module`. Сразу исправьте ключ scripts/test. и добавьте привычный script/start

    Файл **package.json**

    ```json
    {
      ///....
      "type":"module",
      "scripts": {
        ///.....
        "test": "mocha",
        ///.....
      }
      ///....
    }
    ```

1. Добавьте настройки mocha для работы в окружении typescript. Рекомендации можно найти [в документации](https://typestrong.org/ts-node/docs/recipes/mocha)

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
