import "./App.css";
import { Route, Routes } from "react-router-dom";

import { useState } from "react";
import ManagerPage from "./pages/managerPage";
import OperatorPage from "./pages/operatorPage";
import EngineerPage from "./pages/engineerPage";
import SignIn from "./pages/signIn";
import SignUp from "./pages/signUp";
function App() {
  const [role, setRole] = useState("manager");
  return (
    <>
      {role === "manager" && <ManagerPage />}
      {role === "operator" && <OperatorPage />}
      {role === "engineer" && <EngineerPage />}
      <Routes>
        {" "}
        <Route element={<SignIn />} path="/sign-in" />
        <Route element={<SignUp />} path="/sign-up" />
      </Routes>
    </>
  );
}

export default App;
