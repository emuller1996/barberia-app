import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { Avatar, Dropdown } from "flowbite-react";

export default function AppNavbar({ setOpen }) {
  /*   const { User, setToken, setUser } = useContext(AuthContext);
  const [, setTokenAccess] = useLocalStorage("tokenAccess", null); */
  AppNavbar.propTypes = {
    setOpen: PropTypes.func,
  };
  return (
    <nav className="fixed top-0 z-50 py-2 w-full bg-gray-200 border-b border-gray-400 dark:bg-gray-800 dark:border-gray-700">
      <div className="lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start rtl:justify-end">
            <button
              data-drawer-target="logo-sidebar"
              data-drawer-toggle="logo-sidebar"
              aria-controls="logo-sidebar"
              onClick={() => {
                setOpen(true);
              }}
              type="button"
              className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            >
              <span className="sr-only">Open sidebar</span>
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clipRule="evenodd"
                  fillRule="evenodd"
                  d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                ></path>
              </svg>
            </button>
            <Link to="/" className="flex ms-2 md:me-24">
              {/* <img src={logo} className="h-8 me-3" alt="FlowBite Logo" /> */}
              <span className="self-center font-semibold  whitespace-nowrap dark:text-white">
                BARBER APP- ADMIN
              </span>
            </Link>
          </div>
          <div className="flex items-center">
            <div className="flex items-center ms-3 me-3 lg:me-0">
              <Dropdown
                arrowIcon={false}
                inline
                label={
                  <Avatar
                    alt="User settings"
                    size={"sm"}
                    img={
                      "https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                    }
                    rounded
                  />
                }
              >
                <Dropdown.Header>
                  <span className="block  ">name</span>
                  <span className="block  ">username</span>

                  <span className="block   truncate  font-medium">
                    email
                  </span>
                </Dropdown.Header>
                <Dropdown.Item className="">Mi Perfil</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item className="">Sign out</Dropdown.Item>
              </Dropdown>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
