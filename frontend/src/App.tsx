import { ToastContainer } from "react-toastify";
import { NavLink, Outlet } from "react-router";

const App = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <ToastContainer />
      <nav className="absolute flex gap-4 pl-32 left-0 top-0 pt-20 ">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "bg-blue-500 text-white px-4 py-2"
              : "text-black px-4 py-2"
          }
        >
          Login
        </NavLink>
        <NavLink
          to="/register"
          className={({ isActive }) =>
            isActive
              ? "bg-blue-500 text-white px-4 py-2"
              : "text-black px-4 py-2"
          }
        >
          register
        </NavLink>
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            isActive
              ? "bg-blue-500 text-white px-4 py-2"
              : "text-black px-4 py-2"
          }
        >
          Profile
        </NavLink>
        <NavLink
          to="/product"
          className={({ isActive }) =>
            isActive
              ? "bg-blue-500 text-white px-4 py-2"
              : "text-black px-4 py-2"
          }
        >
          product
        </NavLink>
      </nav>
      <Outlet />
    </div>
  );
};

export default App;
