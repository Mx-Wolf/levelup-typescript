# Структурная типизация: благо или помеха

Казалось бы, реализация функции `getMockSettingsManager` может быть выполнена с опорой на структурную типизацию.

Мы знаем, что у `SettingsManager` есть два публичных метода. И мы хотим этим знание воспользоваться (смотрим [файл](https://codesandbox.io/s/step-1-demo-18-module-3-2x7fh?file=/src/back-up-path.test.ts)), но у нас ничего не получается.

```terminal
Type '{ name: string; path: string; }' is missing the following properties from type 'SettingsManager': profileName, baseFolder

ts(2739)
```

Как? Это же та пара свойств, которая доступна публично, `profileName` — это же приватное поле!

Так хочет компилятор? Добавим?
