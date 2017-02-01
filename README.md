# Introduction
This is the slush app for registration - shop - matchmaking <br>
operating since 2017

##### Main developers
* Jan Lundström
* Tero Saarikivi

##### Volunteer developers
* None yet

## Table of contents
- [Introduction](#introduction)
- [Way of Code](#way-of-code)
- [Installation](#installation)
- [Architecture](#architecture)
- [Deploying to firebase](#deploying-to-firebase)
- [Testing and tests](#testing-and-tests)
- [React best practices](#react-best-practices)

## Installation
1. Make sure you have node.js installed (hopefully through nvm) <br>
2. `git clone` repo
3. `npm i`
4. `npm start`

## Way of Code
* Lets not put ourselves in technical debt. Write documentation and comment your code as you write it.
* Clean up your code as you write it. Your code is my code and vice versa.
* Write documentation and comments to someone who does not know anything.
* Split code. Make small functions and separate them to their respective folders and files.
* Recheck code before merge request. Check it on git diff (use visual studio code)

## Architecture
We use [React](https://facebook.github.io/react/) and [Redux](http://redux.js.org/) in the application layer and [Google Firebase](https://firebase.google.com/) as BaaS <br>
On the backend we use CRUD email / payment server hosted on heroku <br>
Also using firebase ElasticSearch library [flashlight](https://github.com/firebase/flashlight) and Worker / Job utiliser [firebase-queue](https://github.com/firebase/firebase-queue)

## Deploying to firebase
#### Deploying to staging
`npm run deploy:stage` <br>
This deploys the current saved state to [staging site](https://slush-stage.firebaseapp.com/)
#### Deploying to production
Please don't try this at home! <br>
`npm run deploy:production` <br>
This deploys the current saved state to [production site](https://slush-production.firebaseapp.com/)

## Testing and tests
We use [Jest](https://facebook.github.io/jest/) as testing framework
#### running tests
`npm test` <br>
This runs tests in watching mode <br>
Tests are written in `FILENAME.test.js` style in `/src/tests` folder <br>
Check more on [cra](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#running-tests)

## React best practices
Write components in `/src/components` folder and make a folder for each own large scale component. Name the folder / Component Uppercase. <br>
Localization is done via redux if the component in making has any localizable text, use class notation and connect to redux store[locale]. Then make according localizations to `/src/locales/en.js` and use it.

```js
import React, { Component } from 'react'
import { connect } from 'react-redux'

class LocalizableComponent extends Component {
  const { locale: { hello } } = this.props
  render() {
    return <h1>{hello}</h1>
  }
}

function mapStateToProps({locale}) {
  return { locale }
}

export default connect(mapStateToProps, null)(HoLocalizableComponentme)
```

Use es6 fat-arrow-notation if component has no state or lifecycle, nor does it have to be connected to redux state.

```js
import React from 'react'

const FatComponent = (props) => {
  return <div>
  <h1>Hello from Fat component</h1>
  </div>
}

export default FatComponent
```
