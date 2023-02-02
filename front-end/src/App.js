import { Route, Routes } from "react-router-dom";
import "./App.css";
import AssignmentView from "./assignment-view/AssignmentView";
import Dashboard from "./dashboard/Dashboard";
import Homepage from "./homepage/Homepage";
import Login from "./login/Login";
import PrivateRoute from "./private-route/PrivateRoute";
import { useLocalState } from "./util/useLocalStorage";
import "bootstrap/dist/css/bootstrap.min.css";
import jwt_decode from "jwt-decode";
import { useState } from "react";
import CodeReviewerDashboard from "./code-reviewer-dashboard/CodeReviewerDashboard";
import CodeReviewerAssignmentView from "./assignment-view/CodeReviewerAssignmentView";

function App() {
  const [jwt, setJwt] = useLocalState("", "jwt");
  const [roles, setRoles] = useState(getRolesFromJwt());

  function getRolesFromJwt() {
    if (jwt) {
      const decodedJwt = jwt_decode(jwt);
      return decodedJwt.authorities;
    }
    return [];
  }

  return (
    <Routes>
      <Route
        path="/dashboard"
        element={
          roles.find((role) => role === "ROLE_CODE_REVIEWER") ? (
            <PrivateRoute>
              <CodeReviewerDashboard />
            </PrivateRoute>
          ) : (
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          )
        }
      />

      <Route
        path="/assignments/:id"
        element={
          roles.find((role) => role === "ROLE_CODE_REVIEWER") ? (
            <PrivateRoute>
              <CodeReviewerAssignmentView />
            </PrivateRoute>
          ) : (
            <PrivateRoute>
              <AssignmentView />
            </PrivateRoute>
          )
        }
      />

      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Homepage />} />
    </Routes>
  );
}

export default App;
