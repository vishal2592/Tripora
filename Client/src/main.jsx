import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import "./index.css";

import Store from "./redux/Store";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={Store}>
        <App />
      </Provider>
       <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            borderRadius: '12px',
            padding: '12px 16px',
            fontSize: '14px',
          },
        }}
      />
    </BrowserRouter>
  </StrictMode>
);