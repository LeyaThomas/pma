import { useState } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./Theme";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from "react-router-dom";
import {Calendar, Contacts, Dashboard, Expense, FAQ, Geography, Line, Login, ProjectPulse, Signup, Team, UpdateHub } from "./pages";
import { ProjectButton, ProtectedRoute, Sidebar, Topbar } from "./components";
import ProjectCatalog from "./pages/ProjectCatalog/ProjectCatalog";


function Logout() {
  localStorage.clear();
  return <Navigate to="/login" />;
}

function App() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const [theme, colorMode] = useMode();


  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="*" element={<ProtectedRoutes isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

function ProtectedRoutes({ setIsCollapsed, isCollapsed }) {
  return (
    <ProtectedRoute>
      <Topbar setIsCollapsed={setIsCollapsed} />
      <div style={{ display: 'flex' }}>
        <Sidebar isCollapsed={isCollapsed} />
        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/team" element={<Team />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/expense" element={<Expense />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/geography" element={<Geography />} />
            <Route path="/update" element={<UpdateHub />} />
            <Route path="/line" element={<Line />} />
            <Route path="/pulse" element={<ProjectPulse />} />
            <Route path="/catalog/:id" element={<ProjectCatalog />} />
          </Routes>
          <ProjectButton/>
        </div>
      </div>
    </ProtectedRoute>
  );
}

export default App;
