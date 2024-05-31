import { NavLink } from "react-router-dom";

export default function MenuProductoServices() {
  return (
    <div className=" font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700 mb-4">
      <ul className="flex flex-wrap -mb-px">
        <li className="me-2">
          <NavLink
            to="/dashboard/services"
            className={({ isActive, isPending }) =>
                isPending
                  ? ""
                  : isActive
                  ? "inline-block p-4 border-b-2  border-purple-400 text-purple-600 rounded-t-lg hover:text-purple-600 hover:border-purple-300 dark:hover:text-gray-300"
                  : "inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
              }
          >
            Services
          </NavLink>
        </li>
        <li className="me-2">
          <NavLink
            to="/dashboard/productos"
            className={({ isActive, isPending }) =>
              isPending
                ? ""
                : isActive
                ? "inline-block p-4 border-b-2  border-fuchsia-400 text-fuchsia-600 rounded-t-lg hover:text-fuchsia-600 hover:border-fuchsia-300 dark:hover:text-gray-300"
                : "inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
            }
            aria-current="page"
          >
            Productos
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
