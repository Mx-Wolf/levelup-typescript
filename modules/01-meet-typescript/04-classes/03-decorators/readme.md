# Декораторы

Компилятора typescript распознает специальный синтаксис, предназначенный для дополнения и расширения мета-данных о типах самими разработчиками. В настоящее время Javascript не имеет аналогичного стандартного сервиса. Предложения по внедрению декораторов в javascript все еще обсуждаются [техническим комитетом ts39](https://github.com/tc39/proposal-decorators). Возможно, окончательная реализация будет отличаться от описанной ниже. Мы приводим сведения о декораторах в связи с их широким использованием в популярных фреймворках.

для включения декоратора требуется явная конфигурация в командной строке

```command-line
tsc --target ES5 --experimentalDecorators
```

или в tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES5",
    "experimentalDecorators": true
  }
}
```

## Синтаксис декораторов

Декораторы могут декорировать следующие конструкции

* декларацию класса - class decorator
* определение метода - method decorator
* определение реализации доступа к методу - accessor decorators
* определение поля (ключа, свойства) - property decorators
* параметры метода - parameter decorators

Реализация декоратора выполняется при помощи функции. Параметры и результат этой функции зависят от намерения использовать декоратор для конкретного места.

Для применения декоратора вы указываете его имя в форме @*имя* перед элементом, который необходимо украсить.

## Декораторы классов

Декоратор класса указывается перед определением класса. Во время исполнения программы функция декоратора будет вызвана и она получит единственный параметр - функцию конструктор украшаемого класса.

Функция может вернуть значение, которое будет рассматриваться как новое определение конструктора.

```typescript
interface Service{
  update(obj:unknown):void;
}

const serviceImp:Service = {
  update(){console.log("saved")}
};

const serviceable = (ctor: new (service:Service)=>BusinessRule): new (service:Service|null) => BusinessRule =>{
  return class extends ctor{
    constructor(service:Service|null){
      const srv = service || serviceImp;
      super(srv);
    }
  }
}

@serviceable
class BusinessRule{
  private service:Service;
  constructor(service: Service|null){
    if(service === null){ throw new Error('argument exception')}
    this.service = service;
  }
  public work(){
    this.service.update(this);
  }
}

const rule = new BusinessRule(null);
rule.work();
```

Попробуйте выполнить приведенный [пример в typescript песочнице](https://www.typescriptlang.org/play?ssl=31&ssc=13&pln=1&pc=1#code/JYOwLgpgTgZghgYwgAgMrQG7CQbwFDLICuADgCZyQAUA9gEYBWAXESANYg0DuIAlExhrAyAbjwBfPHgQ0QAZzDI5mbBACSAWxJN0ULEmQBeZPkKkK1XjhnyaAGwgA6OzQDmVAERy4GCGQ+8kuJi0rIKSipIcHQORshUCGA0UEzIIBBc8cp6qjqRELyGAHwAQkRyoBBycgBKRA78aRlZ+Xk5SAA+IPV2vEZFyGUV6dV1scWmyFAQYERQIMgIdnDVyBAAHpAgZHKLSVCThDYKUESJyVTZ+hBt1109VgSEz8eKcnpxV6rIHR0R7eotGJns85KRoJc9Lxgc9JIQglIAAJfKIxCDSZarIaVUb1CCTEhQYAYSgoFE3XTXGGvU7nKCXVpofL3Oy9Q7IYAwBkAoyGYzdVlWZBgAAWUG4TUyAFEoOL6QByOBQVxEDQQcBrdZIEhgYCyeWBJ6EUXAOSOcmffIwuHIEhEGLYZBcZJsKiPEEms3kxzmUlUT3Qp4I0LyRSncaSwblHG1PFUAW9MThpzOqCuwNAA), а за одно рассмотрите какой javascript код генерирует компилятор.

## Декораторы методов

Декоратор метода записываются непосредственно перед определением метода

```typescript
function enumerable(value: boolean) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log(descriptor);
    descriptor.enumerable = value;
  };
}

class LogRecord{
  saveTo(stream:TextStreamWriter){}
}

class LogRecoredDec{
  @enumerable(true)
  saveTo(stream:TextStreamWriter){}
}

const lr = new LogRecord();
const lr2 = new LogRecoredDec();

console.log(Object.keys(Object.getPrototypeOf(lr)));
console.log(Object.keys(Object.getPrototypeOf(lr2)));
```

Здесь мы определеяем декоратора для метода saveTo класса LogRecordDec и имя становится доступным в списке ключей прототипа.

