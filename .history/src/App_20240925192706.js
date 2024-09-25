import "./App.css";

import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import ManagerPage from "./pages/managerPage";
import OperatorPage from "./pages/operatorPage";
import EngineerPage from "./pages/engineerPage";
import SignIn from "./pages/signIn";
import SignUp from "./pages/signUp";
import axiosInstance from "./api/axiosInstance";
import useFetchDoneCalls from "./hooks/useFetchDoneCalls";

function App() {
  const [role] = useState("manager");
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchClients() {
      const datas = await axiosInstance.get("/clients");
      const clients = await datas.data;
      setData(clients);
    }
    fetchClients();
  }, []);

  return (
    <Routes>
      {role === "manager" && <Route path="/*" element={<ManagerPage />} />}
      {role === "operator" && (
        <Route path="/*" element={<OperatorPage id={1} />} />
      )}
      {role === "engineer" && (
        <Route path="/*" element={<EngineerPage id={4} />} />
      )}
      <Route element={<SignIn />} path="/sign-in" />
      <Route element={<SignUp />} path="/sign-up" />
    </Routes>
  );
}

export default App;
