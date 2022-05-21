import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { MoralisProvider } from 'react-moralis';

console.log(process.env.REACT_APP_MORALIS_APP_ID);

ReactDOM.render(
    <MoralisProvider 
      appId="eYwv7lpTNDpYWjTaqvPqYzxB30yfdkdcmarODwn7"
      serverUrl="https://9sb6kduejqbx.usemoralis.com:2053/server"
    >
          <App />
    </MoralisProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
