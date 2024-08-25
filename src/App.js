import "./App.css";

import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import ManagerPage from "./pages/managerPage";
import OperatorPage from "./pages/operatorPage";
import EngineerPage from "./pages/engineerPage";
import SignIn from "./pages/signIn";
import SignUp from "./pages/signUp";

function App() {
  const [role] = useState("engineer");
  return (
    <Routes>
      {role === "manager" && <Route path="/*" element={<ManagerPage />} />}
      {role === "operator" && <Route path="/*" element={<OperatorPage />} />}
      {role === "engineer" && (
        <Route path="/*" element={<EngineerPage id={4} />} />
      )}
      <Route element={<SignIn />} path="/sign-in" />
      <Route element={<SignUp />} path="/sign-up" />
    </Routes>
  );
}

export default App;
