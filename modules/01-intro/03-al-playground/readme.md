# Испытательный полигон для проверки TypeScript идей

В ходе курса мы будем давать ссылки на песочницу. Этот инструмент создатели TypeScript предоставляют знакомства с возможностями языка и для экспериментов. Онлайн-редактор песочницы вы можете найти по адресу [https://www.typescriptlang.org/play](https://www.typescriptlang.org/play).

Цель песочницы - предоставить безопасное окружение, которое не требует установки, где вы можете работать с TypeScript кодом. Вы можете делиться ссылками на модели и примеры, созданные в песочнице, с коллегами.

При необходимости редактор может импортировать описание типов из npm.

![Вид окна песочницы](assets/playground.png)

В левой части окна вы можете описывать программу на TypeScript, а в левой изучать результаты работы компилятора. В частности, вы можете в правой части  

* рассмотреть результат JavaScript  
* Изучить сообщения об ошибках (если они есть)
* Изучить определения типов, созданных компилятором
* Прочитать вывод на консоль
* Подключить дополнительные плагины

Песочница предоставляет ряд инструментов и настроек, которые дополняют редактор. Вы можете изменять настройки и флаги компиляции на закладке TS Config.  

Песочница предназначена для исследования возможностей TypeScript, другими словами, не предназначена для запуска результатов компиляции... Создатели, все же предоставили кнопку Run. Это минимализм. При нажатии на эту кнопку происходит  

* Компиляция TypeScript в JavaScript
* Удаляются ссылки на “reflect-matadata”
* JavaScript запускается в контексте сессии браузера
* Результаты вызова методов log, debug, warn error выводятся в правой части окна

Для запуска вы можете использовать Ctrl+Enter (Cmd+Enter)

## В борьбе за качество кода

Перед тем, как погрузиться в основной материал курса исследуйте в песочнице приведенные ниже примеры. Попробуйте **пропустить** ошибку. Вы убедитесь, что даже в самых простых случаях, вы получите хорошую защиту от опечаток и тем самым сэкономите время поиска дефектов.

Под надзором TypeScript следующая программа компилируется успешно,

```tsx
function process(text:string) {
  return text.replace(/б/g, "с")
}
let a = "боль";
process(a).toUpperCase();
```

[Playground Link](https://www.typescriptlang.org/play?#code/GYVwdgxgLglg9mABABwE5wgUwM7YBRSYAeUAXNlKjGAOYCUiA3gFCKKqZQipKEkB0HZABsAhljwB6QIwgkmgBpEAIkCCIErrMAvs2GdEoxAF5l0wHwggbhBAMiBKA3MzQYc+UXX5Q4AVWTJMqAMKi2Jh4dDZAA)

а следующие две предупреждают разработчика еще в редакторе, что договоренности не соблюдаются.

```tsx
function process(text:string) {
  return text.replace(/б/g, "с")
}
let a = null;
process(a).toUpperCase();
//      ^
//      Argument of type 'null' is not assignable to parameter of type 'string'.(2345)
```

![Ошибка использования](assets/err1.png)

[Playground Link](https://www.typescriptlang.org/play?#code/GYVwdgxgLglg9mABABwE5wgUwM7YBRSYAeUAXNlKjGAOYCUiA3gFCKKqZQipKEkB0HZABsAhljwB6QIwgkmgBpEAIkCCIErrMAvs2GdEoxAF5EYEMOEBuZmgw58ouvyhwAqsmSZUAYVHZMeOgsgA)

И здесь тоже предупреждает

```tsx
function process(text:string) {
  return text.replace(/б/g, "с")
}
let a = 0;
process(a).toUpperCase();
//      ^
//      Argument of type 'number' is not assignable to parameter of type 'string'.(2345)
```

![еще одна ошибка](assets/err2.png)

[Playground Link](https://www.typescriptlang.org/play?#code/GYVwdgxgLglg9mABABwE5wgUwM7YBRSYAeUAXNlKjGAOYCUiA3gFCKKqZQipKEkB0HZABsAhljwB6QIwgkmgBpEAIkCCIErrMAvs2GdEoxAF5EABgDczNBhz5RdflDgBVZMkyoAwqOyY8dM0A)

Используйте ссылку и убедитесь сами в песочнице  TypeScript .
