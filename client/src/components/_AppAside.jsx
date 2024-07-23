import { Drawer } from "@mui/material";
import { useEffect } from "react";
import NavMenu from "./_NavMenu";
import PropTypes from "prop-types";

export default function AppAside({ open, setOpen }) {
  AppAside.propTypes = {
    open: PropTypes.bool,
    setOpen: PropTypes.func,
  };
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth > 640) {
        console.log(open);
        if (open === true) {
          setOpen(false);
          console.log(window.innerWidth);
          console.log(window.innerWidth > 640);
        }
      }
    });
  }, []);

  return (
    <aside
      id="logo-sidebar"
      className="fixed top-0 left-0 z-40 w-64 h-screen mt-14 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
      aria-label="Sidebar"
    >
      <Drawer open={open} onClose={toggleDrawer(false)}>
        <div className="p-4 w-[350px] bg-orange-300">
          <a href="/" className="flex ms-2 md:me-24">
            {/* <img src={logo} className="h-8 me-3" alt="FlowBite Logo" /> */}
            <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
              Presupuesto APPV1
            </span>
          </a>
        </div>
        <hr className="mb-3" />

        <NavMenu setOpen={setOpen} />
      </Drawer>

      <NavMenu />
    </aside>
  );
}
