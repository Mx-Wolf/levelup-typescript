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

Приведённый выше отрывок сообщает инфраструктуре React, какой компонент (App) в каком месте страницы (document.getElementById('root')) необходимо размечать. Бизнес-логика приложения описана в файле `src\components\app\app.tsx` и связанных с ним модулях.
