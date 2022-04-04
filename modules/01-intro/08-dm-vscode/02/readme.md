# Создаётся ли результат компиляции?

После выполнения компиляции в директории `./js` должен появиться набор файлов .js.

```terminal
PS D:\sources\html-academy\courses\typescript> npx tsc
PS D:\sources\html-academy\courses\typescript> dir js | select name

Name
----
main.js
utils.js

PS D:\sources\html-academy\courses\typescript>
```

## Подсказки

В корневой директории проекта необходим файл `tsconfog.json` следующего содержания:

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

Внутри проекта в директорию `src` положите файлы `main.ts` и `utils.ts`. Вы можете взять их по приведённым к заданию ссылкам.

Запустите компилятор:

```terminal
npx tsc
```
