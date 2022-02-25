# Эксперименты с Vue

Измените TypeScript в файле `src\components\HelloWorld.vue`:

```ts
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HelloWorld',
  props: {
    msg: String,
    details: String,
  },
});

```

Добавьте разметку в файл `src\components\HelloWorld.vue`:

```html
<section>{{details}}</section>
```

Добавьте атрибут в файл `src\App.vue`:

```html
<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld 
  msg="Welcome to Your Vue.js + TypeScript App"
  details="Больше информации о Vue"
  />
</template>
```

Убедитесь, что вы видите в браузере внесённые изменения:

![Улучшенное приложение](../assets//vue-04.png)
