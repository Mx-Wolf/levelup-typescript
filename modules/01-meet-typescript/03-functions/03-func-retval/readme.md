# Результат выполнения, тип возвращаемого значения, void, never
## Неявный тип возвращаего значения
Во многих случаях компилятор в состоянии выяснить тип возвращаемого из функции значения, и указывать его явным образом не требуется.

```typescript
function isGraterThen(left:number, right:number){
    return left>right;
}
```
Компилятор будет считать, что тип этой функции эквивалентен вот такому типу
```typescript
type GreaterThenPredicate = (left:number, right:number)=>boolean;
```
Компилятор сумеет выполнить операции над множеством типов и для функции, возвращающей значения разных типов. 
```typescript
const mockData = {} as Record<string,unknown>;
const ERROR_MESSAGE = "no data available" as string;
function getData(){
  if(typeof mockData === "undefined"){
      return {
            status:"error", 
            message: ERROR_MESSAGE,
          } as const;
  }
  return {
      status: "success",
      data: mockData,
  } as const;
}
```
Вы можете скопировать это определение в песочницу и изучить закладку `.d.ts`. Убедитесь, что исходный код приведенной выше функции typescript рассматирвает как имеющий тип пересечения двух структурных типов.
```typescript
declare function getData(): {
    readonly status: "error";
    readonly message: string;
    readonly data?: undefined;
} | {
    readonly status: "success";
    readonly data: Record<string, unknown>;
    readonly message?: undefined;
};
```
Здесь интересно заметить, что тип поля status - явно записанная строка. Еще отметим, что для typescript-а очевидна зависимость - если status- "error", то message - строка, а если status "success" то message неопределена. Копилятор возьмет с собой это знание и подскажет разработчику, если вдруг увидит вырежение

```typescript
const received = getData();
if(received.status === "success"){
    //Object is possibly 'undefined'.(2532)
    console.log(received.message.length)
}
```