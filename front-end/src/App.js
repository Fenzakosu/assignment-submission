import { Route, Routes } from "react-router-dom";
import "./App.css";
import AssignmentView from "./assignment-view/AssignmentView";
import Dashboard from "./dashboard/Dashboard";
import Homepage from "./homepage/Homepage";
import Login from "./login/Login";
import PrivateRoute from "./private-route/PrivateRoute";
import { useLocalState } from "./util/useLocalStorage";

function App() {
  const [jwt, setJwt] = useLocalState("", "jwt");

  return (
    <Routes>
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/assignments/:id"
        element={
          <PrivateRoute>
            <AssignmentView />
          </PrivateRoute>
        }
      />

      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Homepage />} />
    </Routes>
  );
}

export default App;
