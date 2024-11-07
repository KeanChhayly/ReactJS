import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import AppMovie from "./mymovie/AppMovie";
import "./mymovie.css";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AppMovie />
  </React.StrictMode>
);
