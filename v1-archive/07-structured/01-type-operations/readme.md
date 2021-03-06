# Манипуляции над структурой типов

## Объединение и пересечение

Мы рассмотрим операции с типами с практической точки зрения. Теорию рассмотрим позднее, в следующем модуле.

Вспомним, что операция объединения типов создает новый тип, такой, что для любого значения этого нового типа можно выполнить все операции начальных типов. Ниже пример для значения объединенного типа `WithEmail & WithPhone & User` содержит все поля, как из WithEmail, так и из WithPhone

```typescript
type WithEmail = {
    email: string,
};

type WithPhone = {
    phone: string,
};

type User = {
    name: string;
};

declare function sendMail(value: WithEmail, message: string): void;
declare function sendSms(value: WithPhone, message: string): void;
declare function formatPesonalOffer(value: User): string;

const a: User & WithEmail & WithPhone = {
    name: "ООО «Интерактивные обучающие технологии»",
    email: "mail@htmlacademy.ru",
    phone: "+7(800)555-86-28",
};

const message = formatPesonalOffer(a);
sendMail(a, message);
sendSms(a, message);
```

[Действительно](https://www.typescriptlang.org/play?ssl=25&ssc=21&pln=1&pc=1#code/C4TwDgpgBA6glsAFgUQLYEM4BsoF4oDeAUFKVBBtgFxQDOwATnAHYDmANEQL4DcRRoSLASIACogD2zaPmJkoYSdJr0mbTr36DoAVVoQGeQiTLN0qCCsYtWfTUQAmEAMZZ0DaADMArs2fA4KToIZgcAWUwsAAoAN3Qsb0thJDRI9igLWlp0ViTVGwBKGhiJOAc+J1d3L19-QOZg0IBlVFpY+MSaeCRxKQh0zOzcqzVWIqgSsoqXNw8oHz8AoM8JBgxgUQhaKXiAeU9PA3aEpL0Dcfy2PiJnKXoodBozwwAyZJRKHDfusSUZY3kZgsNAARIA8EAhUAA1YAMEEAvCCAIRBAKwggAEQQAMIIAuEARgA4QQBMIHDANIgSKggD4QQCMIIBhEEA4iBowByIIBJEGxxORgFEQOEkwDcICTAMwg2OxAG6QZx5BRIqDPgABRDAVBuZzoJyoEAAOgY3iFJlIij6oIA1AB2KIADgADCaCgBWK0AWiNADZrQAmI0a+y3Zj3QY5f4rNboDZbHZYfaHBhRdAFPj6UIRbDhgZbIYQSNEaMOFptdAJrLeyNAA), значение в переменной `a`

* имеет поле **name** и инициализировано строкой, значит это тип `User`,
* имеет поле **email**, - значит она имеет тип `WithEmail`
* имеет поле **phone** - значит имеет тип `WithPhone`.

Очень удобно собирать большие структуры из нескольких маленьких определений свойств.

В Javascript вы, может быть, используете полезную конструкцию, когда в функцию можно передать значение, а можно передать функцию, которая, если ее позвать, вернет нужное значение. Ведь часть настроек, во время развертывания приложения, укажет администратор.

Такую ситуацию удобно моделировать объединением типов.

```typescript
type Settings = string | (()=>string);

declare function init(settings:Settings):void;

init("https://www.htmlacademy.ru");

const studentId = 0;
init(()=>`https://www.htmlacademy.ru/${studentId}`)
```

Операцию пересечения типа полезно использовать для описания значения, который может иметь одну из нескольких форм. Об этом мы поговорим в разделе о собственных защитниках.

## Модификаторы Partial, Required, ReadOnly

При моделировании системы типов данных для вашего приложения вы часто будете обнаруживать, что некоторые значения во время работы приложения могут быть заданы не всегда. Javascript относится к этому с пониманием.

```javascript
const contacts = [{
        name:"Шарик",
        species: "пес" 
    },{
        family: "Матроскин", //фамилия такая.
        species: "кот"
    },{
        name: "Игорь",
        father: "Иванович",
        family: "Печкин",
    }];
```

В этом случае во время работы программы придется разбираться по месту. В наличии ли отчество или отсутствует.  TypeScript  поможет вам не забыть убедиться в наличии значения, прежде чем разрешит вам с ним производить операции. Для этого вы объясняете компилятору, что значения в вашем типе могут отсутствовать.

```typescript
type Character = {
  species?: string | undefined,
  name?: string | undefined,
  father?: string | undefined,
  family?: string | undefined,  
}

const contacts:Character[] = [{
        name:"Шарик",
        species: "пес" 
    },{
        family: "Матроскин", //фамилия такая.
        species: "кот"
    },{
        name: "Игорь",
        father: "Иванович",
        family: "Печкин",
    }];
const photoHunter = contacts[0];

console.log(photoHunter.name.length);//Object is possibly 'undefined'.(2532)
```

[Песочница](https://www.typescriptlang.org/play?#code/C4TwDgpgBAwgFgQwE4IMbAkqBeKBvAKCigGdJUBLCEgfgC5TgkKA7AcygB8oBXFgEwgAzVhH4AaIlBYIAthHqNm7LrwHDREqUITA4mRSSasO3PoJEsxk4jtkUANiEPGVZ9ZevECAXwIFUAHsWIygglmA0YBI6eGQozABtAF0cKETCYiysmXk6ACJAChBABhBAARBADhBALhB8m2yssghKagZ8wH4QQFYQQEEQfKgpYh9xTLrbOUcQFsAcEGLAIRBSwD4QTsrywF4QGqgAenXAERBiwB4QcsBuEHLAeRAoaeLK4uOAOj66hqaYqHzKuen8u4Gh4dyIFsAMEEAzCBzUqAGRAandsjo9JgAYAmEGKyzmcPKgHEQCHDEb2JwtQD4IO1UUtVrV+skANwBYKhMBwQLAQIACT4GCwuHCkXQJESAAZyf5wiRAg4INcHIE2AAKGl0xnMzDXX6iiDsPQASiAA) иллюстрирует эту ситуацию.

Вы наверняка согласитесь, что необязательные значения в реальной жизни встречаются очень часто.  TypeScript  предлагает специальный тип-модификатор: Partial. Его действие заключается в создании нового типа, такого, что все ключи его необязательные.

```typescript
type CharacterOriginal = {
  species: string,
  name: string,
  father: string,
  family: string,  
}

type Character = Partial<CharacterOriginal>; //эквивалентно предыдущему примеру.
```

Вам так же может пригодиться тип-модификатор Required. Его действие - обратное Partial. Все ключи становятся обязательными для заполнения. В нашем примере

```typescript
type CharacterDoubleModified = Required<Partial<CharacterOriginal>>// эквивалентно CharacterOriginal
```

В дополнение к контролю наличия значения компилятор может контролировать изменяемость значений. Если после получения значения вам необходимо гарантировать, что в программе никакой код не будет перезаписывать полученные значения, в интересах typescript-а вы можете объявить поля readonly.

```typescript
type ReceivedCharacter = {
  readonly species: string,
  readonly name: string,
  readonly father: string,
  readonly family: string,  
}
```

Этого же результата можно добиться применяя тип-модификатор Readonly.

```typescript
type ReceivedCharacter = Readonly<CharacterOriginal>
```

И такое действие над типом тоже можно обратить. Но чуть сложнее. Нам потребуется вспомогательный тип. Мы его опишем так.

```typescript
type Writable<T> = {
    - readonly [P in keyof T]:T[P]
};

type WorkBuffer = Writable<ReceivedCharacter>;
```

Для переменных, имеющих тип WorkBuffer, компилятор будет допускать операции установки значений полей, в отличии от значений объявленных типом ReceivedCharacter.

## operator keyof

В TypeScript оператор keyof воздайствует на структурный тип и создает объединение ключей структуры. Изучите [Playground Link](https://www.typescriptlang.org/play?#code/C4TwDgpgBAqgzhATlAvFA3gKClAdgQwFsIAuKOYRAS1wHMAabKRAewBsI4yLq6BtALqMc+ACaEaZAEYt2EfLgDcmAL6ZMoSLASIA0hBBxUUANYGWAM21JlG8NACiARwCuVAG742VCLmDGAIgJiAKgAHygA1g44UIiAsQlcAOUgA)

```typescript
type User = {
  name: string,
  roles: string[],
  admin: boolean;
}
type UserKeys = keyof User;
type Equivalient = "name" | "roles" | "admin";
```

Значения, которые можно объявить с типом UserKeys и с типом Equivalent идентичны.

## Модификаторы Pick, Omit

Теперь рассмотрим еще несколько полезных типов-модификаторов. К версии 4.4 их общее количество составляет полтора десятка. Детально мы поговорим о них позднее, в разделах об условных типах и при обсуждении ключевого слова `infer`.

Все типы-модификаторы конструируют новый тип, опираясь на один или два типа из своих параметров. Мы уже встречали `Record<Keys, Type>` ранее. Типы `Readonly<Type>`, `Required<Type>` и `Partial<Type>` мы обсудили в предыдущем разделе. Сейчас познакомимся ближе с `Pick<Type, Keys>` и `Omit<Type, Keys>` в практических целях.

### `Pick<Type, Keys>`

Этот тип-модификатор конструирует новый тип так, что среди ключей типа-результата будут только те, что переписаны во втором параметре.

**Важно!** ключи перечисляются в виде объединения строковых типов.

```typescript
type Original = {
    id: number,
    title: string,
    position: string,
}
declare function create(record:Pick<Original, "title"|"position">): Original;

const created = create({title:"доктор", position:"главврач" });
```

При создании новой записи, мы не можем указать ее идентификатор. Это прерогатива базы данных. Поэтому мы описали параметр у функции создания записи, перечислив только те свойства, которые, может быть, заполнил пользователь.

Второй тип-модификатор конструирует новый тип так, что среди ключей типа результата не остается перечисленных во втором аргументе.

```typescript
type Original = {
    id: number,
    title: string,
    position: string,
}
declare function create(record:Omit<Original, "id">): Original;

const created = create({title:"доктор", position:"главврач" });
```

Кому-то второй вариант может показаться нагляднее.

## Как работать с данными неизвестного типа

Рассмотрим практический пример, как впустить в свое приложение данные из удаленного сервера. Как бы разработчики не договаривались между собой, форме данных, полученных с сервера мы доверять не можем. Для наглядности представим, что мы извлекаем данные из третьего сервера.

Мы сфокусируемся на функции `adapt`, но для полноты контекста предположим такую загрузку

```typescript
import {adapt} from "./adapt.js";

type ServerData = {
    lastUpdates:number,
    rate: number,
};
declare const END_POINT_URL:string;

export const load = async ():Promise<ServerData> =>{
  const response = await fetch(END_POINT_URL);
  if(response.ok){
      return adapt(await response.json());
  }
  throw new Error();
}
```

### Параметр у adapt неизвестен

Чтобы правильно оценивать полученные данные мы должны сказать честно. *Мы предполагает форму данных, но не знаем это наверняка*.

```typescript
export const adapt = (json:unknown):ServerData=>{
    //
    throw new Error('not implemented yet');
};
```

Все что мы можем сделать с `json` - это проверить, что это ненулевой объект.

```typescript
export const adapt = (json:unknown):ServerData=>{
    if(typeof json === "object" && json !== null){
        const {} = json as Record<string,unknown>;
    }
    throw new Error('not implemented yet');
}
```

Обратите внимание на использование типа-модификатора Record вместо object. Это рекомендованная практика в связи с определенными трудностями компилятора.

Теперь мы может деструктурировать объект и извлечь из него значения ключей `lastUpdates` и `rate`... в надежде, что они там есть.

```typescript
export const adapt = (json:unknown):ServerData=>{
    if(typeof json === "object" && json !== null){
        const {lastUpdates,rate} = json as Record<string,unknown>;
    }
    throw new Error('not implemented yet');
}

```

Проверим, что значения действительно получены и они числовые

```typescript
export const adapt = (json:unknown):ServerData=>{
    if(typeof json === "object" && json !== null){
        const {lastUpdates,rate} = json as Record<string,unknown>;
        if(typeof lastUpdates === "number" && typeof rate === "number"){
            return {lastUpdates, rate};
        }
    }
    throw new Error('unexpected argument value');
}

```

Наконец, теперь мы можем вернуть правильное значение и в дальнейшем полагаться на TypeScript и на его магию. Кроме того мы можем изменить сообщение об ошибке.
