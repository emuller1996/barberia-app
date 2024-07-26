import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages";
import MainTemplate from "./templates/_MainTemplate";

import axios from "axios";
import { AuthProvider } from "./context/AuthContext";
import RouteProtected from "./utils/proteccion/RouteProtected";
import LoginPage from "./pages/AuthPages/Login.jsx";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" name="Login" element={<LoginPage />} />
            <Route path="/*" name="blue_login" element={<HomePage />} />

            <Route
              path="/dashboard/*"
              name="dashboard"
              element={
                <RouteProtected>
                  <MainTemplate></MainTemplate>
                  </RouteProtected>}
            />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
