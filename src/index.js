import "./index.css";
import App from "./App";
import React from "react";
import ReactDOM from "react-dom/client";
import store from "./Components/Redux/ReduxPersist";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";

let persistor = persistStore(store);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
