import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Web3ContextProvider } from "./web3";
import { Provider } from "react-redux";
import store from "./store/store";
import {  LanguageProvider } from './contexts/Localization'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <Web3ContextProvider>
      <LanguageProvider>
          <App />
      </ LanguageProvider>
    </Web3ContextProvider>
  </Provider>
);


