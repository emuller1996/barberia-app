import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages";
import MainTemplate from "./templates/_MainTemplate";

import axios from "axios";
axios.defaults.baseURL = "http://localhost:3000/";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/*" name="blue_login" element={<HomePage />} />

          <Route
            path="/dashboard/*"
            name="dashboard"
            element={<MainTemplate></MainTemplate>}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
