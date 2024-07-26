import React from "react";

const BarberPage = React.lazy(() => import("./pages/barbers"));
const DashboardPage = React.lazy(() => import("./pages/dasboard"));
const ServicePage = React.lazy(() => import("./pages/services"));
const CitasPage = React.lazy(() => import("./pages/citas"));
const ProductosPage = React.lazy(() => import("./pages/productos"));
const CajaPage = React.lazy(() => import("./pages/caja"));
const ClientesPage = React.lazy(() => import("./pages/clientes"));
const VentasPage = React.lazy(() => import("./pages/ventas"));
const RegistarVentaPage = React.lazy(() => import("./pages/registrar-venta"));
const UsuariosPage = React.lazy(() => import("./pages/usuarios"));





const routes = [

  { path: "/", name: "Dasboard", element: DashboardPage },
  { path: "/barbers", name: "barbers", element: BarberPage },
  { path: "/services", name: "services", element: ServicePage },
  { path: "/clientes", name: "services", element: ClientesPage },
  { path: "/citas", name: "Citas", element: CitasPage },
  { path: "/productos", name: "Citas", element: ProductosPage },
  { path: "/ventas", name: "Citas", element: VentasPage },
  { path: "/ventas/registar", name: "Citas", element: RegistarVentaPage },
  { path: "/usuarios", name: "Citas", element: UsuariosPage },



  { path: "/movimientos-caja", name: "Movientos Caja", element: CajaPage },
];

export default routes;
