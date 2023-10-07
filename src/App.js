import React from "react";
import RoutesApp from "./routes";
import { AuthProvider } from "./contexts/auth";

import GlobalStyle from "./styles/global";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const App = () => (
  <AuthProvider>
    <RoutesApp />
    <GlobalStyle />
    <ToastContainer />
  </AuthProvider>
);

export default App;
