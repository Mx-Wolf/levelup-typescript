# Дополним файл конфигурации

Дополним конфигурацию, предложенную TypeScript, нашими соглашениями. В разделе `compilerOptions`:

```diff
+    "rootDir": "./src",
+    "outDir": "./js",
```

И в корне:

```diff
+  "include": ["./src"]
```

## Демо-файлы

Добавим файл `main.ts` в директорию `scr` и заполним его одной строкой:

```typescript
document.title = `${new Date().toISOString()} TypeScript compiled`;
```

Добавим файл `index.html` и укажем зависимость от скрипта:

```html
  <script src="js/main.js"></script>
```

Обратите внимание, что в браузер следует подгружать JavaScript. Сейчас мы им займёмся.
