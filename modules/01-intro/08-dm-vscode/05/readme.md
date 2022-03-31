# Заключительные замечания

Во время работы вам могут понадобиться и другие настройки — как для компилятора, так и для других блоков: сборки, упаковки, развёртывания. В большинстве случаев поставщики и разработчики сообщают вам, как это сделать. При необходимости обращайтесь и к сообществу. Кто-то уже решил все ваши вопросы.

## Несколько слов о eslint

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

## А если все равно не получается?

В публичном репо академии вы можете найти пример - шаблон для проектов на TypeScript.

[https://github.com/htmlacademy/typescript-source/tree/main/ts-project-template/ts-template-master](https://github.com/htmlacademy/typescript-source/tree/main/ts-project-template/ts-template-master)
