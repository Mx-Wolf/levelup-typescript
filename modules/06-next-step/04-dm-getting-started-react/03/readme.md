# Запуск Rect-приложения в режиме разработки

Запускаем приложение:

```terminal
npm run stat
```

После окончания виртуальной сборки вы увидите:

```terminal
You can now view levelup-typescript-react in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.40.101:3000

Note that the development build is not optimized.        
To create a production build, use npm run build.

asset static/js/bundle.js 1.43 MiB [emitted] (name: main) 1 related asset
asset index.html 470 bytes [emitted]
asset asset-manifest.json 190 bytes [emitted]
runtime modules 28.2 KiB 13 modules
modules by path ./node_modules/ 1.33 MiB
  modules by path ./node_modules/core-js-pure/ 24.8 KiB 53 modules
  modules by path ./node_modules/webpack-dev-server/client/ 62.1 KiB 12 modules
  modules by path ./node_modules/webpack/hot/*.js 4.4 KiB 4 modules
  modules by path ./node_modules/react/ 119 KiB 4 modules
  modules by path ./node_modules/html-entities/lib/*.js 115 KiB 4 modules
Compiled successfully!
```

Если вы введёте в браузере адрес [http://localhost:3000](http://localhost:3000), то увидите страницу. Не выключайте приложение.
