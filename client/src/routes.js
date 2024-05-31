import React from "react";
import ClientesPage from "./pages/clientes";

const BarberPage = React.lazy(() => import("./pages/barbers"));
const DashboardPage = React.lazy(() => import("./pages/dasboard"));
const ServicePage = React.lazy(() => import("./pages/services"));
const CitasPage = React.lazy(() => import("./pages/citas"));
const ProductosPage = React.lazy(() => import("./pages/productos"));

const routes = [
  { path: "/", name: "Dasboard", element: DashboardPage },
  { path: "/barbers", name: "barbers", element: BarberPage },
  { path: "/services", name: "services", element: ServicePage },
  { path: "/clientes", name: "services", element: ClientesPage },
  { path: "/citas", name: "Citas", element: CitasPage },
  { path: "/productos", name: "Citas", element: ProductosPage },
];

export default routes;
