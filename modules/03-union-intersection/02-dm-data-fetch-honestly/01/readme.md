# Честная загрузка данных

Поддержка со стороны TypeScript продолжается только во время разработки. Во время работы вы остаётесь с JavaScript и данными.

 Чтобы получить максимум от TypeScript, вам нужно быть с ним (с компилятором) откровенными. Если вы будете его обманывать, то наверняка попадёте в ситуацию, когда вместо чисел попадётся строка или значения вовсе нет.
 
 Чтобы TypeScript помог, придётся проводить санитарную обработку данных. Попробуйте произвести её на примере сервиса прогноза погоды. Поскольку сервис вам неподвластен, вы вправе предполагать, что он будет изменяться.

Адрес страницы с описанием сервиса: [ссылка](http://www.7timer.info/doc.php?lang=en#products).

Пример запроса: [http://www.7timer.info/bin/api.pl?output=json&lat=59.930&lon=30.360&product=civillight](http://www.7timer.info/bin/api.pl?output=json&lat=59.930&lon=30.360&product=civillight).

Изучите некоторые начальные сведения, которые мы уже подготовили, в файлах `types`, `errors`, `request`, `sanitizer`.

## Получаем данные типа unknown

Чтобы выполнить санитарную обработку полученных от сервера значений, мы должны отталкиваться от следующего предположения: всё, что мы знаем об ответе сервера — это «ничего».

Если вы откроете консоль, то увидите сообщение об ошибке: санитарная обработка ещё не реализована:

```terminal
Error: not implemented yet
    at adaptFromJson (<anonymous>:2:9)
    at loadWeatherForecast (<anonymous>:42:12)
```
