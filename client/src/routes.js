import React from "react";
import ClientesPage from "./pages/clientes";

const BarberPage = React.lazy(() => import("./pages/barbers"));
const DashboardPage = React.lazy(() => import("./pages/dasboard"));
const ServicePage = React.lazy(() => import("./pages/services"));

const routes = [
  { path: "/", name: "Dasboard", element: DashboardPage },
  { path: "/barbers", name: "barbers", element: BarberPage },
  { path: "/services", name: "services", element: ServicePage },
  { path: "/clientes", name: "services", element: ClientesPage },
];

export default routes;
