import { Box } from "@mui/material";
import "./App.css";
import Header from "./components/Header/Header";
import { useState } from "react";
import SideMenu from "./components/SideMenu/SideMenu";
import { Outlet, useNavigate } from "react-router";

function App() {
  // const [activeComponent, setActiveComponent] = useState<"form" | "list">(
  //   "form"
  // );
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleMenuClick = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleMenuSelect = (component: "form" | "list") => {
    if (component === "form") navigate("/");
    else navigate("/quotes");

    setIsMenuOpen(false);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header onMenuClick={handleMenuClick} />

      <SideMenu
        open={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onSelect={handleMenuSelect}
      />

      <Box component="main" sx={{ flexGrow: 1, mt: 8, mb: 2 }}>
        <Outlet />
      </Box>
    </Box>
  );
}

export default App;
