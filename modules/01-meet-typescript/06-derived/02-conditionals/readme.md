# Условные типы

## параллель

Предлагаем изучить и сравнить два кусочка кода. Javascript

```javascript
const former = 5;
const latter = 7;
const result = latter>former?"more": new Date();
```

Особенно обратим внимание на третий, условный, оператор. Сравним его с приведенным ниже выражением для типов.

```typescript
class Former {
  value (){return 5;}
}
class Latter extends Former{
  op(){};
};

type Result = Latter extends Former? "more": Date;
```

Способ описания типа `Result` называется условным типом. Возможно, в своей ежедневной работе вы будете сталкиваться с условными типами в основном в неявном, завуалированном виде. Это потому, что условные типы прекрасно подходят для описания граничных api и frameworks.


