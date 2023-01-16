import React from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";
import configureStore from "store/configureStore";
import logger from "store/services/logService";

import App from "App";

import "./index.module.scss";

logger.init();
const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
