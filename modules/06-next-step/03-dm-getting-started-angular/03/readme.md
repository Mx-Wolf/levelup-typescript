# Старт приложения

Angular — фреймворк, он берёт на себя большой круг «забот» ещё _до старта_ приложения.

## Окружение и стартовый модуль

Обращаем внимание на декораторы, которые не вошли в этот курс.

```ts
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Символ `@NgModule` — декоратор класса. На начало 2022 года декораторы не являются стандартом JavaScript, и их поведение, хотя и маловероятно, может поменяться.

Если вы войдёте в команду разработчиков на Angular, вам потребуется понимание работы этих механизмов. Можете ознакомиться с некоторыми возможностями декораторов [на Хабре](https://habr.com/ru/post/494668/).
