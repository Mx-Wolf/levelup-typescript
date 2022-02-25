# React-анатомия

В директории приложения найдите файл `src\index.tsx`. Обратите внимание, что у него расширение не .ts, а **.tsx**. Это точка входа, с этого модуля начинается исполнение React-приложения.

```ts
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'));
```

React часто используется в связке TypeScript + JSX, где JSX — диалект XML.

Приведённый выше отрывок — «завязывание шнурков», а бизнес-логика описана в файле `src\components\app\app.tsx`.
