# Angular in 90-ish minutes


#### Muhammad Ahsan Ayaz

---

## What you should know so far?

- HTML
- JavaScript (or TypeScript)
- CSS (a bit)
- Git
- Basic programming concepts (variables, loops, functions, conditionals)

---

## Which tools do we need?

- [VSCode](https://code.visualstudio.com/Download)
- [NodeJS](https://nodejs.org/en/download/prebuilt-installer)
- [Git](https://git-scm.com/downloads)
- [Angular CLI](https://www.npmjs.com/package/@angular/cli)
- [Angular Language Server extension](https://marketplace.visualstudio.com/items?itemName=Angular.ng-template)

---

## What is Angular

- Web Applications framework for Single Page Apps (SPA) <!-- .element: class="fragment"  -->
- Built by Google <!-- .element: class="fragment"  -->
- Has a huge commmunity <!-- .element: class="fragment"  -->

---

![ng-cookbook](assets/images/ng-cookbook-2.png)

---

## Angular Cookbook

- Winning Component Communication
- Working with Angular Directives and Built-In Control Flow
- The Magic of Dependency Injection in Angular
- Understanding Angular Animations
- Angular and RxJS – Awesomeness Combined
- Reactive State Management with NgRx
- Understanding Angular Navigation and Routing

--

## Angular Cookbook

- Mastering Angular Forms
- Angular and the Angular CDK
- Writing Unit Tests in Angular with Jest
- E2E Tests in Angular with Cypress
- Performance Optimization in Angular
- Building PWAs with Angular

---

## Benefits of Angular

- Faster development <!-- .element: class="fragment"  -->
- Faster code generation (CLI) <!-- .element: class="fragment"  -->
- Unit-tests ready <!-- .element: class="fragment"  -->
- Opinionated <!-- .element: class="fragment"  -->
  - Makes it easy to switch companies and teams <!-- .element: class="fragment"  -->
- Code reusability <!-- .element: class="fragment"  -->

---

## Angular vs React 
### Myths about Angular

--

### Angular vs React
<hr/>

#### Angular
- Is a framework <!-- .element: class="fragment"  -->
- Has a built-in CLI <!-- .element: class="fragment"  -->
- Has tools and packages included for small-medium scale apps <!-- .element: class="fragment"  -->
- Is opinionated (better code style consistency) <!-- .element: class="fragment"  -->

--
### Angular vs React 
<hr />

#### React
- Is a library <!-- .element: class="fragment"  -->
- Does not have a CLI <!-- .element: class="fragment"  -->
- Requires you to install additional packages even for small scale apps <!-- .element: class="fragment"  -->


--
## Myths about Angular

- It is hard to learn <!-- .element: class="fragment"  -->
- Will change significantly on every update <!-- .element: class="fragment"  -->
- Angular is slow ([Not really](https://krausest.github.io/js-framework-benchmark/2024/table_chrome_129.0.6668.58.html))
<!-- .element: class="fragment"  -->

- Angular has a huge bundle size <!-- .element: class="fragment"  -->

---

## Angular Core Concepts
- Components, Services <!-- .element: class="fragment"  -->
- Directive, Pipes <!-- .element: class="fragment"  -->
- Data-Binding, Event Handlers <!-- .element: class="fragment"  -->
- Http Module, Forms Module <!-- .element: class="fragment"  -->
- Routing, Animations <!-- .element: class="fragment"  -->
- Testing, Building for production <!-- .element: class="fragment"  -->

---

## Creating an Angular app

```bash
# install the @angular/cli
npm install -g @angular/cli

# check cli version
ng --version

# create an app
ng new first-ng-app # optionally use --dry-run

# create an app with some configuration
ng new first-ng-app --inline-style --inline-template
```

---

## Angular Components

Example

![components](assets/images/components-1.svg)

--

![components-markup-1](assets/images/app-mockup.svg)

--

#### Creating a component
```bash
ng g c header # short form
ng generate component header # full form
# creates inside the `src/app` folder


# OR (in a nested directory)
ng g c components/header 
# creates HeaderComponent 
# inside the `src/app/components` folder

ng g c home
# creates the HomeComponent
```

--

## Let's style the header and home

---

## Angular Data-Binding

Binding data between the TypeScript class of the component, and the component's template. <!-- .element: class="fragment"  -->

--

### Data Binding with Modern Angular (with Signals)

```ts
import { Component, signal } from '@angular/core';
@Component({
  ...,
  template: `
    <p> Here's my var's value: {{myVar()}}</p>
  `
})
class MyComponent {
  myVar = signal('some value');
}
```

more on signals later...

--

### Data Binding without Signals (traditional way)

```ts
import { Component } from '@angular/core';
@Component({
  ...,
  template: `
    <p> Here's my var's value: {{myVar}}</p>
  `
})
class MyComponent {
  myVar = 'some value';
}
```

--

![home with nested components](assets/images/home-with-nested-components.svg)

--

### Creating `GreetingComponent`

```bash
ng g c components/greeting
# generates in `src/app/components`
```

--

#### Passing data from parent to child component via Inputs

We'll pass the greeting message from the AppComponent

---

### Event listeners in Angular

```html
<!-- call a function on key up -->
<input type="text" (keyup)="keyUpHandler()">
```

```ts
class MyComponent {
  keyUpHandler() {
    console.log('user typed something in the input');
  }
}
```

--

### Event listeners in Angular

```html
<!-- call a function on key up with the event -->
<input type="text" (keyup)="keyUpHandler($event)">
```

```ts
class MyComponent {
  keyUpHandler(event: KeyboardEvent) {
    console.log(`user pressed the ${event.key} key`);
  }
}
```

--

## Let's create a counter component

```bash
ng g c components/counter
```

---

## Routing in Angular

--

Angular is a single page application. Using routes, you can still define different pages that the user can navigate to.

The browser only loads the bundles related to the route user has accessed. <!-- .element: class="fragment"  -->

This significantly improves the performance of the app, and user experience. <!-- .element: class="fragment"  -->

--

## Let's create a new route

--

![todos-route](assets/images/todos-route.svg)

--

#### Create another component (as a page) for the route

```bash
ng g c todos
# this will be the page for todos' list
```

--

![todoItem](assets/images/todo-item.svg)

--

#### Create a component for each todo item

```bash
ng g c components/todo-item
```

---

## Angular Services

--

#### Angular Services

Angular Services are used to encapsulate data, making HTTP calls, or performing any task that is not related directly to data rendering (in my opinion).

--

#### Creating an Angular Service

```bash
ng g service services/todos
# creates todos.service.ts inside `src/app/services`
```

--

#### Example of serving data from an Angular Service

--

## Making HTTP calls with Angular Services

- Provide HTTP module/providers in the app config using `provideHttpClient()`
- Inject the `HttpClient` service
- Use the `http` methods

---

## Angular Directives

Angular Directives allow you to add additional behavior to elements in our Angular applications. <!-- .element: class="fragment"  -->

--

#### Types of Angular Directives

- Components <!-- .element: class="fragment"  -->
- Attribute directives <!-- .element: class="fragment"  -->
- Structural directives <!-- .element: class="fragment"  -->

--

#### Let's create an Angular directive for completed todos

```bash
ng g directive directives/highlight-completed-todo
```

---

## Angular Pipes

--

Angular pipes are used to transform data right in the templates

--

## [Built-in Angular pipes](https://angular.dev/guide/templates/pipes)

--

## Let's create a todos filter pipe

```bash
ng g pipe pipes/filter-todos
```

---

## Thank you!
