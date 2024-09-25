import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Helmet } from "react-helmet";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <Helmet>
      {" "}
      <meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
    </Helmet>{" "}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
