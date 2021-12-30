# Дополнительные возможности 

## Настройка модульного тестирования

Вам потребуются пакеты

* @types/chai,
* @types/mocha,
* @types/node,
* chai,
* mocha,
* ts-node,
* typescript

Добавьте их в зависимости вашего проекта, в раздел devDependencies.

Добавьте в раздел scripts ключ test, type и mocha

```json
{
    "type":"module",
    "scripts": {
        "test": "mocha"
    },
  "mocha":{
    "loader":"ts-node/esm",
    "extension": ["ts", "tsx"],
    "spec":[
      "src/**/*.test.*",
      "src/**/*.spec.*"
    ],
    "watch-files":[
      "src"
    ]
  }
}
```

конфигурация проверена на nodejs *^12.0.0*

добавьте в файл tsconfig.json после ключа include еще один ключ `exclude`:

```json
{
    "exclude": ["./src/**/*.spec.ts"]
}
```

добавьте модуль `./src/components/greater.ts`

```typescript
//  ./src/components/greater.ts
export const getFirstMessage  = ()=>{
    return 'This is your first tested message';
}
```

добавьте модуль `./src/components/greater.spec.ts`

```typescript
import { expect } from "chai";
import { getFirstMessage } from "./greater.js";
describe("greater", () => {
    it("called without args", () => {
        const message = getFirstMessage();
        expect(message).to.be.not.null;
    })
})
```

Убедитесь, что `npm run test` сообщает вам об успешном прохождении теста
