import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import Home from "./routes/Home";
import Details from "./routes/Details";
import { Provider } from "react-redux";
import store from "./store";

const router = createBrowserRouter([
  {
    path: `${process.env.PUBLIC_URL + "/"}`,
    element: <Home />,
  },
  {
    path: "/:id",
    element: <Details />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
