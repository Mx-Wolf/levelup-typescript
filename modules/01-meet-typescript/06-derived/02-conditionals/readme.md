# Условные типы

## параллель

```javascript
const former = 5;
const latter = 7;
const result = latter>former?"more": new Date();
```

При всей простоте, выше написано условное выражение для javascript. Ниже пример из параллельного мира типов.

```typescript
class Former {
  value (){return 5;}
}
class Latter extends Former{
  op(){};
};

type Result = Latter extends Former? "more": Date;
```
