# Контент курса «TypeScript»

```ts
//ОК
function ensureString (value: string | undefined, message: string):asserts value is string {
  if(typeof value !== 'string'){
    throw new TypeError(message);
  }
}
// not OK
const ensureString = (value: string | undefined, message: string):asserts value is string => {
  if(typeof value !== 'string'){
    throw new TypeError(message);
  }
}
```
