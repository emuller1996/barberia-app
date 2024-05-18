import { Outlet, useLocation, Link } from "react-router-dom";

const AppBreadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <nav aria-label="breadcrumbs" className="  p-2 bg-gray-50  border border-b-gray-300 shadow-inner">
      <ol className="flex justify-start ps-6 gap-2 font-semibold capitalize">
        <li className="flex items-center text-gray-500  hover:text-gray-700">
          <Link to="/">Inicio</Link>
          {pathnames.length !== 0 && (
            <svg
              className="w-6 h-6 text-gray-500 "
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m7 16 4-4-4-4m6 8 4-4-4-4"
              />
            </svg>
          )}
        </li>

        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;
          return (
            <li key={name} className="flex text-gray-500 hover:text-gray-700" >
              {isLast ? <span>{name}</span> : <Link to={routeTo}>{name}</Link>}
              {pathnames.length !== index + 1 && (
                <svg
                  className="w-6 h-6 text-gray-500 "
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m7 16 4-4-4-4m6 8 4-4-4-4"
                  />
                </svg>
              )}
            </li>
          );
        })}
      </ol>
      <Outlet />
    </nav>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export default AppBreadcrumb;
