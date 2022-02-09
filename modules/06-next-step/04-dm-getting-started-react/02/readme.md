# React-анатомия

В папке вашего приложения найдите файл `src\index.tsx`. Файл имеет расширение не .ts, а **.tsx**. Это точка входа. С этого модуля начинается исполнение React приложения.

```ts
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'));
```

Реакт часто используется в связке TypeScript + JSX, где JSX это диалект XML.

Приведенный выше отрывок, - завязывание шнурков, а бизнес логика описана в файле `src\components\app\app.tsx`
