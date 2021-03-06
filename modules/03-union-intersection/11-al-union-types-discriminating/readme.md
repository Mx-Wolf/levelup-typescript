# Объединение типов

Во Вселенной типов TypeScript в отношении нескольких типов можно применить операцию объединения.

**Важно:** мы говорим, что значение принадлежит объединению типов **Ta** | **Tb**, когда оно либо принадлежит типу **Ta**, либо принадлежит к типу **Tb**. Также обратим внимание, что тип **Ta** является более специализированным, чем его объединение с типом **Tb** (в терминах TypeScript **Ta** `extends` **Ta**|**Tb**).

В реальной жизни объединение типов встречается регулярно. Когда сервис может вернуть данные, сообщить об ошибке или потребовать авторизацию, мы говорим, что возможное значение принадлежит объединению типов.

Похожая ситуация наблюдается с обработкой сообщений redux. Комбинированный редуктор может обрабатывать действия разных типов, и типом его аргумента будет значение, принадлежащее объединению всех возможных типов действий.

## Моделирование объединённого типа

При успешном запросе удалённый сервис возвращает приложению список сообщений. Мы можем обозначить эту договорённость в виде типа:

```ts
interface Messages{
    status: 'success';
    items: string[];
}
```

Удалённый сервис может обнаружить недопустимый запрос и сообщить об ошибке клиента:

```ts
interface ClientError{
    status: 'client-error';
    message: string;
}
```

Ошибка может произойти внутри самого сервера:

```ts
interface ServerError{
    status: 'server-error';
    timeToOnline: string;    
}
```

Мы вправе ожидать от сервера значения такого объединённого типа:

```ts
type ApiResponse = Messages | ClientError | ServerError;
```

После того, как данные от удалённого сервиса будут получены, в приложении нам следует принять решение об информировании пользователя. Методика определения специализированного типа из объединения, основанная на значении поля дискриминатора, называется дискриминацией объединения.

```ts
const handleResponse = (response:ApiResponse)=>{
    // В следующей строке TypeScript 
    // знает только одно поле — status.
    switch(response.status){
        case 'client-error':{
            // В следующей строке TypeScript
            // уже догадался, что в значении,
            // где status === 'client-error',
            // мы договорились иметь поле message.
            const {message} = response;
            console.log(message);
            break;
        }
        case 'server-error':{
            // Когда status === 'server-error',
            // мы договорились получать ожидаемое время
            // до перезапуска.
            const {timeToOnline} = response;
            console.log(`ожидают, что сервер снова оживет через ${timeToOnline}`);
            break;
        }
        case 'success':{
            // В случае успеха
            // мы договорились иметь набор сообщений.           
            const {items} = response;
            items.forEach((e)=>console.log(`получено сообщение: ${e}`));
        }
    }
}
```

Посмотрите [в песочнице](https://www.typescriptlang.org/play?ssl=18&ssc=1&pln=46&pc=2#code/JYOwLgpgTgZghgYwgAgLIQM4bgc0wbwChkTkMw4wBXDALmQHIMqEksGBuY04SAWzpkwUUDgDaAXS4BfQoVCRYiFAGEANsAjgAolCgB7KEVJDKNegwQatYALTQDUTtxJ9M2PPXIiQOGXIVoeCRkAGVoADdoXUdjUnIzQSZI6Hs9Q2cTMGA3ABV9AHkQDRAIL2FRDhNCWUIwAE8ABxQAQUbgACVMRv0QDBQAXjR3XExkAB9kdU0ddKgJsJSoGMMuQgRe8mQACzgQABM1CC6MHr7B5AAKKG7NsrbO2-OASgGAPjiSAHov5EAmEGQgEEQQDcIIBWEEALCCAYRBAHIggEkQUGAThAgYAhEEAAiCAPhBAFwggAYQZC5JoQUIIESNMDIFzIH7IQDsIIBeEGxoORyGR6OBgBkQTHo5Do8G0rmAfhBWaDkLZTNQMBSMAB3XgIbbXJ79AB0CXFz0+JmQCDg-UYVhmdgcGVoGs1pCpAJBEJh8KRgLRWOF+OaRJJYApZu+v0hgDYQYXg9GAZhBseDscDAYB5EAANMhAOIgLP+NPpsdBtMAHCBpj2eqmB8HC1U0ZADYt66zgNKOBhZs1UwA8IIBpEGQAcD6L+6NRaeBacBbOQadrjN7grByDcWFG1c1Gz6ZPwY48EGkReQN1Ody4nqnm30RyVan0OEu89Gzw3m9IACMbnAANZns2yTfa3XJKBRKAV42m7O-Tm53EFhgRYlq+76fk4k4mHWjbNq27adt2Q6spCsbYsivboj6aahqCtbosKfyorhEaQeavwBsg-KgkR1LYvykKAjipEkNOWz4NkeSFMUoCLsuq5nP097nqxO4QHuB6XAABph2HYtCyIxvGXKAtRfzUUCfJ-LiMlqUyKY0cgAAk7E5BA+RFCUi6SaezHIFeEC3kJJiPp6z4oEwLBsBgDAmrZFpAsCKEMsgDFUYAoiDYn5vwNk2QZwR2XY9n2A7ocg9KAIwg7ZAui6LpfC6ZIueJC2axs68BAAhLkM-HrrZ5UCEqMCGNoiDypcECvG8Im7vuh6ScOKGpspOV5amaagvQxlWc8Nmbi5JCyNIQA), как редактор под руководством TypeScript подсказывает, какие значения могут быть в `case`, какие поля можно использовать в каждой из веток `switch`.
