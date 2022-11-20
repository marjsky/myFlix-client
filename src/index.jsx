import React from 'react';
import { createRoot } from 'react-dom/client';
import MainView from './components/main-view/main-view';
import Container from 'react-bootstrap/Container';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import moviesApp from './reducers/reducers';
import { devToolsEnhancer } from 'redux-devtools-extension';

// Import statement to indicate that you need to bundle `./index.scss`
import './index.scss';

const store = configureStore();
//const store = createStore(moviesApp, devToolsEnhancer());

// Main component (will eventually use all the others)
class MyFlixApplication extends React.Component {
  
  render() {
    return (
      <Provider store={store}>
        <Container>
          <MainView />
        </Container>
      </Provider>
    );
  }
}

// Finds the root of your app
const container = document.getElementsByClassName('app-container')[0];
const root = createRoot(container);


//Tells React to render your app in the root DOM element
root.render(<MyFlixApplication />);