import { Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import LinkPage from "./pages/LinkPage";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Missing from "./pages/Missing";
import Unauthorized from "./pages/Unauthorized";
import RequireAuth from "./components/RequireAuth";
import PersistLogin from "./components/PersistLogin";
import UpdateInfo from "./pages/UpdateInfo";
import UpdatePassword from "./pages/UpdatePassword";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="linkpage" element={<LinkPage />} />
        <Route path="unauthorized" element={<Unauthorized />} />

        {/* we want to protect these routes */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth />}>
            <Route path="/" element={<Home />} />
            <Route path="admin" element={<Admin />} />
            <Route exact path="update" element={<UpdateInfo />} />
            <Route path="update/password" element={<UpdatePassword />} />
          </Route>
        </Route>
        {/* catch all */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
