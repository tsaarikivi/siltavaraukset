# Introduction
This is the slush app for registration - shop - matchmaking <br>
operating since 2017

#### Main developers
- Jan Lundström
- Tero Saarikivi

#### Volunteer developers
- None yet

## Table of contents
- [Introduction](#introduction)
- [Way of Code](#way-of-code)
- [Installation](#installation)
- [Architecture](#architecture)
- [Using git and github](#using-git-and-github)
- [Testing and tests](#testing-and-tests)
- [Web benchmarks](#web-benchmarks)
- [React best practices](#react-best-practices)
- [Redux best practices](#redux-best-practices)
- [Router](#router)
- [Styling](#styling)
- [Using firebase](#using-firebase)
- [Deploying to firebase](#deploying-to-firebase)

## Installation
1. Make sure you have node.js installed (hopefully through nvm) <br>
2. `git clone` repo
3. `npm i`
4. `npm start`

## Way of Code
- Lets not put ourselves in technical debt. Write documentation and comment your code as you write it
- Clean up your code as you write it. Your code is my code and vice versa
- Write documentation and comments to someone who does not know anything
- Split code. Make small functions and separate them to their respective folders and files
- Recheck code before merge request. Check it on git diff (use visual studio code)
- Performance is key. Always. Write as much async code as you can. Sync pulls main thread. Very bad

## Architecture
We use [React](https://facebook.github.io/react/) and [Redux](http://redux.js.org/) in the application layer and [Google Firebase](https://firebase.google.com/) as BaaS <br>
On the backend we use CRUD email / payment server hosted on heroku <br>
Also using firebase ElasticSearch library [flashlight](https://github.com/firebase/flashlight) and Worker / Job utiliser [firebase-queue](https://github.com/firebase/firebase-queue) <br>
[Progressive web apps](https://medium.com/@addyosmani/progressive-web-apps-with-react-js-part-i-introduction-50679aef2b12#.moy0zskpd) is the way

## Using git and github
- Get familiar with [our git branching model](http://nvie.com/posts/a-successful-git-branching-model/)
- Use it

## Testing and tests
We use [Jest](https://facebook.github.io/jest/) as testing framework <br>
Please write unit tests on data handling
### Running tests
`npm test` <br>
This runs tests in watching mode <br>
Tests are written in `FILENAME.test.js` style in `/src/tests` folder <br>
> See more on [cra](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#running-tests)

## Web benchmarks
- Try [lighthouse](https://chrome.google.com/webstore/detail/lighthouse/blipmdconlkpinefehnmjammfjpmpbjk)

## React best practices
- Write components in `/src/components` folder and make a folder for each own large scale component. Name the folder / Component Uppercase
- Write as small components as possible. And even smaller
- Think reusable when creating component

### Localization

- Localization is done via redux. If the component in making has any localizable text, use class notation and connect to redux store[locale]. Then make according localizations to `/src/locales/en.js` and use it

```js
/*
 * /src/locales/en.js
 */

// Page Not Found
exports.notFound = 'Page Not Found'

// Hello World
exports.hello = 'Hello World'
```

```js
import React, { Component } from 'react'
import { connect } from 'react-redux'

class LocalizableComponent extends Component {
  const { locale: { hello } } = this.props
  render() {
    return <h1>{hello}</h1>
  }
}

// {locale} === state.locale
function mapStateToProps({locale}) {
  return { locale }
}

export default connect(mapStateToProps, null)(LocalizableComponentme)
```

### Fat arrow functions

- Use es6 fat-arrow-notation if component has no state or lifecycle, nor does it have to be connected to redux state

```js
import React from 'react'

const FatComponent = (props) => {
  return <div>
    <h1>Hello from Fat component</h1>
  </div>
}

export default FatComponent
```

## Redux best practices
- Write reducers in `/src/reducers` in their respective files
- Use [redux-actions](https://github.com/acdlite/redux-actions) to create and handle actions
- Dont bloat reducers. Write all helper functions in `/src/helpers` in their respective files

> See more @ [medium](https://medium.com/@kylpo/redux-best-practices-eef55a20cc72#.h4wh45o6a)

### syntax

`action name: <NOUN>_<VERB>` <br>
`action creator name: <verb><Noun>` <br>
`selector name: get<Noun>` <br>

Example reducer:

```js
import { createAction, handleActions } from 'redux-actions';
// Actions
export const addTodo = createAction( 'TODO_ADD' )

// State
const initialState = {}

// Reducers
export default handleActions({
  TODO_ADD: (state, action) => ([
    ...state,
    action.payload,
  ]),
  // Other reducers
  // ...
  //
}, initialState )

// Selectors
export const getTodos = (state) => state.todos
```

### Filtering redux state

- Use [reselect](https://github.com/reactjs/reselect) to filter state. Use it even if you get the whole state

```js
import { createSelector } from 'reselect'

const shopItemsSelector = state => state.shop.items
const taxPercentSelector = state => state.shop.taxPercent

const subtotalSelector = createSelector(
  shopItemsSelector,
  items => items.reduce((acc, item) => acc + item.value, 0)
)

const taxSelector = createSelector(
  subtotalSelector,
  taxPercentSelector,
  (subtotal, taxPercent) => subtotal * (taxPercent / 100)
)

export const totalSelector = createSelector(
  subtotalSelector,
  taxSelector,
  (subtotal, tax) => ({ total: subtotal + tax })
)

let exampleState = {
  shop: {
    taxPercent: 8,
    items: [
      { name: 'apple', value: 1.20 },
      { name: 'orange', value: 0.95 },
    ]
  }
}

console.log(subtotalSelector(exampleState)) // 2.15
console.log(taxSelector(exampleState))      // 0.172
console.log(totalSelector(exampleState))    // { total: 2.322 }
```

## Router
- Lazy load all routes. Check current router.

## Styling
- Feel free to use [material design components](http://www.material-ui.com/#/components/raised-button)
- Try to write javascript export styles
- If css needed write small css files and for each component its own. Lazy loading breaks css if not in scope.

## Using firebase
### Database

> Check [API](https://firebase.google.com/docs/database/web/read-and-write)

- Make refs in `/src/firebase/index.js`
- Use only refs exported there

```js
// ...
// ...
// /src/firebase/index.js
export const usersRef = fb.ref('users')
```

```js
// Then in a reducer ACTION
import { createAction } from 'redux-actions'
const setUser = createAction('USER_SET')

import { usersRef } from '/src/firebase/index.js'
export const getUser = (key) => {
  return dispatch => {
    usersRef.child(key).once('value')
      .then(data => {
        // dispatch action with data as payload
        dispatch(setUser(data.val()))
      })
      .catch(err => console.error(err))
  }
}
```

### Auth

> Check [API](https://firebase.google.com/docs/auth/web/manage-users)

- Use `import { auth } from '/src/firebase/index.js'`

```js
// Then
import { auth } from '/src/firebase/index.js'
auth.signOut()
```

### Database rules
Found in `/database.rules.json`
- Make sure to test database rules, so they are secure. They are testable on the firebase project console website. [staging](https://console.firebase.google.com/project/slush-stage/database/rules) & [production](https://console.firebase.google.com/project/slush-production/database/rules)

#### Deploy database rules
- To production: `npm run deploy:db:production`
- To staging: `npm run deploy:db:stage`

## Deploying to firebase
### Deploying to staging
`npm run deploy:stage` <br>
This deploys the current saved state to [staging site](https://slush-stage.firebaseapp.com/)
### Deploying to production
Please don't try this at home! <br>
`npm run deploy:production` <br>
This deploys the current saved state to [production site](https://slush-production.firebaseapp.com/)
