The app has been created with [`react-native init`](https://facebook.github.io/react-native/docs/getting-started.html)

It uses React Navigation, Redux for state managements and Saga for side effects. code is linted

The structure is the following:

`src/actions` contains the Redux actions

`src/components` contains reusable components (I've left most of the code in the screens, but have componentized the answer display on the end screen: WrongAnswer and CorrectAnswer )

`src/reducers` contains Redux reducers

`src/sagas` contains Sagas

`src/screen` contains react-navigation screens

`src/styles` contains common styles

