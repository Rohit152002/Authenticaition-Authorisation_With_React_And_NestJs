import { useEffect, useState } from "react";
import CreateProduct from "../components/Product/CreateProduct";
import { getAllProducts } from "../services/product";
import { NavLink, Outlet } from "react-router";

const ProductPage = () => {
  return (
    <div>
      <nav className=" flex gap-4 pl-32 left-0 top-0 pt-20 ">
        <NavLink
          to="create"
          className={({ isActive }) =>
            isActive
              ? "bg-blue-500 text-white px-4 py-2"
              : "text-black px-4 py-2"
          }
        >
          Create Product
        </NavLink>
      </nav>
      <Outlet />;
    </div>
  );
};

export default ProductPage;
