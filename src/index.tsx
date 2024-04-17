import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "jotai";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const theme = extendTheme({
  styles: {
    global: {
      body: {
        overflow: "hidden",
      },
    },
  },
});

root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <Provider>
        <App />
      </Provider>
    </ChakraProvider>
  </React.StrictMode>
);
