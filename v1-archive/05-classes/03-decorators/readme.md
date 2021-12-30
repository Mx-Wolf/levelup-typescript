# Декораторы

Компилятора TypeScript распознает специальный синтаксис, предназначенный для дополнения мета-данных о типах самими разработчиками. В настоящее время Javascript не имеет аналогичного стандартного сервиса. Предложения по внедрению декораторов в javascript все еще обсуждаются [техническим комитетом tc39](https://github.com/tc39/proposal-decorators). Возможно, окончательная реализация будет отличаться от описанной ниже. Мы приводим сведения о декораторах в связи с их широким использованием в популярных фреймворках.

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

Попробуйте выполнить приведенный [пример в TypeScript песочнице](https://www.typescriptlang.org/play?ssl=31&ssc=13&pln=1&pc=1#code/JYOwLgpgTgZghgYwgAgMrQG7CQbwFDLICuADgCZyQAUA9gEYBWAXESANYg0DuIAlExhrAyAbjwBfPHgQ0QAZzDI5mbBACSAWxJN0ULEmQBeZPkKkK1XjhnyaAGwgA6OzQDmVAERy4GCGQ+8kuJi0rIKSipIcHQORshUCGA0UEzIIBBc8cp6qjqRELyGAHwAQkRyoBBycgBKRA78aRlZ+Xk5SAA+IPV2vEZFyGUV6dV1scWmyFAQYERQIMgIdnDVyBAAHpAgZHKLSVCThDYKUESJyVTZ+hBt1109VgSEz8eKcnpxV6rIHR0R7eotGJns85KRoJc9Lxgc9JIQglIAAJfKIxCDSZarIaVUb1CCTEhQYAYSgoFE3XTXGGvU7nKCXVpofL3Oy9Q7IYAwBkAoyGYzdVlWZBgAAWUG4TUyAFEoOL6QByOBQVxEDQQcBrdZIEhgYCyeWBJ6EUXAOSOcmffIwuHIEhEGLYZBcZJsKiPEEms3kxzmUlUT3Qp4I0LyRSncaSwblHG1PFUAW9MThpzOqCuwNAA), а за одно рассмотрите какой javascript код генерирует компилятор.

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

Здесь мы определеяем декоратор для метода saveTo класса LogRecordDec и имя становится доступным в списке ключей прототипа,  как это  
[видно в песочнице](https://www.typescriptlang.org/play?#code/GYVwdgxgLglg9mABAUzCAtsgTgQwEYA2yAFAG44EjIBcieccROYAlIgN4BQiiWyUILElCRYCRMSg4sAc361mATwA0iAA5Y4a7FEUBpZItoBnKFhhgZqgCbJjEc2qhwstAAqbtWXQBE7DmCcXNi4eHggEY0ZkADoCOBliW3tHZywWAG5uMOSAoKwY1AxsfCJEAF5EckpkLJ4AXyz6zk4IAhxjY0QAGQSAJWQIrGtQxGMcUmQAFThiUz4cdGop5AAPKABlM2RFgHVzKGwWdmbm1vbOnv7Bl2RrPwhRgAEizFxCEjMqFmzxyZm5ttFss1psgeh9jBDukTpwzhEwKZEAQsBVEGBkAB3K4yAZDazETKtSJQZFYABMaIx2N6uJufHug0JWWJiOicQSxAA8ngAFaDKAxADWhmM3L5ApicigHjgzl02i5wGIKJYaqyCKiRA5iR5-OgwtF4v1gulsvlikVypR5LVmSAA)

Обратите внимание, что декоратор может быть функцией, как это было в отношении декотратора класса, а может, как во втором примере, быть и фабрикой, возвращающей функцию-декоратор.

## Анатомия декораторов

В тех местах, где разрешено использование декоратора вы можете применить множество декораторов. Компилятор будет вычислять (применять) декоратор в порядке композиции. Сначала вычислит фабрики снаружи-внутрь, а затем применит декораторы изнутри-наружу. Этот порядок наглядно показан в текущей [актуальной документации](https://www.typescriptlang.org/docs/handbook/decorators.html#decorator-composition) typescript

```typescript
function first() {
  console.log("first(): factory evaluated");
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log("first(): called");
  };
}
 
function second() {
  console.log("second(): factory evaluated");
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log("second(): called");
  };
}
 
class ExampleClass {
  @first()
  @second()
  method() {}
}
```

Вы можете запустить этот [пример в песочнице](https://www.typescriptlang.org/play?#code/GYVwdgxgLglg9mABMGAnAzlAFASkQbwChFEIF04AbAUwDpK4BzLAIhQ2xwC5kBDaOKgCeiagDdelELyjUAJixwBuYolTUoIVElCRYCRFii9UjDT15ghAGkQAHVHDvVUUIQGlqQnplQwwjLZy1OgQfnZQgjwACo7OrkIAIiFhMBGCeEQkJGRgFDT0TKzsmLg8EJI0CsqqAL4qtcSEutDwSOjUuXK4BKq5+XQMzCwdXWV8AsKiElIy8ooqJOqa2sjgrQZGJmZQFla2Dk4ubp7eiL7+gYjBoeGRqDFxx0kpdxm92aTkVINFI50IbrcUiVeY1Ej1QiNRCECCUXjodCIACiAA9eABbOw0ADC8MRH0QAAESpxVETRoDcKoMRoABZwIEERq1IA)

## Ограничения в использовании декораторов

В настоящий момент у разработчика нет возможности декорировать функции, стрелочные функции или формальные параметры функций

* Декорирование определений функций потребовало бы отказ от всплытия (hoisting) функций в javascript, поэтому эта операция не разрешена.
* Декорированией стрелочных функций и функциональных выражений не разрешается. Оно и не требуется. Всегда можно написать `const target = deco(()=>{})`
* Декорирование параметров функций не входит в контекст обсуждаемого техническим комитетом TC39 предложений.
