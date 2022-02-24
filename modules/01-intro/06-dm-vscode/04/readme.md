# Дополним файл конфигурации

Мы дополним конфигурацию,предложенную TypeScript-ом, нашими соглашениями. В разделе `compilerOptions`

```diff
+    "rootDir": "./src",
+    "outDir": "./js",
```

и в корне

```diff
+  "include": ["./src"]
```

## Просто демо файлы

Добавим файл `main.ts` папку `scr` и заполним его одной строкой

```typescript
document.title = `${new Date().toISOString()} TypeScript compiled`;
```

Добавим файл `index.html` и укажем зависимость от скрипта

```html
  <script src="js/main.js"></script>
```

Обратите внимание, что в браузер следует подгружать JavaScript. Сейчас мы его и изготовим
