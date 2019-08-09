import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import GlobalState from "./context/GlobalState.js";
import ProductsPage from "./pages/Products";
import CartPage from "./pages/Cart";
import "./App.css";

export default () => (
  <GlobalState>
    <BrowserRouter>
      <Switch>
        <Route path="/" component={ProductsPage} exact />
        <Route path="/cart" component={CartPage} exact />
      </Switch>
    </BrowserRouter>
  </GlobalState>
);
