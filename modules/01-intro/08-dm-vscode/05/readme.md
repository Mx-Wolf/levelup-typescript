# Заключительные замечания

Во время работы вам могут понадобиться и другие настройки — как для компилятора, так и для прочих блоков: сборки, упаковки, развёртывания. В большинстве случаев поставщики и разработчики сообщают вам, как это сделать. При необходимости обращайтесь и к сообществу. Кто-то уже решил все ваши вопросы.

## Несколько слов о ESLint

Вы обращаете внимание на стиль написания исходного текста — ESLint поможет вам и в работе с TypeScript. Мы предлагаем базовую настройку, но вы можете её изменить, привести в соответствие с договорённостями вашей команды.

1. Установите пакеты eslint и eslint-config-htmlacademy, @typescript-eslint/eslint-plugin, @typescript-eslint/parser.

```cmd
npm i -D eslint eslint-config-htmlacademy @typescript-eslint/eslint-plugin @typescript-eslint/parser
```

2. Добавьте настройки линтера в package.json или отдельный файл `.eslintrc.json`.

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

## А если всё равно не получается?

В [публичном репозитории](https://github.com/htmlacademy/typescript-source/tree/main/ts-project-template/ts-template-master) HTML Academy вы найдёте пример — шаблон для проектов на TypeScript.
