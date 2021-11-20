# Инициализация typescript для учебного проекта

## Подготовка пустого проекта

Мы будем создавать учебный проект в отдельной директории `level-up-typescript`.

```cmd
mkdir level-up-typescript
```

Для дальнейших действий эта директория будет текущей

```cmd
cd level-up-typescript
```

Инициализируйте npm package.

```cmd
npm init -y
```

Добавьте в список зависимостей http-server

```cmd
npm i -D http-server
```

установите typescript

```cmd
npm i -D typescript
```

инициализируйте typescript проект

```cmd
npx tsc --init
```

инициализируйте git

```cmd
git init
```

Создайте `.gitignore` и добавьте в него строки

```text
node_modules
js
```

отправьте первый комит в свежее репо.

```cmd
git add .
git commit -m "initial commit"
```

## Первые файлы

Добавьте в ваш проект файлы `./index.html`, отредактируйте `./tsconfig.json` по инструкциям из этого раздела.

Создайте главный модуль `./src/index.ts`, но подключите в index.html ссылку на `./js/index.js`. 

## Настройка запуска

Для удобства работы настроим запуск проекта в режиме отладки. Для этого добавим в секцию scripts файла package.json 

```json
"scripts": {
    "start": "npm run show & npm run compile",
    "compile": "tsc -w",
    "show": "http-server -o"    
  },
```
