# DemoNgApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.14.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.


## For amchart install
`npm install @amcharts/amcharts4`
Then Edit the package.json and add --prod --build-optimizer=false to the "build" script

Angular 10+ gives warnings when using third party npm packages.so you can disable them by adding allowedCommonJsDependencies to your angular.json file, like this:

"options": {
    "allowedCommonJsDependencies": [
      "core-js",
      "raf",
      "xlsx",
      "@babel/runtime"
    ]
    // ...
  }

## For Import json file, Change tsconfig.json file

`"resolveJsonModule": true,`
`"esModuleInterop": true,`
Should be placed under compilerOptions in tsconfig.json, as per documentation.
