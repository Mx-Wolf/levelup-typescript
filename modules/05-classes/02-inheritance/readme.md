# Иерархия

## Наследование

Чтобы описать класс наследующий какой-нибудь базовый вы используете ключевое слово extends

```typescript
class Base {
  
}

class Derived extends Base{

}
```

базовый класс может предоставить наследнику особый сервис обозначив его модификатором protected.

```typescript
class Base {
  private name: string;
  constructor(){ this.name = "base";}
  protected setName(name:string){this.name = name;}
  public getName(){return this.name;}
}

class Derived extends Base{
  constructor(){
    super();
    this.setName("derived");
  }
}
```

![access to public fields only]('./assets/access.png')

При описании класса можно наследовать от одного класса. Множественное наследование не допускается.

```typescript
class Base { }

class Multiple{  }

class Derived extends Base, Multiple{}
//                          ^^^^^^^^
//Classes can only extend a single class.(1174)
//class Multiple
```

Класс может описывать реализацию интерфейса. Компилятор проследит, что реализация всех объявленных в интерфейсе методов выполнена корректно.

```typescript
type INameProvider = {
  getName():string;
}
class Base implements INameProvider{ 
  getName(){return "";}
}

```

Допускается реализация множества интерфейсов

```typescript
type INameProvider = {
  getName(): string;
}
type IPersistable = {
  writeTo(writer: TextStreamWriter): void;
}

class Base implements INameProvider, IPersistable {
  writeTo(writer: TextStreamWriter): void {
    writer.WriteLine(this.getName());
  }
  getName() { return ""; }
}

```

Поскольку описание класса существует в контексте типов, имя класса можно использовать как интерфейс. Рассматривая наш последний пример, следующее выражение будет компилироваться ок.

```typescript
const justInterface:Base ={
  getName(){return "";},
  writeTo(writer){writer.WriteLine(this.getName())}
}
```

В typescript тип конструктора похоже на тип функции, но дополнен префиксом `new` для указания, что функция предназначена для создания экземпляров класса.

```typescript
class ServiceLocator{
  private catalog:Record<string,new()=>unknown> = {};
  //                            ^^^
  // new обязательно.
  register(name: string, ctor: new()=>unknown):void{
    this.catalog[name] = ctor;
  }
  getService(name:string):unknown{
    return new this.catalog[name]();
  }
}

class ServiceA{}
class ServiceB{}

const services = new ServiceLocator();
services.register("a", ServiceA);
services.register("b", ServiceB);

const instance = services.getService("a") as ServiceA;
```

Наивная и упрощенная реализация шаблона service-locator.
