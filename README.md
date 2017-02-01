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
- [Deploying to firebase](#deploying-to-firebase)
- [Testing and tests](#testing-and-tests)
- [React best practices](#react-best-practices)
- [Redux best practices](#redux-best-practices)

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

## Architecture
We use [React](https://facebook.github.io/react/) and [Redux](http://redux.js.org/) in the application layer and [Google Firebase](https://firebase.google.com/) as BaaS <br>
On the backend we use CRUD email / payment server hosted on heroku <br>
Also using firebase ElasticSearch library [flashlight](https://github.com/firebase/flashlight) and Worker / Job utiliser [firebase-queue](https://github.com/firebase/firebase-queue)

## Deploying to firebase
### Deploying to staging
`npm run deploy:stage` <br>
This deploys the current saved state to [staging site](https://slush-stage.firebaseapp.com/)
### Deploying to production
Please don't try this at home! <br>
`npm run deploy:production` <br>
This deploys the current saved state to [production site](https://slush-production.firebaseapp.com/)

## Testing and tests
We use [Jest](https://facebook.github.io/jest/) as testing framework
### running tests
`npm test` <br>
This runs tests in watching mode <br>
Tests are written in `FILENAME.test.js` style in `/src/tests` folder <br>
> See more on [cra](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#running-tests)

## React best practices
- Write components in `/src/components` folder and make a folder for each own large scale component. Name the folder / Component Uppercase
- Write as small components as possible. And even smaller
- Think reusable when creating component
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

> See more @ [medium](https://medium.com/@kylpo/redux-best-practices-eef55a20cc72#.h4wh45o6a)

- Use syntax

`action name: <NOUN>_<VERB>` <br>
`action creator name: <verb><Noun>` <br>
`selector name: get<Noun>`

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