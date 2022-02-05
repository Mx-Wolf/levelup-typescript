# Структурная типизация - благо или помеха

Реализация функции `getMockSettingsManager` может быть, казалось бы, выполнена с опорой на структурную типизацию.

Мы знаем, что у `SettingsManager` есть два публичных метода, мы хотим этим знание воспользоваться (см. [файл](https://codesandbox.io/s/step-1-demo-18-module-3-2x7fh?file=/src/back-up-path.test.ts)), но у нас ничего не получается.

```terminal
Type '{ name: string; path: string; }' is missing the following properties from type 'SettingsManager': profileName, baseFolder

ts(2739)
```

Как? это же та пара свойств, которая доступна публично, `profileName` - это же приватное поле!

Если так хочет компилятор? Добавим?
