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

```typescript
type Action =
  | {
      type: "INIT"
    }
  | {
      type: "SYNC"
    }
  | {
      type: "LOG_IN"
      emailAddress: string
    }
  | {
      type: "LOG_IN_SUCCESS"
      accessToken: string
    }
type ActionType = Action["type"];
type PayloadType<T,A> 
  = A extends unknown
  ? A extends {type:T}
    ? {} extends Omit<A,"type">
      ?never
      :Omit<A,"type">
    :never
  :never;

type Debug = PayloadType<"LOG_IN",Action>;

declare function dispatch<T extends ActionType>(type:T, payload?:PayloadType<T,Action>):void;    

dispatch("LOG_IN",{emailAddress:""});
```

