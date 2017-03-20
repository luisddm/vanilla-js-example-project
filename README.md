# vanilla-js-example-project

Este es un proyecto de prueba hecho exclusivamente usando Javascript puro, sin librerías ni frameworks integrados, al margen del *tooling*. Destacan **Gulp** como *task runner*, **Webpack** para poder usar módulos, **Babel** para transpilar, algun *plugin* de PostCSS y algunas otros plugins para pequeñas tareas adicionales. Para instalar todas estas herramientas se requiere hacer un `npm install`.

Uno de estos módulos de npm es [json-server](https://github.com/typicode/json-server), el cual es capaz de exponer una API con los cuatro principales verbos de un CRUD. Usa un simple fichero de texto que contiene un JSON como base de datos. Para arrancar este *backend* se debe ejecutar `npm run back`.

El último paso es arrancar la parte frontal que consumirá la API con `npm run front`. El *browser-sync* se ocupa de recargarlo todo cada vez que se efectúa cualquier cambio en el código mientras esté arrancado.
