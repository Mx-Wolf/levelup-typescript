# Манипуляции над структурой типов

## Объединение и пересечение

Вспомним, что операция объединения типов создает новый тип, такой, что для любого значения этого нового типа можно выполнить все операции начальных типов. Ниже пример для значения объединенного типа `WithEmail & WithPhone & User` содержит все поля, как из WithEmail, так и из WithPhone

```typescript
type WithEmail = {    
    email: string,
};

type WithPhone = {
    phone: string,
};

type User = {
    name:string;
};

const a : User & WithEmail & WithPhone ={
    name: "ООО «Интерактивные обучающие технологии»",
    email: "mail@htmlacademy.ru",
    phone: "+7(800)555-86-28",
};
```

Действительно, переменная `a` имеет поле name, значит это тип User, она имеет еще и поле email, - значит она имеет тип WithEmail. Очень удобно собирать большие структуры из нескольких маленьких.

В Javascript вы, может быть, используете полезную конструкцию, когда в функцию можно передать значение, а можно передать функцию, которая, если ее позвать, вернет нужное значение. Ведь часть настроек, во время развертывания приложения, укажет администратор.

Такую ситуацию удобно моделировать пересечением типов.

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

В этом случае во время работы программы придется разбираться по месту. В наличии ли отчество или отсутствует. Typescript поможет вам не забыть убедиться в наличии значения, прежде чем разрешит вам с ним производить операции. Для этого вы объясняете компилятору, что значения в вашем типе могут отсутствовать.

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

Вы наверняка согласитесь, что необязательные значения в реальной жизни встречаются очень часто. Typescript предлагает специальный тип-модификатор: Partial. Его действие заключается в создании нового типа, такого, что все ключи его необязательные.

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

Для переменных, имеющих тип WorkBuffer, компилятор будет допускать операции установки значений полей.

## Модификаторы Pick, Omit

## Как работать с данными неизвестного типа
