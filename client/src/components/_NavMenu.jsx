import { Link, NavLink } from "react-router-dom";
export default function NavMenu({ setOpen }) {
  return (
    <div className="h-full px-3 pb-4  overflow-y-auto bg-gray-50 dark:bg-gray-800">
      <ul className="space-y-2 font-medium">
        <li>
          <NavLink
            to=""
            onClick={
              setOpen
                ? () => {
                    try {
                      setOpen(false);
                    } catch (error) {
                      console.log(error);
                    }
                  }
                : null
            }
            className="flex items-center p-2 text-gray-700 rounded-lg dark:text-white hover:bg-blue-100 hover:shadow hover:text-gray-900 dark:hover:bg-gray-700 group"
          >
            <i className="fa-solid fa-table-columns"></i>
            <span className="ms-3 font-normal">Dashboard</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="barbers"
            onClick={
              setOpen
                ? () => {
                    try {
                      setOpen(false);
                    } catch (error) {
                      console.log(error);
                    }
                  }
                : null
            }
            className="flex items-center p-2 text-gray-700 rounded-lg dark:text-white hover:bg-orange-100 hover:shadow hover:text-gray-900 dark:hover:bg-gray-700 group"
          >
            <i className="fa-solid text-orange-600 fa-scissors"></i>
            <span className="ms-3 text-orange-600  font-normal">Barberos</span>
          </NavLink>
        </li>

        <li>
          <NavLink
            to="services"
            onClick={
              setOpen
                ? () => {
                    try {
                      setOpen(false);
                    } catch (error) {
                      console.log(error);
                    }
                  }
                : null
            }
            className="flex items-center p-2 text-gray-700 rounded-lg dark:text-white hover:bg-purple-100 hover:shadow hover:text-gray-900 dark:hover:bg-gray-700 group"
          >
            <i className="fa-solid fa-barcode text-purple-600"></i>
            <span className="ms-3 text-purple-600  font-normal">Servicios </span>
          </NavLink>
        </li>


        <li>
          <NavLink
            to="clientes"
            onClick={
              setOpen
                ? () => {
                    try {
                      setOpen(false);
                    } catch (error) {
                      console.log(error);
                    }
                  }
                : null
            }
            className="flex items-center p-2 text-gray-700 rounded-lg dark:text-white hover:bg-sky-100 hover:shadow hover:text-gray-900 dark:hover:bg-gray-700 group"
          >
            <i className="fa-solid fa-user-group text-sky-500"></i>
            <span className="ms-3 text-sky-500  font-normal">Clientes </span>
          </NavLink>
        </li>

        <li>
          <NavLink
            to="citas"
            onClick={
              setOpen
                ? () => {
                    try {
                      setOpen(false);
                    } catch (error) {
                      console.log(error);
                    }
                  }
                : null
            }
            className="flex items-center p-2 text-gray-700 rounded-lg dark:text-white hover:bg-green-100 hover:shadow hover:text-gray-900 dark:hover:bg-gray-700 group"
          >
            <i className="fa-regular text-green-500  fa-calendar-days"></i>
            <span className="ms-3 text-green-500  font-normal">Citas </span>
          </NavLink>
        </li>

        <hr />
        <li>
          <Link
            to="usuarios"
            onClick={
              setOpen
                ? () => {
                    try {
                      setOpen(false);
                    } catch (error) {
                      console.log(error);
                    }
                  }
                : null
            }
            className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
          >
            <svg
              className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 18"
            >
              <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
            </svg>
            <span className="flex-1 ms-3 whitespace-nowrap">Users</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}
