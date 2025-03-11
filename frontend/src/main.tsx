import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

import { BrowserRouter, Route, Routes } from "react-router";
import LoginComponent from "./components/LoginComponent.tsx";
import RegisterComponent from "./components/RegisterComponent.tsx";
import ProfileComponent from "./components/ProfileComponent.tsx";
import ProductPage from "./page/ProductPage.tsx";
import ProductComponent from "./components/Product/ProductComponent.tsx";
import CreateProduct from "./components/Product/CreateProduct.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    {/* <StrictMode> */}
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<LoginComponent />} />
        <Route path="/register" element={<RegisterComponent />} />
        <Route path="/profile" element={<ProfileComponent />} />
      </Route>
      <Route path="/product" element={<ProductPage />}>
        <Route index element={<ProductComponent />} />
        <Route path="create" element={<CreateProduct />} />
      </Route>
    </Routes>
    {/* </StrictMode>, */}
  </BrowserRouter>
);
