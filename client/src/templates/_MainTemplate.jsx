import { Suspense, useState } from "react";
import { Route, Routes } from "react-router-dom";
import routes from "../routes";
import AppAside from "../components/_AppAside";
import AppNavbar from "../components/_AppNavbar";
import AppBreadcrumb from "../components/_AppBreadcrumb";
import { Toaster } from "react-hot-toast";
export default function MainTemplate() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <AppNavbar setOpen={setOpen} />

      <AppAside open={open} setOpen={setOpen} />

      <div className="mt-[45px]  md:mt-[41px] sm:ml-80 xl:ml-96 text-center">
        <AppBreadcrumb />
      </div>
      <div className="p-4 sm:ml-96 xl:ml-96 ">
        <div className="p-2  border-gray-200  rounded-lg dark:border-gray-700 ">
          <Suspense fallback={"load..."}>
            <Routes>
              {routes.map((route, idx) => {
                return (
                  route.element && (
                    <Route
                      key={idx}
                      path={route.path}
                      exact={true}
                      name={route.name}
                      element={<route.element />}
                    />
                  )
                );
              })}
            </Routes>
          </Suspense>
        </div>
      </div>
      <Toaster position="top-left" reverseOrder={false} />
    </>
  );
}
