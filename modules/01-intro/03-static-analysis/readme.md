# Пишем и проверяем, пишем и проверяем

Typescript предоставляет разработчику инструмент для создания условий исключающих случайный вызов функций (типа `process`) с неверным количеством и типом параметров. Это достигается при помощи дополнения текста программы javascript описанием требований к типам значений и использованием специального компилятора tsc.

Компилятор читает и проверяет указанные требования и если все правила соблюдаются **удаляет** из программы аннотацию типов и оформляет текст в виде обычного javascript. В зависимости от настроек результат может соответствовать и самым свежим стандартам javascript и более древним. Это дело техники.

Под надзором TypeScript следующая программа компилируется успешно,

```tsx
function process(text:string) {
  return text && text.replace(/б/g, "с")
}
let a = "боль";
process(a).toUpperCase();
```

[Playground Link](https://www.typescriptlang.org/play?#code/GYVwdgxgLglg9mABABwE5wgUwM7YBRSYAeUAXNlKjGAOYCUiA3gFCKKqZQipKEmIAyAYj5QAdB2QAbAIZY8AekCMIApoAaRACJAgiCa6zAL7MpnRDMQBeLUsB8IIG4QQDIgmgNzM0GHPhl0xUOAFVkZExUAGEZbEw8OmcgA)

а следующие две предупреждают разработчика еще в редакторе, что договоренности не соблюдаются.

```tsx
function process(text:string) {
  return text && text.replace(/б/g, "с")
}
let a = null;
process(a).toUpperCase();
//      ^
//      Argument of type 'null' is not assignable to parameter of type 'string'.(2345)
```

[Playground Link](https://www.typescriptlang.org/play?#code/GYVwdgxgLglg9mABABwE5wgUwM7YBRSYAeUAXNlKjGAOYCUiA3gFCKKqZQipKEmIAyAYj5QAdB2QAbAIZY8AekCMIApoAaRACJAgiCa6zAL7MpnRDMQBeRGBBSpAbmZoMOfDLpiocAKrJkmVABhGWxMPDp7IA)

```tsx
function process(text:string) {
  return text && text.replace(/б/g, "с")
}
let a = 0;
process(a).toUpperCase();
//      ^
//      Argument of type 'number' is not assignable to parameter of type 'string'.(2345)
```

[Playground Link](https://www.typescriptlang.org/play?#code/GYVwdgxgLglg9mABABwE5wgUwM7YBRSYAeUAXNlKjGAOYCUiA3gFCKKqZQipKEmIAyAYj5QAdB2QAbAIZY8AekCMIApoAaRACJAgiCa6zAL7MpnRDMQBeRAAYA3MzQYc+GXTFQ4AVWTJMqAMIy2Jh4dLZAA)

Используйте ссылку и убедитесь сами в песочнице typescript.

## Где это работает

Вы можете запускать TypeScript в командной строке терминала. Этот инструмент работает во многих популярных **редакторах**. Обратите еще раз внимание на то, что typescript-история - это про написание, редактирование и исправление программы, а не про ее работу в javascript-движке. Мы займемся установкой компилятора в следующем разделе.
