import React from "react";
import ReactDOM from "react-dom/client";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import Rotas from "./routes/routes.js";
import Global from "./styles/styleGlobal";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Header />
    <Rotas />
    <Global/>
  </React.StrictMode>
);
